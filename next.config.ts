import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";

const nextConfig = {
 pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
 options: {
   remarkPlugins: [
     ["remark-frontmatter"],
     ["remark-mdx-frontmatter"],
   ],
   rehypePlugins: [],
 },
});

export default withContentCollections(withMDX(nextConfig));