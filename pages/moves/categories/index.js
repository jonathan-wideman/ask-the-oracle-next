import Link from "next/link";
import Layout from "../../../components/Layout";
import { getMovesCategories } from "../../../lib/connector";
import {
  classNames,
  styleAnimationDelay,
  toTitleCase,
} from "../../../lib/util";
import { Container } from "../../../components/atoms/Container";

export default function Moves({ categories }) {
  return (
    <Layout pageTitle={"Moves"}>
      <main>
        <Container variant="center">
          <p
            className={classNames("mb-4 text-3xl font-bold", "fadein")}
          >
            What will you do?
          </p>
          {[...categories, "all"].map((category, index) => (
            <div
              key={category}
              className={classNames("mb-4 text-xl font-bold", "fadein")}
              style={styleAnimationDelay(index * 0.025 + 0.25)}
            >
              <p className={"mt-2 mr-0 mb-1 ml-0"}>
                <Link
                  href={
                    category === "all"
                      ? `/moves`
                      : `/moves/categories/${category}`
                  }
                >
                  {toTitleCase(category)}
                </Link>
              </p>
            </div>
          ))}
        </Container>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { categories: getMovesCategories() } };
}
