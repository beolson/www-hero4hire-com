import fs from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import { Post } from "@/interfaces/post";
// const postsDirectory = join(process.cwd(), '_blog')

// export function getPostSlugs() {
//   return fs.readdirSync(postsDirectory)
// }

// export function getPostBySlug(slug: string, fields: string[] = []) {
//   const realSlug = slug.replace(/\.md$/, '')
//   const fullPath = join(postsDirectory, `${realSlug}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')
//   const { data, content } = matter(fileContents)

//   type Items = {
//     [key: string]: string
//   }

//   const items: Items = {}

//   // Ensure only the minimal needed data is exposed
//   fields.forEach((field) => {
//     if (field === 'slug') {
//       items[field] = realSlug
//     }
//     if (field === 'content') {
//       items[field] = content
//     }

//     if (typeof data[field] !== 'undefined') {
//       items[field] = data[field]
//     }
//   })

//   return items
// }

// export function getAllPosts(fields: string[] = []) {
//   const slugs = getPostSlugs()
//   const posts = slugs
//     .map((slug) => getPostBySlug(slug, fields))
//     // sort posts by date in descending order
//     .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
//   return posts
// }

const postsDirectory = join(process.cwd(), "_blog");

const fileStringToSlug = (file: string) => {
  return file.replace(/\.md$/, "").replace(" ", "_");
};

const getAllPosts = async (): Promise<Array<Post>> => {
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
      tags: [],
    });
  }

  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
};

const getPostBySlug = async (slug: string): Promise<Post> => {
  const allPosts = await getAllPosts();
  const post = allPosts.find((p) => p.slug === slug);
  if (post) {
    return post;
  } else {
    throw new Error("Post not found for slug");
  }
};

const getPostsByTag = () => {};

const getAllTags = () => {};

export { getAllPosts, getPostBySlug };
