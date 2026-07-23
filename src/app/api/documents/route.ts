// src/app/api/documents/route.ts
// API: GET /api/documents — returns all documents
// API: POST /api/documents — save a generated document (auth required)

import { NextResponse } from "next/server";
import { documents } from "@/data/documents";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();
  const limit = parseInt(searchParams.get("limit") || "50");
  const premium = searchParams.get("premium");

  let result = [...documents];

  if (category) result = result.filter((d) => d.categoryId === category);
  if (q) result = result.filter((d) =>
    d.name.toLowerCase().includes(q) ||
    d.nameHi.toLowerCase().includes(q) ||
    d.tags.some((t) => t.includes(q))
  );
  if (premium === "false") result = result.filter((d) => !d.isPremium);
  if (premium === "true") result = result.filter((d) => d.isPremium);

  return NextResponse.json({
    success: true,
    data: result.slice(0, limit),
    total: result.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateSlug, formData } = body;

    if (!templateSlug || !formData) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // In production: save to Supabase via Prisma
    // const session = await getServerSession(authOptions);
    // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // const doc = await prisma.generatedDocument.create({ ... });

    return NextResponse.json({
      success: true,
      data: {
        id: `doc-${Date.now()}`,
        templateSlug,
        createdAt: new Date().toISOString(),
        downloadUrl: `/preview/${templateSlug}`,
      },
    }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
