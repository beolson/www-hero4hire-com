import { Header } from "@/components/Header";
import { GetPostsResponse, Post } from "../interfaces/post";
import { getPosts } from "@/lib/postAccessor";
import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";

type Props = {
  allPosts: GetPostsResponse;
};

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Header />
      <div className="py-8">

        {allPosts.posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}

      </div>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = await getPosts({ page: 1 });

  return {
    props: { allPosts },
  };
};
