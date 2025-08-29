import Link from "next/link";
import headerStyles from "../styles/Header.module.css";
import utilityStyles from "../styles/utility.module.css";

export default function Header() {
  return (
    <header>
      <div className={utilityStyles.container}>
        <nav className={headerStyles.nav}>
          <Link href={"/"}>
            <a className={headerStyles.nav_link}>Home</a>
          </Link>
          <Link href={"/oracles/categories"}>
            <a className={headerStyles.nav_link}>Oracles</a>
          </Link>
          <Link href={"/moves/categories"}>
            <a className={headerStyles.nav_link}>Moves</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
