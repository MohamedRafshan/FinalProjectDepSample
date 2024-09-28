import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {

  const { categoryId, storeId } = params;

  try {
    if (!categoryId) {
      return NextResponse.json(
        { error: "categoryId Id Is Required" },
        { status: 400 }
      );
    }

    const category = await prisma.Category.findUnique({
      where: {
        id: categoryId,
      }
    });

    return NextResponse.json(category);

  } catch (error) {
    console.error("error inside the category GET", error);
    return new NextResponse({ status: 500 }, "Internal Server Error");
  }
}


// in here params should be as a second argument.if it first argument it will not works
export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();
    const { categoryId, storeId } = params;

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!name) {
      return NextResponse.json(
        { error: "name Is Required" },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: "categoryId Id Is Required" },
        { status: 400 }
      );
    }
    if (!storeId) {
      return NextResponse.json(
        { error: "storeId Id Is Required" },
        { status: 400 }
      );
    }

    const storebyuserId = await prisma.store.findFirst({
      where: {
        id: storeId,
        ownerId:userId,
      },
    });

    if (!storebyuserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prisma.Category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(category);

  } catch (error) {
    console.error("error inside the category PATCH", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// in here params should be as a second argument.if it first argument it will not works
export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();
    const { categoryId, storeId } = params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: "categoryId Id Is Required" },
        { status: 400 }
      );
    }
    if (!storeId) {
      return NextResponse.json(
        { error: "storeId Id Is Required" },
        { status: 400 }
      );
    }
    const storebyuserId = await prisma.store.findFirst({
      where: {
        id: storeId,
        ownerId:userId,
      },
    });

    if (!storebyuserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const category = await prisma.Category.deleteMany({
      where: {
        id: categoryId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("error inside the category delete", error);
    return new NextResponse({ status: 500 }, "Internal Server Error");
  }
}