import { Header } from "@/components/Header";
import { Post } from "@/interfaces/post";
import { getAllPosts } from "@/lib/postAccessor";
import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";

type Props = {
  allPosts: Post[];
};

export default function PostIndex({ allPosts }: Props) {
  return (
    <>
      <Header />
      <div className="sm:py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            {allPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  return {
    props: { allPosts },
  };
};
