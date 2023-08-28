import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = {
    url: request?.url,
    referrer: request?.referrer,
    referrerPolicy: request?.referrerPolicy,
    method: request?.method,
    headers: request?.headers || {},
  };
  return NextResponse.json(response, {
    status: 200,
  });
}
