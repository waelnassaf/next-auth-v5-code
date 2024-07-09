//Middleware is not Next-Auth specific, but Next.js specific
import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes"
const { auth } = NextAuth(authConfig)

//TODO: FIX ANY
export default auth((req): any => {
    const { nextUrl } = req
    const isLoggedIIn = !!req.auth
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    if (isApiAuthRoute) {
        return null
    }
    if (isAuthRoute) {
        if (isLoggedIIn)
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        return null
    }
    if (!isLoggedIIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname
        if (nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl)

        return Response.redirect(
            new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        )
    } //Returning null means allow this, don't do anything if this happens
    return null
})

//The following means we need to invoke the middleware on every single thing except the paths
//listed in the regex.
//The following is a Clerk regex which is much better than Next-Auth one
//The following will invoke the middleware on every path except for static files.
export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
