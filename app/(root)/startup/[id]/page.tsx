
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import clientPromise from "@/lib/mongodb";
import { formatDate } from "@/lib/utils";
import { ObjectId } from "mongodb";
import Image from "next/image";

import Link from "next/link";
import { Suspense } from "react";
import markdownit from 'markdown-it'
import { notFound } from "next/navigation";
import { PostsType } from "../../page";
const md = markdownit()
export const experimental_ppr = true
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
    if (!ObjectId.isValid(id)) {
        return notFound();
    }
    const client = await clientPromise;
    const db = client.db("Times");
    const postModel = db.collection("posts")
    const postArray = (await postModel.aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
            $lookup: {
                from: "authors",
                localField: "author",
                foreignField: "_id",
                as: "author",
            },
        },
        { $unwind: "$author" },
    ]).toArray()) as PostsType[];

    const post: PostsType | undefined = postArray[0];
    console.log(post);

    const parsedContent = md.render(post?.pitch || '')
    if (!post) return notFound()
    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(post?.createdAt)}</p>
                <h1 className="heading">{post?.title}</h1>
                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>
            <section className="section_container">
                <Image className="w-full h-auto rounded-xl" width={700} height={400} src={post.image} alt="image" />
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post.author._id}`} className="flex gap-2 items-center mb-3">
                            <Image src={post?.author?.image} alt="avater" width={64} height={64} className="rounded-full drop-shadow-lg" />
                            <div>
                                <p className="text-20-medium">{post?.author?.name}</p>
                                <p className="text-16-medium !text-black-300">@{post?.author?.username}</p>
                            </div>
                        </Link>
                        <p className="category-tag">{post?.category}</p>
                    </div>
                    <h3 className="text-30-bold"> Post Details</h3>
                    {parsedContent ?
                        <article className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html: parsedContent }} />
                        : <p className="no-result">No details provided</p>
                    }
                </div>
                <hr className="divider" />
                {/* recomanded */}
            </section>
            <Suspense fallback={<Skeleton className="view_skeleton" />}>
                <View id={id} views={post?.views} />
            </Suspense>
        </>
    )
}

export default Page