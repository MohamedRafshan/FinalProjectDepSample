import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const category = searchParams.get("category");

    let products = [];

    if (location === "all" && category === "all") {
      products = await prisma.product.findMany({
        include: {
          category: true,
          reviews:true
        },
      });
    } else if (location === "all" && category !== "all") {
      products = await prisma.product.findMany({
        where: {
          mainCategory: category,
        },
        include: {
          category: true,
          reviews:true
        },
      });
    } else if (location !== "all" && category === "all") {
      const stores = await prisma.store.findMany({
        where: {
          district: location,
        },
      });

      const storeIds = stores.map((store) => store.id);

      products = await prisma.product.findMany({
        where: {
          storeId: {
            in: storeIds,
          },
        },
        include: {
          category: true,
          reviews:true
        },
      });
    } else if (location !== "all" && category !== "all") {
      const stores = await prisma.store.findMany({
        where: {
          district: location,
        },
      });

      const storeIds = stores.map((store) => store.id);

      products = await prisma.product.findMany({
        where: {
          storeId: {
            in: storeIds,
          },
          mainCategory: category,
        },
        include: {
          category: true,
          reviews:true
        },
      });
    }
    return NextResponse.json(products);
  } catch (error) {
    return new NextResponse("error inside the getsearchproduct GET", { status: 500 });
  }
}
