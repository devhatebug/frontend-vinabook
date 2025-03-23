import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCart from "@/store/useCart";

export function CartPage() {
  const navigate = useNavigate();
  const { cart, deleteCart, updateCart } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  const increaseQuantity = (id: string) => {
    const currentQuantity = cart.find((item) => item.id === id)?.quantity || 0;
    updateCart(id, currentQuantity + 1);
  };

  const decreaseQuantity = (id: string) => {
    const currentQuantity = cart.find((item) => item.id === id)?.quantity || 0;
    updateCart(id, currentQuantity - 1);
  };

  const removeItem = (id: string) => {
    deleteCart(id);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const goToCheckout = () => {
    navigate({ to: "/client/billing" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ShoppingBag className="h-6 w-6" />
          Giỏ hàng của bạn
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-500 mb-6">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Link to="/">
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Sản phẩm ({cart.length})
                  </h2>
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id}>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <img
                              src={item.book.image || "/placeholder.svg"}
                              alt={item.book.name}
                              className="w-20 h-30 object-cover border rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-lg">
                              {item.book.name}
                            </h3>
                            <p className="text-primary font-semibold mt-1">
                              {formatCurrency(item.book.price)}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => decreaseQuantity(item.id)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Giảm</span>
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => increaseQuantity(item.id)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Tăng</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Xóa
                            </Button>
                          </div>
                        </div>
                        <Separator className="mt-6" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Tổng cộng</span>
                    <span className="text-primary">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <Button
                    className="w-full bg-blue-500 text-white hover:bg-blue-600"
                    size="lg"
                    onClick={goToCheckout}
                  >
                    Tiến hành thanh toán
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
