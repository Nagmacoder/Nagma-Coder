import Link from "next/link";
import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="wordmark" aria-label="NAGMA.EXE, home">
          <span className="wordmark__name">nagma</span>
          <span className="wordmark__ext">.exe</span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}
