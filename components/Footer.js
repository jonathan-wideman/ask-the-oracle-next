import { Container } from "./atoms/Container";
import { LinkVariant } from "./atoms/LinkVariant";

export default function Footer() {
  return (
    <footer className="absolute right-0 left-0 bottom-0 bg-zinc-800">
      <Container>
        <div className="flex flex-col items-center text-center text-sm p-4">
          <p>©2025 Jonathan Wideman</p>
          <LinkVariant href={"/api-docs"}>API Documentation</LinkVariant>
          <p>
            Based on{" "}
            <LinkVariant href={"https://www.ironswornrpg.com/"}>
              Ironsworn TTRPG
            </LinkVariant>{" "}
            by Shawn Tomkin
          </p>
        </div>
      </Container>
    </footer>
  );
}
