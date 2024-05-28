
import NextAuth from "next-auth";

import authConfig from "./auth.config";

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from '@/routes'

const { auth } = NextAuth(authConfig)


export default auth((req) => {
     
    const { nextUrl } = req;
    
    const isLoggedIn = !!req.auth; //makes it boolean
 
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute) {return ;}

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return ;
    }

    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login", nextUrl))
    }

    return ;
})

// Optionally, don't invoke Middleware on some paths
//Everything you put inside here is not used to check if it's public or private
//instead it's used to invoke the top function auth()
export const config = {
    //regex from clark
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  }