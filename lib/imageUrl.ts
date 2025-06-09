import { client } from "@/sanity/lib/client";
import imageUrlBulider from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBulider(client);

export function imageUrl(source: SanityImageSource) {
    return builder.image(source);
}