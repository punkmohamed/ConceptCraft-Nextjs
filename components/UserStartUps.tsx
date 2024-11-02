import { cn } from "@/lib/utils"
import Posts from "./Posts"
import { Skeleton } from "./ui/skeleton"
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { PostsType } from "@/app/(root)/page";

const UserStartUps = async ({ id }: { id: string }) => {
    const client = await clientPromise;
    const db = client.db("Times");
    const postModel = db.collection("posts")
    const posts = (await postModel.aggregate([
        { $match: { author: new ObjectId(id) } },
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


    return (
        <>
            {posts?.length > 0 ? (
                posts?.map((post: PostsType) => (
                    <Posts key={post?._id} post={post} />
                ))
            ) : <p className="no-results">Nothing found </p>}
        </>
    )
}

export const StartupCardSkeleton = () => (
    <>
        {[0, 1, 2, 3, 4, 5].map((i: number) => (
            <li key={cn('skeleton', i)}>
                <Skeleton className="start-card_skeleton" />
            </li>
        ))}
    </>
)
export default UserStartUps