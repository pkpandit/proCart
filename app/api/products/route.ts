import { prisma } from "@/lib/prisma"; // Imported database connection
import { ProductSchema } from "@/lib/validations/product"; // Imported product validation schema
// import { ZodError } from "zod";

// GET /api/products - Get all products
export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");

  // pagination part
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;
  const where = {
    ...(category && {
      category: {
        contains: category,
        mode: "insensitive",
      },
    }),
    ...(search && {
      title: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };
  const products = await prisma.product.findMany({
    where,
    skip: skip,
    take: limit,
  });
  const total = await prisma.product.count({
    where,
  });
  const totalPages = Math.ceil(total / limit);

  return Response.json({
    products,
    pagination: { page, limit, total, totalPages },
  });
}
// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = ProductSchema.parse(body);

    /*   if (!body.title || !body.price) {
    return Response.json(
      { error: "Title and price are required" },
      { status: 400 },
    );
  }
 */
    const product = await prisma.product.create({
      data: validatedData,
    });
    return Response.json(product, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Invalid product data" }, { status: 400 });
    /*  if (error instanceof ZodError) {
      return Response.json({ error: error.issues }, { status: 400 });
    }
    return Response.json({ error: "Internal Server Error" }, { status: 500 }); */
  }
}
