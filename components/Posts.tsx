import { PostsType } from "@/app/(root)/page"
import { formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { auth } from "@/auth"
import PostFunc from "./PostFunc"



const Posts = async ({ post }: { post: PostsType }) => {
    const { createdAt, views, author: { _id: authorId, name, email, image: authorImage }, title, category, _id, image, description } = post
    const session = await auth()
    console.log(session);


    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDate(createdAt)}
                </p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary" />
                    <span className="text-16-medium">{views}</span>
                    {session?.user?.email === email && <PostFunc id={_id} />}
                </div>

            </div>
            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${authorId}`}>
                        <p className="text-16-medium line-clamp-1">{name}</p></Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">{title}</h3></Link>
                </div>
                <Link href={`/user/${authorId}`} className="size-12">
                    <Image src={authorImage} className="rounded-full object-cover size-full" width={48} height={48} alt={name} /></Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">{description}</p>
                <Image width={100} height={100} src={image} alt="placeholder" className="startup-card_img" />
            </Link>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p></Link>
                <Button className="startup-card_btn" asChild>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
    )
}

export default Posts