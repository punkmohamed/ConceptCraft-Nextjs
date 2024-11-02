import Posts from "@/components/Posts";
import SearchForm from "../../components/SearchForm";
import clientPromise from "@/lib/mongodb";

export type UserType = {
  _id: string,
  githubId: number,
  name: string,
  username: string,
  email: string,
  image: string,
  bio: string,

}
export type PostsType = {
  createdAt: string | Date
  views: number;
  slug: string
  author: UserType
  _id: string;
  description: string;
  image: string;
  category: string;
  title: string;
  pitch: string
}
type AggregationStage =
  | { $match: Record<string, unknown> }
  | { $lookup: { from: string; localField: string; foreignField: string; as: string } }
  | { $unwind: string };


// export const revalidate = 60
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query
  const client = await clientPromise;
  const db = client.db("Times");
  const postModel = db.collection("posts")
  const aggregatePipeline: AggregationStage[] = [
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    { $unwind: "$author" },
    { $sort: { createdAt: -1 } },
  ];


  if (query) {
    aggregatePipeline.unshift({
      $match: {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      },
    });
  }
  console.log("Querying posts with aggregatePipeline:", aggregatePipeline);
  const posts = (await postModel.aggregate(aggregatePipeline).toArray()) as PostsType[];

  console.log("Fetched posts:", posts);
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">pitch your startup, connect with entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for ${query}` : 'All Startups'}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts?.map((post: PostsType) => (
              <Posts key={post?._id} post={post} />
            ))
          ) : <p className="no-results">Nothing found </p>}
        </ul>
      </section>
    </>
  );
}
