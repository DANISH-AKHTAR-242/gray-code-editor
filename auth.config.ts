import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

const authSecret =
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    globalThis.crypto?.randomUUID?.() ??
    "local-dev-auth-secret";

export default {
    secret: authSecret,
    providers:[
        GitHub({
            clientId:process.env.AUTH_GITHUB_ID,
            clientSecret:process.env.AUTH_GITHUB_SECRET
        }),
        Google({
            clientId:process.env.AUTH_GOOGLE_ID,
            clientSecret:process.env.AUTH_GOOGLE_SECRET,
        })
    ]
} satisfies NextAuthConfig
