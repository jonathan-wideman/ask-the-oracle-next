import { Container } from "./atoms/Container";
import { LinkVariant } from "./atoms/LinkVariant";

export default function Header() {
  return (
    <header className="bg-zinc-800">
      <Container>
        <nav className="flex justify-center gap-4">
          <LinkVariant href={"/"} className="p-4">
            Home
          </LinkVariant>
          <LinkVariant href={"/oracles/categories"} className="p-4">
            Oracles
          </LinkVariant>
          <LinkVariant href={"/moves/categories"} className="p-4">
            Moves
          </LinkVariant>
        </nav>
      </Container>
    </header>
  );
}
