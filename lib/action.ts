"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify'
import clientPromise from "./mongodb";


export const createPost = async (state: unknown, form: FormData, pitch: string) => {
    const session = await auth()
    if (!session) return parseServerActionResponse({ error: "Not signed in", status: "ERROR" })

    const client = await clientPromise;
    const db = client.db("Times");
    const userModel = db.collection("authors")
    const postModel = db.collection("posts")

    const existingUser = await userModel.findOne({ email: session?.user?.email })

    if (!existingUser) {
        return parseServerActionResponse({ error: "User not found", status: "ERROR" });
    }
    const { title, description, category, link } = Object.fromEntries(Array.from(form).filter(([key]) => key !== "pitch"))
    const slug = slugify(title as string, { lower: true, strict: true })
    try {
        const post = {
            title,
            description,
            category,
            image: link,
            slug,
            author: existingUser._id,
            pitch,
            views: 0,
            createdAt: new Date()
        }
        const result = await postModel.insertOne(post)
        return parseServerActionResponse({ ...result, error: '', status: 'SUCCESS' })
    } catch (error) {
        console.log(error);
        return parseServerActionResponse({ error: JSON.stringify(error), status: "ERROR" })
    }
}