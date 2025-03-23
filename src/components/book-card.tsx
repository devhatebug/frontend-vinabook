import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductDetailCard from "@/components/product-detail-card.tsx";
import { Button } from "@/components/ui/button.tsx";
import InfoBuyForm from "@/components/info-buy-form.tsx";
import { ShoppingCart } from "lucide-react";
import useCart from "@/store/useCart";
import { addToCart } from "@/api/cart";

interface BookCardProps {
  name: string;
  image: string;
  price: number;
  description: string;
  id: string;
}

export default function BookCard({
  name,
  image,
  price,
  description,
  id,
}: BookCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="p-4">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-col items-start gap-y-2">
            <div className="overflow-hidden w-[200px]">
              <img
                src={image || "/placeholder.svg"}
                alt={name}
                width={400}
                height={400}
                className="h-[300px] w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-y-1 items-start">
              <h3 className="line-clamp-2s text-sm font-medium group-hover:text-primary">
                {name}
              </h3>
              <p className="font-semibold text-red-600 mt-1">
                {Number(price).toLocaleString("vi-VN")} vnd
              </p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông tin chi tiết</DialogTitle>
            <DialogDescription>
              <ProductDetailCard
                name={name}
                description={description}
                image={image}
                price={price}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex flex-wrap items-center gap-x-2 ">
              <Button
                className=" bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => addToCart(id)}
              >
                <ShoppingCart className="h-4 w-4" />
                THÊM VÀO GIỎ HÀNG
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-500 text-white hover:bg-green-600">
                    ĐẶT HÀNG NGAY
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Điền thông tin</DialogTitle>
                    <DialogDescription>
                      <InfoBuyForm idBook={id} />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
