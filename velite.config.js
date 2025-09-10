import { defineConfig, s } from "velite";

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

export default defineConfig({
  // contentDir: '_content', // content directory

  collections: {
    posts: {
      name: "Post", // collection type name
      pattern: "posts/**/*.mdx", // content files glob pattern

      schema: s
        .object({
          title: s.string().max(99), // Zod primitive type
          //slug: s.slug('posts'), // validate format, unique in posts collection
          slug: s.path(), // auto generate slug from file path
          date: s.isodate(), // input Date-like string, output ISO Date string.

          excerpt: s.excerpt(), // excerpt of markdown content
          content: s.markdown(), // transform markdown to html
        })
        // more additional fields (computed fields)
        .transform((data) => ({
          ...data,
          permalink: `/post/${data.slug}`,
          slug: data.slug.replace("posts/", ""),
        })),
    },
  },
});
