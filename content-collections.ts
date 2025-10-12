import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core";
import type { MDXContent } from "mdx/types";
import { z } from "zod";

function slugify(str: string) {
  return str
    .split("/")
    .map((s) => {
      s = s.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
      s = s.toLowerCase(); // convert string to lowercase
      s = s
        .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-"); // remove consecutive hyphens
      return s;
    })
    .join("/");
}

const authors = defineCollection({
  name: "authors",
  directory: "content/authors",
  include: "**/*.mdx",
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    github: z.string(),
    youtube: z.string(),
  }),
});

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    datePosted: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    authors: z.string().array(),
  }),
  transform: async (document, context) => {
    const mdxContent = createDefaultImport<MDXContent>(
      `@content/posts/${document._meta.filePath}`,
    );

    console.log("me");
    const foundAuthors = await context
      .documents(authors)
      .filter((a) => document.authors.some((da) => da === a.shortName));

    console.log(foundAuthors);

    return {
      ...document,
      slug: slugify(
        `${document._meta.directory}/${document._meta.fileName.substring(0, document._meta.fileName.lastIndexOf("."))}`,
      ),
      datePosted: new Date(document.datePosted),
      mdxContent,
      authors: foundAuthors,
    };
  },
});

export default defineConfig({
  collections: [posts, authors],
});
