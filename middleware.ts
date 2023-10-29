import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/supabase/database.types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  // log
  console.log(`middleware: ${request.method} ${request.nextUrl.origin} ${request.nextUrl.pathname}`);
  // supabase auth middleware
  const response = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({
    req: request,
    res: response,
  });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    // delete cookies
    response.cookies.delete(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL_COOKIE}-auth-token`);
    response.cookies.delete(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL_COOKIE}-auth-token-code-verifier`);
  }
  // log
  console.log("session", session);
  return response;
}

export const config = {
  matcher: "/:path*",
};
