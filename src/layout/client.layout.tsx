import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Search, Inbox, Phone, User, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { FormEvent, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge.tsx";
import useCart from "@/store/useCart";

export default function ClientLayout() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { cartQuantity, fetchCart } = useCart();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: `/client/search`,
        search: { q: encodeURIComponent(searchQuery) },
      }).then();
    }
  };
  useEffect(() => {
    fetchCart().then();
  }, [fetchCart]);

  const goToCart = () => {
    navigate({ to: "/client/cart" }).then();
  };

  const goToAccount = () => {
    navigate({ to: "/auth/login" }).then();
  };

  return (
    <div className="mx-auto">
      <div className={"mx-auto text-center text-xs p-2"}>
        Hotline Mua Hàng: 0973 285 886 | Hotline CSKH: 1900 886 803 - Ext 1 |
        Email CSKH: vinabook@gmail.com
      </div>
      <Separator />
      <header>
        <div className="flex h-16 items-center justify-between py-4 px-4">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" width="200" height="34" alt="logo" />
          </Link>
          <div className="w-3xl">
            <div className="hidden md:flex md:w-[400px] lg:w-[500px]">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm thông tin sách..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Account"
                onClick={goToCart}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Badge
                className="absolute -right-1 text-[12px] w-4 h-4"
                variant="destructive"
              >
                {cartQuantity > 0 ? cartQuantity : "0"}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              onClick={goToAccount}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Separator />
        <nav className=" hidden border-t py-2 md:block bg-green-600 text-white font-bold">
          <ul className="flex gap-6 w-xl mx-auto justify-center font-bold">
            <li>
              <Link to="/client/home" className="text-sm">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/client/about" className="text-sm">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to="/client/contact" className="text-sm">
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <div className="bg-gray-100 flex items-center justify-evenly h-16">
        <div className="bg-gray-100 flex items-center justify-evenly h-16 mx-auto gap-x-12">
          <div className="flex items-center gap-x-4">
            <Inbox className="h-5 w-5" />
            <p className="text-sm">Đăng ký nhận tin</p>
          </div>
          <div>
            <Input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-100 h-[40px]"
            />
          </div>
          <div className="flex items-center gap-x-4">
            <Phone className="h-5 w-5" />
            <p className="text-sm">Hỗ trợ / Mua hàng: 0123456789</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="border-t bg-gray-50 px-4">
        <div className="py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">HỆ THỐNG CỬA HÀNG</h3>
              <ul className="space-y-2 text-sm">
                <li>27 Chùa Bộc, Đống Đa, Hà Nội</li>
                <li>332 Tô Hiệu, Đống Đa, Hà Nội</li>
                <li>43 Cầu Giấy, Hà Nội, Hà Nội</li>
                <li>26 Đường Láng, Đống Đa, Hà Nội</li>
                <li>249 Xã Đàn, Đống Đa, Hà Nội</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">
                CHÍNH SÁCH & QUY ĐỊNH CHUNG
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-primary">
                    Hướng Dẫn Mua Hàng
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary">
                    Hình Thức Thanh Toán
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary">
                    Quy Định Về Việc Xác Nhận Đơn Hàng
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary">
                    Chính Sách Đổi Trả
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary">
                    Chính Sách Bảo Mật
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">ĐỊA CHỈ</h3>
              <p className="mb-2 text-sm">CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ</p>
              <p className="mb-2 text-sm">
                Ngõn 36/X, 61 Phương Liệt, Thanh Xuân, Phương Liệt, Thanh Xuân,
                Hà Nội
              </p>
              <p className="mb-2 text-sm">Facebook: vinabook</p>
              <p className="mb-2 text-sm">Email: vinabook@gmail.com</p>
              <p className="mb-2 text-sm">Hotline: 0123456789 - 0987654321</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">FANPAGE</h3>
              <div className="h-40 w-[300px] rounded-lg">
                <Link to={"/"}>
                  <img
                    src="/page-banner.png"
                    alt="Fanpage"
                    className="object-cover w-[300px] h-[160px]"
                  />
                </Link>
                <div className="flex items-center justify-between gap-x-8">
                  <img src="/logo.png" alt="Facebook" className="w-1/3" />
                  <p className="text-wrap text-sm right-0">
                    nhà sách vinabook 540.341 lượt thích
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t bg-gray-100 py-4 text-center text-sm mt-2">
          <p>© 2023 BookStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
