"use client"

import { useActionState, useState } from "react"
import { Input } from "./ui/input"

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { formShema } from "@/lib/validation";
import { z } from "zod";
import { createPost } from "@/lib/action";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const { toast } = useToast();
    const router = useRouter();
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch
            }
            await formShema.parseAsync(formValues)

            const result = await createPost(prevState, formData, pitch)
            if (result.status === "SUCCESS") {
                toast({
                    title: 'Success',
                    description: "The post is created successfully",
                })
                setErrors({})
                router.push(`/startup/${result?.insertedId}`)
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors
                setErrors(fieldErrors as unknown as Record<string, string>)
                toast({
                    variant: "destructive",
                    title: 'Error',
                    description: "Fix you input and try again",
                })
                return { ...prevState, error: 'Validation faild', status: 'ERROR' }
            }
            toast({
                variant: "destructive",
                title: 'Error',
                description: "An unexpecred error has occuared",
            })
            return { ...prevState, error: 'An unexpecred error has occuared', status: "ERROR" }
        }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: '', status: "INITIAL" })



    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input id="title" name="title" className="startup-form_input" placeholder="Title.." required />
                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>
            <div>
                <label htmlFor="description" className="startup-form_label">Description</label>
                <Textarea id="description" name="description" className="startup-form_input" placeholder="Description.." required />
                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>
            <div>
                <label htmlFor="category" className="startup-form_label">
                    Category
                </label>
                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    required
                    placeholder="Startup Category (Tech, Health, Education...)"
                />

                {errors.category && (
                    <p className="startup-form_error">{errors.category}</p>
                )}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">
                    Image URL
                </label>
                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    placeholder="Startup Image URL"
                />

                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">
                    Pitch
                </label>

                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder:
                            "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />

                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>

            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className="size-6 ml-2" />
            </Button>
        </form>
    )
}

export default StartupForm