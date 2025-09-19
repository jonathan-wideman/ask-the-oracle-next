import Link from "next/link";
import { Container } from "./atoms/Container";

export default function Footer() {
  return (
    <footer className="absolute right-0 left-0 bottom-0 bg-zinc-800">
      <Container>
        <div className="flex flex-col items-center text-center text-sm p-4">
          <p>©2025 Jonathan Wideman</p>
          <Link href={"/api-docs"}>API Documentation</Link>
          <p>
            Based on{" "}
            <Link href={"https://www.ironswornrpg.com/"}>Ironsworn TTRPG</Link>{" "}
            by Shawn Tomkin
          </p>
        </div>
      </Container>
    </footer>
  );
}
