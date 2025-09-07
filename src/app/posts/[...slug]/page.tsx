import { posts, Post, Collections } from "../../../../.velite";


// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
//  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }, { slug: ['2025', 'test copy 2'] }]
//   debugger
 console.log(posts)
  const sluggroups = posts.map((post) => { return { slug: post.slug.split('/')}});

  console.log(sluggroups);
  return sluggroups
}
 
// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  console.log('page', slug)
  // ...
  return <div>hi  </div>
}