import Layout from "../../../components/Layout";
import { getOraclesCategories } from "../../../lib/connector";
import {
  classNames,
  styleAnimationDelay,
  toTitleCase,
} from "../../../lib/util";
import { Container } from "../../../components/atoms/Container";
import { LinkVariant } from "../../../components/atoms/LinkVariant";

export default function Oracles({ categories }) {
  return (
    <Layout pageTitle={"Oracles"}>
      <Container variant="center">
        <p className={classNames("mb-4 text-3xl font-bold", "fadein")}>
          What do you seek?
        </p>
        {[...categories, "combined", "all"].map((category, index) => (
          <div
            key={category}
            className={classNames("mb-4 text-xl font-bold", "fadein")}
            style={styleAnimationDelay(index * 0.025 + 0.25)}
          >
            <p className={"mt-2 mr-0 mb-1 ml-0"}>
              <LinkVariant
                href={
                  category === "all"
                    ? `/oracles`
                    : `/oracles/categories/${category}`
                }
              >
                {toTitleCase(category)}
              </LinkVariant>
            </p>
          </div>
        ))}
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { categories: getOraclesCategories() } };
}
