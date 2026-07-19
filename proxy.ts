import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function proxy(request:any){
      const token=await request.cookies.get("token")?.value;

    if(!token){
        console.log("Token not found");
        return NextResponse.redirect(
           new URL("/auth/signin",request.url)
    )
    }
try{
    const decoded:any= await verifyToken(token);
     const role=decoded.role;
     const path=request.nextUrl.pathname;

     if(path.startsWith("/admin") && role !=="ADMIN"){
        return NextResponse.redirect(
           new URL("/unauthorized",request.url)
    )}

     if(path.startsWith("/user") && role !=="STUDENT"){
            return NextResponse.redirect(
            new URL("/unauthorized",request.url)
        )}
    return NextResponse.next();
}catch(error){
    console.log(error)
    return NextResponse.redirect(
        new URL("/auth/signin",request.url)
    )
}

}
export const config={
matcher: [
    "/admin/:path*",
    "/user/:path*",
],
}