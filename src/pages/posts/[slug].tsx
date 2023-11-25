import { useRouter } from "next/router";
import ErrorPage from "next/error";

import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import { getAllPosts, getPostBySlug } from "@/lib/postAccessor";
import markdownStyles from "../../styles/markdown-styles.module.css";
import { Article } from "@/components/Article";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Header />
      <Article post={post} />
      <Footer />
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "author", "content", "ogImage", "coverImage"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
