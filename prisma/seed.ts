import "dotenv/config";
import { prisma } from "@/lib/prisma";
import products from "../data/products.json";

async function main() {
  console.log("Seed started...");
  console.log("Products : ", products.length);
  //await prisma.product.deleteMany(); // this line of code delete all data from database
  //console.log("Old products deleted.");
  const result = await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });
  console.log(`Inserted ${result.count} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// npx tsx prisma/seed.ts // run this command to add data in database
