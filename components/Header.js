import Link from "next/link";
import headerStyles from "../styles/Header.module.css";
import utilityStyles from "../styles/utility.module.css";

export default function Header() {
  return (
    <header>
      <div className={utilityStyles.container}>
        <nav className={headerStyles.nav}>
          <Link href={"/"} className={headerStyles.nav_link}>
            Home
          </Link>
          <Link href={"/oracles/categories"} className={headerStyles.nav_link}>
            Oracles
          </Link>
          <Link href={"/moves/categories"} className={headerStyles.nav_link}>
            Moves
          </Link>
        </nav>
      </div>
    </header>
  );
}
