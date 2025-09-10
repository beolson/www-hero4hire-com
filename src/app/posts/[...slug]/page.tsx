import { posts, Post, Collections } from "../../../../.velite";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  //  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }, { slug: ['2025', 'test copy 2'] }]
  //   debugger
  console.log(posts);
  const sluggroups = posts.map((post) => {
    return { slug: post.slug.split("/") };
  });

  console.log(sluggroups);
  return sluggroups;
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  var post = posts.find((p) => p.slug === slug.join("/"));
  console.log("page", slug);
  // ...
  return (
    <main className="mb-auto">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="fixed right-8 bottom-8 hidden flex-col gap-3 md:hidden">
          <button
            aria-label="Scroll To Comment"
            className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button
            aria-label="Scroll To Top"
            className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <article>
          <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time>Saturday, August 5, 2023</time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
                    {post?.title}
                  </h1>
                </div>
              </div>
            </header>
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
              <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                    <li className="flex items-center space-x-2">
                      <img
                        alt="avatar"
                        loading="lazy"
                        width="38"
                        height="38"
                        decoding="async"
                        data-nimg="1"
                        className="h-10 w-10 rounded-full"
                        src="/_next/image?url=%2Fstatic%2Fimages%2Favatar.png&amp;w=96&amp;q=75"
                      />
                      <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          Tails Azimuth
                        </dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          <a
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://twitter.com/Twitter"
                          >
                            @Twitter
                          </a>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </dd>
              </dl>
              <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
                <div
                  className="prose dark:prose-invert max-w-none pt-10 pb-8"
                  
                >
                  <h2 className="content-header" id="introduction">
                    <a
                      className="break-words"
                      href="#introduction"
                      aria-hidden="true"
                     
                    >
                      <span className="content-header-link">
                        <svg
                          className="h-5 linkicon w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"></path>
                          <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"></path>
                        </svg>
                      </span>
                    </a>
                    Introduction
                  </h2>
                  <span dangerouslySetInnerHTML={{
                    __html: post?.content ? post.content : "none",
                  }}></span >
                </div>
                <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                  <a
                    className="break-words"
                    target="_blank"
                    rel="nofollow"
                    href="https://mobile.twitter.com/search?q=https%3A%2F%2Ftailwind-nextjs-starter-blog.vercel.app%2Fblog%2Frelease-of-tailwind-nextjs-starter-blog-v2.0"
                  >
                    Discuss on Twitter
                  </a>{" "}
                  •{" "}
                  <a
                    className="break-words"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/data/blog/release-of-tailwind-nextjs-starter-blog-v2.0.mdx"
                  >
                    View on GitHub
                  </a>
                </div>

                <div
                  className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <button>Load Comments</button>
                </div>
              </div>
              <footer>
                <div className="divide-gray-200 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      <a
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                        href="/tags/next-js"
                      >
                        next-js
                      </a>
                      <a
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                        href="/tags/tailwind"
                      >
                        tailwind
                      </a>
                      <a
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                        href="/tags/guide"
                      >
                        guide
                      </a>
                      <a
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                        href="/tags/feature"
                      >
                        feature
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Previous Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <a
                          className="break-words"
                          href="/blog/new-features-in-v1"
                        >
                          New features in v1
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 xl:pt-8">
                  <a
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label="Back to the blog"
                    href="/blog"
                  >
                    ← Back to the blog
                  </a>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
