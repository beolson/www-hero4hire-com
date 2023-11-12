import Post from "../interfaces/post";
import { getAllPosts } from "@/lib/postAccessor";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Header />
      <div className="bg-white sm:py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            {allPosts.map((post) => (
              <ArticleCard post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "author", "coverImage", "excerpt"]);

  return {
    props: { allPosts },
  };
};
