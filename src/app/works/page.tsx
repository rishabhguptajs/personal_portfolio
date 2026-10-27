import type { Metadata } from "next";
import WorksList from "../components/WorksList";

export const metadata: Metadata = { title: "works" };

export default function Works() {
  return (
    <main id="main" className="k-main k-page k-fixed">
      <h1 className="k-title">~/works</h1>
      <p className="k-lede">things i&apos;ve built, newest first. open one up.</p>
      <WorksList />
    </main>
  );
}
