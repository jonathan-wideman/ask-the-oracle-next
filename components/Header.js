import Link from "next/link";
import { Container } from "./atoms/Container";

export default function Header() {
  return (
    <header className="bg-zinc-800">
      <Container>
        <nav className="flex justify-center gap-4">
          <Link href={"/"} className="p-4">
            Home
          </Link>
          <Link href={"/oracles/categories"} className="p-4">
            Oracles
          </Link>
          <Link href={"/moves/categories"} className="p-4">
            Moves
          </Link>
        </nav>
      </Container>
    </header>
  );
}
