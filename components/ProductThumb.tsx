import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types"
import Link from "next/link";
import Image from "next/image";
import AddToBasketButton from "./AddToBasketButton";

function ProductThumb({ product }: { product: Product }) {
    const isOutofStock = product.stock != null && product.stock <= 0;

  return (
    <div className=" bg-white rounded-lg border border-gray-200
        shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden w-full">
   <Link
     href={`/product/${product.slug?.current}`}
     className={`group flex flex-col 
        ${isOutofStock ? "opacity-50" : ""}
        `}
   >

    <div className="relative aspect-square w-full h-full overflow-hidden">
        {product.image && (
            <Image 
              className="object-contain transition-transform 
              duration-300 group-hover:scale-105"
              src={imageUrl(product.image).url()}
              alt={product.name || "Product image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        )}

        {isOutofStock && (
            <div className="absolute inset-0 flex items-center justify-center
            bg-black bg-opacity-50">
                <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
        )}
    </div>

    <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
        </h2>

        <p className="mt-2 text-sm text-gray-600 line-clamp-1">
          {product.description?.map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : ""
           )
           .join(" ") || "No description available"
        }
        </p>

        <p className="mt-2 text-lg font-bold text-gray-900">
          ₦{product.price?.toFixed(2)}
        </p>

    </div>
   </Link>
        <div className="px-4 pb-4">
          <AddToBasketButton product={product} disabled={isOutofStock}/>
        </div>
   </div>
  );
}

export default ProductThumb

