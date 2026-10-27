import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "../lib/posts";

export const metadata: Metadata = { title: "thoughts" };

export default function Thoughts() {
  const posts = getPosts();
  return (
    <main id="main" className="k-main k-page k-fixed">
      <h1 className="k-title">~/thoughts</h1>
      <p className="k-lede">
        {posts.length ? "things i wrote, newest first." : "i'll write here when i have something worth saying. nothing published yet."}
      </p>

      <div className="k-scroll" tabIndex={0} aria-label="Thoughts">
        {posts.length > 0 && (
          <ul className="k-list k-plain">
            {posts.map((p) => (
              <li key={p.slug}>
                <p className="k-meta">
                  {p.date}
                  {p.draft ? " · draft" : ""}
                </p>
                <p>
                  <Link href={`/thoughts/${p.slug}`}>{p.title}</Link>
                </p>
                <p className="k-meta">{p.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
