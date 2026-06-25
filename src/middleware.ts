import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD;

  // No password configured (e.g. local dev) — leave the app open.
  if (!sitePassword) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf-8");
    const [, suppliedPassword] = decoded.split(":");
    if (suppliedPassword === sitePassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Sonnedix QDA"',
    },
  });
}

export const config = {
  matcher: "/:path*",
};
