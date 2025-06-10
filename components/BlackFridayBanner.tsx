import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSalesByCouponCode";
import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

async function BlackFridayBanner() {
    const sales = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

    // If no sales or no active sales, return null
    if (!sales?.data || !Array.isArray(sales.data) || sales.data.length === 0) {
        return null;
    }

    return (
        <Carousel>
            <CarouselContent>
                {sales.data.map((sale) => (
                    <CarouselItem key={sale._id || sale.couponCode}>
                        <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
                            <div className="container mx-auto flex items-center justify-between">
                                <div className="flex-1">
                                    <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
                                        {sale.title}
                                    </h2>
                                    <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
                                        {sale.description}
                                    </p>
                                    <div className="flex">
                                        <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition-transform duration-300">
                                            <span className="font-bold text-base sm:text-xl">
                                                Use code:{" "}
                                                <span className="text-red-600">{sale.couponCode}</span>
                                            </span>
                                            <span className="ml-2 font-bold text-base sm:text-xl">
                                                for {sale.discountAmount}% off
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2" />
            <CarouselNext className="absolute right-2" />
        </Carousel>
    );
}

export default BlackFridayBanner;
