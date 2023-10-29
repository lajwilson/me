import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/supabase/database.types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
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

  if (!session || error) {
    // delete cookies
    response.cookies.delete(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL_COOKIE}-auth-token`);
    response.cookies.delete(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL_COOKIE}-auth-token-code-verifier`);
  }
  return response;
}

export const config = {
  matcher: "/:path*",
};
