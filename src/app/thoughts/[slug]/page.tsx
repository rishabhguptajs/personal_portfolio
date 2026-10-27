import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "../../lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  return (
    <main id="main" className="k-main k-page k-fixed k-wide">
      <p className="k-meta">
        <Link href="/thoughts">← thoughts</Link>
      </p>
      <h1 className="k-title">{post.title}</h1>
      <p className="k-lede">
        {post.date}
        {post.draft ? " · draft, only visible locally" : ""}
      </p>
      <div className="k-scroll k-post" tabIndex={0} aria-label={post.title} dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  );
}
