import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";

const DIR = path.join(process.cwd(), "content", "thoughts");

export type Post = { slug: string; title: string; date: string; summary: string; draft: boolean };

// tiny frontmatter reader: `key: value` lines between two `---` fences
const parse = (raw: string) => {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  if (!m) return { meta, body: raw };
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: m[2] };
};

const toPost = (slug: string, meta: Record<string, string>): Post => ({
  slug,
  title: meta.title ?? slug,
  date: meta.date ?? "",
  summary: meta.summary ?? "",
  draft: meta.draft === "true",
});

// drafts only exist in dev, so they can be previewed but never ship
const visible = (p: Post) => !p.draft || process.env.NODE_ENV !== "production";

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

// `![caption](fig:name.svg)` inlines content/thoughts/<slug>/name.svg, so the figure picks up the site's colours
// (and night mode) from CSS variables instead of being a fixed picture
const renderer = (slug: string) =>
  new Marked({
    renderer: {
      image(href, _title, text) {
        const m = href.match(/^fig:([a-z0-9-]+\.svg)$/);
        const file = m && path.join(DIR, slug, m[1]);
        if (!file || !fs.existsSync(file)) return false;
        const svg = fs.readFileSync(file, "utf8").replace("<svg ", `<svg role="img" aria-label="${esc(text)}" `);
        return `<figure class="k-fig">${svg}<figcaption>${esc(text)}</figcaption></figure>`;
      },
      link(href, _title, text) {
        return `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      },
      paragraph(text) {
        return text.startsWith("<figure") ? text : `<p>${text}</p>\n`;
      },
    },
  });

export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => toPost(f.replace(/\.md$/, ""), parse(fs.readFileSync(path.join(DIR, f), "utf8")).meta))
    .filter(visible)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): (Post & { html: string }) | null {
  const file = path.join(DIR, `${slug}.md`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) return null;
  const { meta, body } = parse(fs.readFileSync(file, "utf8"));
  const post = toPost(slug, meta);
  if (!visible(post)) return null;
  return { ...post, html: renderer(slug).parse(body, { async: false }) as string };
}
