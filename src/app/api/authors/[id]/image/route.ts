import { connectMongo } from "@/lib/mongoose";
import { Author } from "@/src/models/author";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  await connectMongo();
  const { id } = await params;

  const author = await Author.findById(id).select("image");

  if (!author?.image?.data) return new NextResponse(null, { status: StatusCodes.NOT_FOUND });

  return new NextResponse(author.image.data, {
    headers: {
      "Content-Type": author.image.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
