import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSalesByCouponCode";
import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
async function BlackFridayBanner() {
    const sale =await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

    if (!sale?.data?.isActive) {
        return null; // or return a fallback component
    }

    return (
    <Carousel>
        <CarouselContent>
            <CarouselItem>
                <Card>
                    <CardContent>
    <div className="bg-gradient-to-r from-red-600 to-black text-white
     px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
         <div className="flex-1">
           <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
            {sale.data.title}
           </h2>
           <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
            {sale.data.description}
           </p>

           <div className="flex">
            <div className="bg-white text-black py-4 px-6 rounded-full
            shadow-md transform hover:scale-105 transition-transform duration-300">
                <span className="font-bold text-base sm:text-xl">
                    Use code:{" "}
                    <span className="text-red-600">{sale.data.couponCode}</span>
                </span>
                <span className="ml-2 font-bold text-base sm:text-xl">
                    for {sale.data.discountAmount}% off
                </span>
           </div>
         </div>
        </div>
      </div>    
    </div>
                    </CardContent>
                </Card>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
);
}

export default BlackFridayBanner;