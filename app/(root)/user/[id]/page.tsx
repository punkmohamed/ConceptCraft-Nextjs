import { auth } from "@/auth"
import UserStartUps, { StartupCardSkeleton } from "@/components/UserStartUps"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export const experimental_ppr = true
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
    const session = await auth()
    const client = await clientPromise
    const db = client.db("Times")
    const userModel = db.collection("authors")
    const user = await userModel.findOne({ _id: new ObjectId(id) })

    console.log(session, "session");

    if (!user) return notFound()
    return (
        <>
            <section className="profile_container">
                <div className="profile_card">
                    <div className="profile_title">
                        <h3 className="text-24-black uppercase text-center line-clamp-1">{user.name}</h3>
                    </div>
                    <Image width={220} height={220} src={user.image} alt="avtar" className="profile_image" />
                    <p className="text-30-extrabold mt-7 text-center">
                        @{user.username}
                    </p>
                    <p className="mt-1 text-center text-14-normal">{user.bio}</p>
                </div>
                <div className="flex flex-col gap-5 flex-1 lg:-mt-5">
                    <p className="text-30-bold">  {session?.user?.email == user.email ? "Your" : "all Start ups"}</p>
                    <ul className="card_grid-sm">
                        <Suspense fallback={<StartupCardSkeleton />}>
                            <UserStartUps id={id} />
                        </Suspense>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Page