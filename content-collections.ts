import { createDefaultImport, defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import { MDXContent } from "mdx/types";

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
    datePosted: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
  transform: ({ _meta, ...post }) => {
    const mdxContent = createDefaultImport<MDXContent>(`@/content/posts/${_meta.filePath}`);
    
    return {
        ...post,
        slug: slugify(`${_meta.directory}/${_meta.fileName.substring(0, _meta.fileName.lastIndexOf("."))}`),
        datePosted: new Date(post.datePosted),
        mdxContent,
    };
  }
});
 
export default defineConfig({
  collections: [posts],
});