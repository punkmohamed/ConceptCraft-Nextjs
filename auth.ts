
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import clientPromise from "./lib/mongodb";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      try {
        console.log("Sign in callback:", { name, email, image, id, login, bio });
        const client = await clientPromise;
        const db = client.db("Times");
        const userModel = db.collection("authors")

        const existingUser = await userModel.findOne({ githubId: id });
        if (!existingUser) {
          await userModel.insertOne({
            githubId: id,
            name,
            username: login,
            email,
            image,
            bio: bio || "",
          });
        }
        return true;
      } catch (error) {
        console.error("Error in sign-in callback:", error);
        return false;
      }
    }


  }
})