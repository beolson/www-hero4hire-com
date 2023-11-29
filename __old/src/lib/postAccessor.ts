import fs from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import { GetPostsArgs, GetPostsResponse, Post } from "@/interfaces/post";
const PAGE_SIZE = 10;

const postsDirectory = join(process.cwd(), "_blog");

const fileStringToSlug = (file: string) => {
  return file.replace(/\.md$/, "").replace(" ", "_");
};

const getAllPosts = async () => {
  const postFileNames = await fs.readdir(postsDirectory);
  const posts: Array<Post> = [];
  for (const postFileName of postFileNames) {
    const fileContents = await fs.readFile(join(postsDirectory, postFileName), "utf8");
    const { data, content } = matter(fileContents);

    posts.push({
      content: content,
      date: data["date"],
      excerpt: data["excerpt"],
      slug: fileStringToSlug(postFileName),
      title: data["title"],
      tags: data["tags"],
    });
  }

  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
};

const getPosts = async (args: GetPostsArgs): Promise<GetPostsResponse> => {
  const posts = await getAllPosts();
  const page = args.page ? args.page : 1;
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  return {
    currentPage: page,
    pages: totalPages,
    posts: posts.slice(startIndex, endIndex),
  };
};

const getPost = async (slug: string): Promise<Post> => {
  const allPosts = await getAllPosts();
  const post = allPosts.find((p) => p.slug === slug);
  if (post) {
    return post;
  } else {
    throw new Error("Post not found for slug");
  }
};

const getAllTags = async () => {
  const posts = await getAllPosts();
  const allTags = posts.flatMap((p) => p.tags);
  const result: Array<{ tag: string; count: number }> = [];
  console.log([...new Set(allTags)]);
  for (const tag of [...new Set(allTags)]) {
    const count = allTags.filter((t) => t === tag).length;
    result.push({ tag: tag, count: count });
  }

  return result;
};

export { getPosts, getPost, getAllTags };
