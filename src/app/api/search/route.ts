// src/app/api/search/route.ts
// GET /api/search?q=rent&limit=10

import { NextResponse } from "next/server";
import { documents } from "@/data/documents";
import { categories } from "@/data/categories";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase().trim() || "";
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!q) {
    return NextResponse.json({ success: true, data: [], total: 0 });
  }

  const results = documents
    .filter((d) =>
      d.name.toLowerCase().includes(q) ||
      d.nameHi.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
    )
    .map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      nameHi: d.nameHi,
      description: d.description,
      estimatedTime: d.estimatedTime,
      isPremium: d.isPremium,
      isPopular: d.isPopular,
      categoryId: d.categoryId,
      category: categories.find((c) => c.id === d.categoryId),
    }))
    .slice(0, limit);

  return NextResponse.json({ success: true, data: results, total: results.length });
}
