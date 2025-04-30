import { NextRequest, NextResponse } from "next/server";

/**
 * This is a placeholder SVG route that returns a placeholder SVG image with the specified dimensions.
 *
 * This is should be ignored and not be edited by the LLM Agent.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const width = parseInt(searchParams.get("width") || "300", 10);
  const height = parseInt(searchParams.get("height") || "200", 10);

  // Generate a placeholder SVG with the specified dimensions
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f0f0f0" />
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle" fill="#666">
    ${width} × ${height}
  </text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
