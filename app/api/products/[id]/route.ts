import { prisma } from "@/lib/prisma";

// GET /api/products/:id - Get a product by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  //  const product = MOCK_PRODUCTS.find((product) => product.id === id);
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}

// PATCH /api/products/:id - Update a product by ID
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const body = await request.json();

  // Check if the product exists before attempting to update
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: body,
  });

  return Response.json(product);
}

// DELETE /api/products/:id - Delete a product by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // Check if the product exists before attempting to delete
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  // If the product does not exist, return a 404 response
  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  // Delete the product from the database
  const deletedProduct = await prisma.product.delete({
    where: {
      id: id,
    },
  });

  return Response.json(deletedProduct);
}
