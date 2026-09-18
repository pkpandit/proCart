import { prisma } from "@/lib/prisma"; // Imported database connection
import { Prisma } from "@/app/generated/prisma/client";
import { ProductSchema } from "@/lib/validations/product"; // Imported product validation schema

// GET /api/products - Get all products
export async function GET(request: Request) {
  const url = new URL(request.url);

  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");
  const stockStatus = url.searchParams.get("stockStatus");
  const sortBy = url.searchParams.get("sortBy") || "title";
  // pagination part
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;
  const where: Prisma.ProductWhereInput = {};

  let orderBy: Prisma.ProductOrderByWithRelationInput = {
    title: "asc",
  };

  if (sortBy === "price-asc") {
    orderBy = {
      price: "asc",
    };
  }

  if (sortBy === "price-desc") {
    orderBy = {
      price: "desc",
    };
  }

  if (sortBy === "rating") {
    orderBy = {
      rating: "desc",
    };
  }
  if (category) {
    where.category = {
      equals: category,
      mode: "insensitive",
    };
  }

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (stockStatus) {
    if (stockStatus === "In Stock") {
      where.inStock = true;
    }

    if (stockStatus === "Out of Stock") {
      where.inStock = false;
    }

    if (stockStatus === "Low Stock") {
      where.inStock = true;
      where.stockLeft = {
        lt: 20,
      };
    }
  }

  // Stats should ignore stockStatus
  const statsWhere: Prisma.ProductWhereInput = {};

  if (category) {
    statsWhere.category = {
      equals: category,
      mode: "insensitive",
    };
  }

  if (search) {
    statsWhere.title = {
      contains: search,
      mode: "insensitive",
    };
  }
  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip,
    take: limit,
  });

  const total = await prisma.product.count({
    where,
  });

  const totalPages = Math.ceil(total / limit);

  const [inStock, outOfStock, lowStock] = await Promise.all([
    prisma.product.count({
      where: {
        ...statsWhere,
        inStock: true,
      },
    }),

    prisma.product.count({
      where: {
        ...statsWhere,
        inStock: false,
      },
    }),

    prisma.product.count({
      where: {
        ...statsWhere,
        inStock: true,
        stockLeft: {
          lt: 20,
        },
      },
    }),
  ]);

  return Response.json({
    products,
    pagination: { page, limit, total, totalPages },
    stats: { inStock, outOfStock, lowStock },
  });
}
// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = ProductSchema.parse(body);

    const product = await prisma.product.create({
      data: validatedData,
    });
    return Response.json(product, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Invalid product data" }, { status: 400 });
  }
}
