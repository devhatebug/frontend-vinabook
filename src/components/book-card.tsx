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

interface BookCardProps {
  title: string;
  image: string;
  price: number;
  description: string;
}

export default function BookCard({ title, image, price }: BookCardProps) {
  return (
    <div className="p-4">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-col items-start gap-y-2">
            <div className="overflow-hidden w-[200px]">
              <img
                src={image || "/placeholder.svg"}
                alt={title}
                width={400}
                height={400}
                className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-y-1 items-start">
              <h3 className="line-clamp-2s text-sm font-medium group-hover:text-primary">
                {title}
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
              <ProductDetailCard />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                  ĐẶT HÀNG NGAY
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Điền thông tin</DialogTitle>
                  <DialogDescription>
                    <InfoBuyForm />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
