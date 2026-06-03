/**
 * Fetches Open Graph + article metadata from a source URL and caches the
 * result on disk so subsequent builds (and dev re-renders) don't re-fetch.
 *
 * Cache file lives at `.cache/og-meta.json` (gitignored). In CI the cache
 * is cold on every build — that's OK, it's a handful of HTTP requests.
 *
 * Fails soft: a failed fetch returns `undefined` and logs a warning;
 * caller falls back to whatever Starlight emits by default.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(here, '..', '..');
const CACHE_PATH = join(REPO_ROOT, '.cache', 'og-meta.json');

export interface OgMeta {
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  siteName?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  /** ISO timestamp of when this entry was fetched. */
  fetchedAt: string;
}

let cache: Record<string, OgMeta> = {};
let cacheLoaded = false;

function loadCache(): void {
  if (cacheLoaded) return;
  cacheLoaded = true;
  if (existsSync(CACHE_PATH)) {
    try {
      cache = JSON.parse(readFileSync(CACHE_PATH, 'utf8'));
    } catch {
      cache = {};
    }
  }
}

function saveCache(): void {
  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

/** Extract a single <meta> value matched by `property="X"` or `name="X"`. Tolerates either attribute order. */
function extractMeta(html: string, key: string): string | undefined {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`<meta[^>]*\\b(?:property|name)=["']${escaped}["'][^>]*\\bcontent=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]*\\bcontent=["']([^"']+)["'][^>]*\\b(?:property|name)=["']${escaped}["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return undefined;
}

export async function fetchOgMeta(url: string): Promise<OgMeta | undefined> {
  loadCache();
  if (cache[url]) return cache[url];
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'asb-skills og-meta fetcher (https://skills.asmartbear.com)' },
    });
    if (!res.ok) {
      console.warn(`[og-meta] ${url} → HTTP ${res.status}`);
      return undefined;
    }
    const html = await res.text();
    const meta: OgMeta = {
      image: extractMeta(html, 'og:image'),
      imageWidth: extractMeta(html, 'og:image:width'),
      imageHeight: extractMeta(html, 'og:image:height'),
      imageAlt: extractMeta(html, 'og:image:alt'),
      title: extractMeta(html, 'og:title'),
      description: extractMeta(html, 'og:description'),
      siteName: extractMeta(html, 'og:site_name'),
      publishedTime: extractMeta(html, 'article:published_time'),
      modifiedTime: extractMeta(html, 'article:modified_time'),
      author: extractMeta(html, 'article:author'),
      fetchedAt: new Date().toISOString(),
    };
    cache[url] = meta;
    saveCache();
    return meta;
  } catch (err) {
    console.warn(`[og-meta] fetch failed for ${url}: ${(err as Error).message}`);
    return undefined;
  }
}
