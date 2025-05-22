import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import ProductDetailCard from '@/components/product-detail-card.tsx';
import { Button } from '@/components/ui/button.tsx';
import InfoBuyForm from '@/components/info-buy-form.tsx';
import { ShoppingCart, ShoppingBasket } from 'lucide-react';
import useCart from '@/store/useCart';

interface BookCardProps {
    name: string;
    image: string;
    price: number;
    description: string;
    id: string;
    quantity: number;
}

export default function BookCard({
    name,
    image,
    price,
    description,
    id,
    quantity,
}: BookCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="p-4">
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex flex-col items-center border border-gray-200 rounded-md bg-white shadow-sm h-100 w-88">
                        <div className="overflow-hidden w-full h-60">
                            <img
                                src={image || '/placeholder.svg'}
                                alt={name}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-md"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-between w-full px-4 py-3 h-32">
                            <h3 className="text-base font-medium text-gray-800 text-center line-clamp-2">
                                {name}
                            </h3>
                            <p className="font-medium text-xl text-red-600 mt-1">
                                {Number(price).toLocaleString('vi-VN')} đ
                            </p>
                            <Button
                                className="w-full mt-2 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-md py-2"
                                disabled={quantity === 0}
                            >
                                <ShoppingBasket className="size-6" />
                                ĐẶT HÀNG
                            </Button>
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
                                quantity={quantity}
                            />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <div className="flex flex-wrap items-center gap-x-2 ">
                            <Button
                                className="bg-blue-500 text-white hover:bg-blue-600"
                                disabled={quantity === 0}
                                onClick={() => addToCart(id)}
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                THÊM VÀO GIỎ HÀNG
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="bg-green-500 text-white hover:bg-green-600"
                                        disabled={quantity === 0}
                                    >
                                        ĐẶT HÀNG NGAY
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Điền thông tin
                                        </DialogTitle>
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
