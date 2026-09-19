import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { ProductSchema } from "@/lib/validations/product";

// GET /api/products - Get all products
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");
    const stockStatus = url.searchParams.get("stockStatus");
    const sortBy = url.searchParams.get("sortBy") || "title";

    // Pagination
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Filters
    const where: Prisma.ProductWhereInput = {};

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

    // Server-side sorting
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

    // Get paginated products
    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    // Total matching products
    const total = await prisma.product.count({
      where,
    });

    const totalPages = Math.ceil(total / limit);

    // Product statistics
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
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      stats: {
        inStock,
        outOfStock,
        lowStock,
      },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);

    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
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
    console.error("POST /api/products error:", error);

    return Response.json({ error: "Invalid product data" }, { status: 400 });
  }
}
