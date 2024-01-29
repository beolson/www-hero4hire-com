import { Header } from "@/components/Header";
import { GetPostsResponse, Post } from "@/interfaces/post";
import { getPosts, getAllTags } from "@/lib/postAccessor";
import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

type Props = {
  posts: GetPostsResponse;
  allTags: Array<{ tag: string, count: number }>
};

export default function PostIndex({ posts, allTags }: Props) {
  const router = useRouter();

  const selectTag = (tag: string) => {
    router.query.tag = tag;
    router.push(router)
  }

  return (
    <>
      <Header />
      <div className="py-8">
        <div className="flex flex-wrap items-start justify-center  pt-10">
          {allTags.map(tag => (

            <button onClick={() => selectTag(tag.tag)} className={`relative px-3 py-1 m-2 rounded-md 
                                                                  shadow-sm sm:py-2 sm:text-base ring 
                                                                  ring-transparent group md:px-4 hover:ring 
                                                                  hover:ring-opacity-50 focus:ring-opacity-50 
                                                                  hover:ring-green-600 text-gray-900 
                                                                  bg-gray-200 dark:bg-gray-400 
                                                                  dark:text-gray-200 
                                                                  ${tag.tag === router.query.tag ? "bg-green-300" : "bg-gray-200"}`} >
              <span className="text-sm">{tag.tag} ({tag.count})</span>
            </button>

          ))}
        </div>
        {posts.posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const posts = await getPosts({});
  const allTags = await getAllTags();
  return {
    props: { posts, allTags },
  };
};
