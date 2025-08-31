import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  authorUsername: string;
  authorImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
}

const ProductCard = ({
  authorUsername,
  id,
  name,
  price,
  reviewCount,
  reviewRating,
  authorImageUrl,
  imageUrl,
}: ProductCardProps) => {
  return (
    <Link href={`/products/${id}`} className="h-full">
      <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            alt={name}
            src={imageUrl || "/placeholder.png"}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-1 gap-3 border-y">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          {/* TODO: redirect to usershop */}
          <div className="flex items-center gap-2" onClick={() => {}}>
            {authorImageUrl && (
              <Image
                alt={authorUsername}
                src={authorImageUrl}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm underline font-medium">{authorUsername}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-black" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="px-2 py-1 border bg-pink-400 w-fit">
            <p className="text-sm font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              }).format(Number(price))}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse" />
  );
};

export default ProductCard;
