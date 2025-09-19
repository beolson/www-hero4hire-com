import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  assetPrefix: isProd ? "" : "",
  images: { unoptimized: true },
};

export default withContentCollections(nextConfig);
