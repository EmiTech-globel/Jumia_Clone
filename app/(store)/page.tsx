
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getSale } from "@/sanity/lib/sales/getSale";
import ProductsView from "@/components/ProductsView";
import BlackFridayBanner from "@/components/BlackFridayBanner";

export const dynamic = "force-static"
export const revalidate = 3600; //revaildate at most every 1hr

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const sales = await getSale();

  console.log(
    crypto.randomUUID().slice(0,5) +
       `>>> Rerendered the home page cache with ${products.length} products 
       and ${categories.length} categories`
  );

  return (
    <div>
      <BlackFridayBanner sales={sales} />
      
      <div className="flex flex-col items-center justify-top min-h-screen 
      bg-gray-10 p-5">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}


