import { auth, signOut, signIn } from "@/auth"
import { BadgePlus, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import clientPromise from "@/lib/mongodb"


const Navbar = async () => {
    const session = await auth()
    const client = await clientPromise;
    const db = client.db("Times");
    const userModel = db.collection("authors")


    const existingUser = await userModel.findOne({ email: session?.user?.email });

    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href='/'>
                    <Image src='/logo.webp' alt="logo" width={144} height={30} />
                </Link>
                <div className="items-center gap-5 flex text-black">
                    {session && session?.user ? (
                        <>
                            <Link href='/startup/create'><span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>
                            <form className="flex items-center" action={async () => {
                                "use server";
                                await signOut()
                            }}>
                                <button className="max-sm:hidden" type="submit"> <span >Log out</span> </button>
                                <LogOut className="size-6 sm:hidden text-red-500" />
                            </form>
                            <Link href={`/user/${existingUser?._id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn('github')
                        }
                        }>
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
