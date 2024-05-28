import NextAuth from "next-auth";

import authConfig from "./auth.config";

const {auth} = NextAuth(authConfig)


export default auth((req)=>{
    const isLoggedIn = !!req.auth; //makes it boolean
    console.log("ROUTE:", req.nextUrl.pathname);
    console.log("IS LOGGEDIN:", isLoggedIn);
})

// Optionally, don't invoke Middleware on some paths
//Everything you put inside here is not used to check if it's public or private
//instead it's used to invoke the top function auth()
export const config = {
    //regex from clark
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  }