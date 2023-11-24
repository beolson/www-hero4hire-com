import Post from "../interfaces/post";
// import markdownStyles from "../../styles/markdown-styles.module.css";

const Article = ({ post }: { post: Post }) => {
  return (
    <div className="container w-full md:max-w-5xl mx-auto pt-20">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
        <div className="font-sans">
          <p className="text-base md:text-sm text-green-500 font-bold">
            &lt;{" "}
            <a href="#" className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">
              BACK TO BLOG
            </a>
          </p>
          <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
            {post.title}
          </h1>
          <p className="text-sm md:text-base font-normal text-gray-600">Published 19 February 2019</p>

          <div className="text-base md:text-sm text-gray-500 py-2">
            Tags:{" "}
            <a href="#" className="text-base md:text-sm text-green-500 no-underline hover:underline">
              Link
            </a>{" "}
            .{" "}
            <a href="#" className="text-base md:text-sm text-green-500 no-underline hover:underline">
              Link
            </a>
          </div>
        </div>
      </div>

      <div className="prose lg:prose-xl max-w-none px-6" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="font-sans flex justify-between content-center px-4 py-6">
        <div className="text-left">
          <span className="text-xs md:text-sm font-normal text-gray-600">&lt; Previous Post</span>
          <br />
          <p>
            <a
              href="#"
              className="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
            >
              Blog title
            </a>
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs md:text-sm font-normal text-gray-600">Next Post &gt;</span>
          <br />
          <p>
            <a
              href="#"
              className="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
            >
              Blog title
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Article };
