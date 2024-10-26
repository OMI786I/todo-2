import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    rolling: false,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null; // Return null if email or password is not provided
        }

        const db = await connectDB();
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          return null; // Return null if no user is found with the provided email
        }

        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null; // Return null if the password does not match
        }

        // If authentication is successful, return the user object
        return {
          email: currentUser.email,
          name: currentUser.name,
          id: currentUser._id,
        }; // Return the user info you need
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to your login page
  },
  callbacks: {
    async signIn({ user }) {
      return !!user; // If user exists, return true to allow sign-in
    },
    async jwt({ token, user }) {
      // If a user is signed in, add their ID to the token
      if (user) {
        token.id = user.id; // Store user ID in the token
      }
      return token;
    },
    async session({ session, token }) {
      // Include the user ID in the session object
      if (token) {
        session.user.id = token.id; // Add user ID to session
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
