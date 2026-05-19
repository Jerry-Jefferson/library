import { connectMongo } from "@/lib/mongoose";
import { Book } from "@/src/models/book";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  await connectMongo();
  const { id } = await params;

  const book = await Book.findById(id).select("image");

  if (!book?.image?.data) return new NextResponse(null, { status: StatusCodes.NOT_FOUND });

  return new NextResponse(book.image.data, {
    headers: {
      "Content-Type": book.image.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
