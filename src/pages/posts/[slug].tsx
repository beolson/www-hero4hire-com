import { useRouter } from "next/router";
import ErrorPage from "next/error";

import markdownToHtml from "../../lib/markdownToHtml";
import { Post } from "@/interfaces/post";
import { getPost, getPosts } from "@/lib/postAccessor";
import markdownStyles from "../../styles/markdown-styles.module.css";
import { Article } from "@/components/Article";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
type Props = {
  post: Post;
};

export default function Post({ post }: Props) {
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
  const post = await getPost(params.slug);
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
  const { posts } = await getPosts({});

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
