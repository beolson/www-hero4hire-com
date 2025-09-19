import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

function slugify(str: string) {
    return str.split("/").map(s => {
        s = s.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
        s = s.toLowerCase(); // convert string to lowercase
        s = s.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-'); // remove consecutive hyphens
        return s;
    }).join("/");

}
 
const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
  }),
  transform: (doc) => {
    return {
        ...doc,
        slug: slugify(`${doc._meta.directory}/${doc._meta.fileName.substring(0, doc._meta.fileName.lastIndexOf("."))}`),
    };
  }
});
 
export default defineConfig({
  collections: [posts],
});