// src/app/api/documents/[slug]/route.ts
// API: GET /api/documents/[slug] — returns single document template

import { NextResponse } from "next/server";
import { getDocumentBySlug } from "@/data/documents";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);

  if (!doc) {
    return NextResponse.json({ success: false, error: "Document not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: doc });
}
