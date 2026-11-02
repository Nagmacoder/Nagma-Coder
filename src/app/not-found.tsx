import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="wrap page notfound">
      <div className="terminal terminal--static">
        <div className="terminal__bar">
          <span className="terminal__dots" aria-hidden="true">
            <i /> <i /> <i />
          </span>
          <span className="terminal__title">~/nagma.exe</span>
        </div>
        <div className="terminal__screen">
          <p className="terminal__line terminal__line--cmd">
            <span className="terminal__prefix">$</span> cd this-page
          </p>
          <p className="terminal__line terminal__line--err">
            <span className="terminal__prefix">&gt;</span> 404: route not found in nagma.exe
          </p>
        </div>
      </div>
      <h1 className="page-title">This page doesn&apos;t exist.</h1>
      <p className="page-lede">It may have moved, or the link has a typo. These routes do exist:</p>
      <div className="hero__ctas">
        <Link href="/" className="btn btn--primary">
          Go home
        </Link>
        <Link href="/projects" className="btn btn--ghost">
          View Projects
        </Link>
        <Link href="/contact" className="btn btn--ghost">
          Contact Me
        </Link>
      </div>
    </div>
  );
}
