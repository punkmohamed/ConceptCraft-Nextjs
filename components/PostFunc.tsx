
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
// import { useToast } from "@/hooks/use-toast";


const PostFunc = ({ id }: { id: string }) => {
    // const { toast } = useToast();
    const handleDelete = async () => {
        "use server"
        const client = await clientPromise
        const db = client.db("Times")
        const postModel = db.collection("posts")
        try {

            await postModel.findOneAndDelete({ _id: new ObjectId(id) })
            // toast({
            //     variant: "destructive",
            //     title: 'Error',
            //     description: "Fix you input and try again",
            // })
            revalidatePath('/')

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="rounded-md p-1 hover:bg-red-50 transition-colors group">
                    <Trash className="size-[17px] text-red-600 group-hover:text-red-700" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-none">
                <DialogHeader>
                    <DialogTitle className="text-black-200 text-xl font-semibold">
                        Delete Post
                    </DialogTitle>
                    <DialogDescription className="text-black-300">
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 flex gap-3">
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="border-2 border-black-100 text-black-100 hover:bg-black-100 hover:text-white transition-colors"
                        >
                            Cancel
                        </Button>
                    </DialogTrigger>
                    <form action={handleDelete}>
                        <Button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 text-white"
                        >
                            Delete
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PostFunc