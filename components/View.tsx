import clientPromise from "@/lib/mongodb"
import Ping from "./Ping"
import { ObjectId } from "mongodb"

const View = async ({ id, views }: { id: string, views: number }) => {
    const client = await clientPromise
    const db = client.db("Times")
    const postModel = db.collection("posts")
    await postModel.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } })



    return (
        <div className="view-container z-30">
            <div className=" absolute -top-2 -right-2 ">
                <Ping />
            </div>
            <p className="view-text">
                <span className="font-black"> {views} views</span>
            </p>
        </div>
    )
}

export default View