import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import {
    Search,
    MoveRight,
    User,
    ShoppingCart,
    Map,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
} from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FormEvent, useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import useCart from '@/store/useCart';
import useUser from '@/store/useUser';
import { getAllLabels } from '@/api/book';

export default function ClientLayout() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [searchQuery, setSearchQuery] = useState('');
    const { cartQuantity, fetchCart } = useCart();
    const [labels, setLabels] = useState<string[]>([]);

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
        navigate({ to: '/client/cart' }).then();
    };

    const goToAccount = () => {
        navigate({ to: '/auth/login' }).then();
    };

    const fetchLabels = async () => {
        try {
            const response = await getAllLabels();
            if (response && response.data) {
                if (response.data.data && Array.isArray(response.data.data)) {
                    setLabels(response.data.data);
                } else {
                    console.error('Data.data is not an array:', response.data);
                    setLabels([]);
                }
            } else {
                console.error(
                    'Failed to fetch labels: Invalid response structure'
                );
                setLabels([]);
            }
        } catch (error) {
            console.error('Error fetching labels:', error);
            setLabels([]);
        }
    };

    useEffect(() => {
        fetchLabels().then();
    }, []);

    return (
        <div className="mx-auto">
            <header className="">
                <div className="flex h-30 items-center justify-between py-4 px-4 max-w-[1500px] mx-auto">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/logo.png"
                            width="200"
                            height="34"
                            alt="logo"
                        />
                    </Link>
                    <div className="w-3xl">
                        <div className="hidden md:flex md:w-[400px] lg:w-[500px]">
                            <form
                                onSubmit={handleSearch}
                                className="relative w-full"
                            >
                                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Tìm kiếm thông tin sách..."
                                    className="w-full pl-12 rounded-full bg-neutral-500/10 text-sm text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-12"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </form>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            aria-label="Cart"
                            className="flex items-center gap-x-2 w-fit"
                            onClick={goToAccount}
                        >
                            <User className="size-8 text-green-500" />
                            <div className="flex flex-col items-start">
                                <div className="text-sm font-medium text-gray-700">
                                    Tài khoản
                                </div>
                                <div className="uppercase">
                                    {user?.username || 'Anonymous'}
                                </div>
                            </div>
                        </Button>

                        <div
                            className="flex items-center gap-2 "
                            onClick={goToCart}
                        >
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Account"
                                >
                                    <ShoppingCart className="size-8 text-green-500" />
                                </Button>
                                <Badge className="absolute -right-1 text-[12px] w-4 h-4 bg-green-500">
                                    {cartQuantity > 0 ? cartQuantity : '0'}
                                </Badge>
                            </div>
                            <div className="text-xl font-medium text-gray-700 cursor-pointer">
                                Giỏ hàng
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shadow-t-xl shadow-b-xl shadow-[0_-8px_8px_-8px_rgba(0,0,0,0.1),0_8px_8px_-8px_rgba(0,0,0,0.1)] pt-3">
                    <nav className=" hidden py-2 h-15 md:flex flex-col justify-center items-center max-w-[1500px] mx-auto">
                        <ul className="flex gap-12 w-full pl-4 h-full justify-start text-xl mt-1 uppercase">
                            <li>
                                <Link to="/client/home">Trang chủ</Link>
                            </li>
                            <li>
                                <Link to="/client/about">Giới thiệu</Link>
                            </li>
                            <li>
                                <Link to="/client/contact">Liên hệ</Link>
                            </li>
                            {labels &&
                                labels.map((label) => (
                                    <li key={label}>
                                        <Link
                                            to={`/client/search?q="${label}"`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
            <div className="bg-gray-100 ">
                <div className="bg-gray-100 flex items-center justify-between h-50 w-full max-w-[1500px] mx-auto px-4">
                    <div className="flex items-center gap-x-8">
                        <Link
                            to="/"
                            className=" w-40 h-40 rounded-lg bg-white flex items-center justify-center p-2"
                        >
                            <img
                                src="/logo.png"
                                width="200"
                                height="34"
                                alt="logo"
                            />
                        </Link>

                        <div className="w-[1px] h-30 bg-gray-300"></div>
                        <div className="flex flex-col items-start gap-y-2">
                            <div className="text-2xl uppercase font-medium">
                                Đăng ký nhận tin
                            </div>
                            <div className="text-base text-gray-500 font-semibold">
                                Nhận thông tin mới nhất từ chúng tôi
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-x-4">
                        <form
                            onSubmit={handleSearch}
                            className="relative w-full"
                        >
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Nhập email của bạn..."
                                className="w-80 pl-12 rounded-full bg-neutral-500/10 text-sm text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-16"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                        <Button
                            variant="default"
                            className="rounded-full bg-green-700 text-white font-semibold px-6 py-2 h-16 w-30"
                            onClick={handleSearch}
                        >
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className="border-t bg-gray-100 px-4 overflow-x-hidden">
                <div className="py-10 max-w-[1500px] mx-auto">
                    <div className="flex items-start gap-x-12 justify-between flex-wrap">
                        <div className="w-70">
                            <h3 className="mb-4 text-lg font-medium">
                                VỀ CHÚNG TÔI
                            </h3>
                            <div>
                                VInaBook là thương hiệu được thành lập vào năm
                                2025 với tiêu chí đặt chất lượng sản phẩm lên
                                hàng đầu
                            </div>
                            <div className="flex items-center gap-x-2 mt-2">
                                <div className="rounded-full border-[0.5px] border-gray-500 w-12 h-12 flex items-center justify-center">
                                    <Facebook className="size-5" />
                                </div>
                                <div className="rounded-full border-[0.5px] border-gray-500 w-12 h-12 flex items-center justify-center">
                                    <Twitter className="size-5" />
                                </div>
                                <div className="rounded-full border-[0.5px] border-gray-500 w-12 h-12 flex items-center justify-center">
                                    <Instagram className="size-5" />
                                </div>
                                <div className="rounded-full border-[0.5px] border-gray-500 w-12 h-12 flex items-center justify-center">
                                    <Youtube className="size-5" />
                                </div>
                            </div>
                        </div>
                        <div className="w-80">
                            <h3 className="mb-4 text-lg font-medium">
                                LIÊN KẾT
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-primary flex items-center"
                                    >
                                        <MoveRight className="inline mr-2 font-light size-3" />
                                        Về chúng tôi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:text-primary">
                                        <MoveRight className="inline mr-2 font-light size-3" />
                                        Các sản phẩm
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:text-primary">
                                        <MoveRight className="inline mr-2 font-light size-3" />
                                        Tin tức
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:text-primary">
                                        <MoveRight className="inline mr-2 font-light size-3" />
                                        Liên hệ
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:text-primary">
                                        <MoveRight className="inline mr-2 font-light size-3" />
                                        Điều khoản
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="w-80">
                            <h3 className="mb-4 text-lg font-medium">
                                CÁC SẢN PHẨM
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-primary flex items-center"
                                    >
                                        <MoveRight className="inline mr-2 font-light size-3" />
                                        Sách giáo khoa
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:text-primary">
                                        <MoveRight className="inline mr-2 font-light size-3" />
                                        Sách tham khảo
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:text-primary">
                                        <MoveRight className="inline mr-2 font-light size-3" />
                                        Sách văn học
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:text-primary">
                                        <MoveRight className="inline mr-2 font-light size-3" />
                                        Sách thiếu nhi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:text-primary">
                                        <MoveRight className="inline mr-2 font-light size-3" />
                                        Sách ngoại ngữ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg font-bold">LIÊN HỆ</h3>
                            <div className="flex items-center gap-x-2">
                                <div className="rounded-full bg-green-700 text-white w-12 h-12 flex items-center justify-center">
                                    <Map className="size-5" />
                                </div>
                                <div className="text-base">
                                    123 Đường ABC, Quận 1, TP.HCM
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2 mt-2">
                                <div className="rounded-full bg-green-700 text-white w-12 h-12 flex items-center justify-center">
                                    <Phone className="size-5" />
                                </div>

                                <div className="text-base">
                                    <p>0123 456 789</p>
                                    <p> 0344 567 890</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2 mt-2">
                                <div className="rounded-full bg-green-700 text-white w-12 h-12 flex items-center justify-center">
                                    <Mail className="size-5" />
                                </div>

                                <div className="text-base">
                                    <p>abc@gail.com</p>
                                    <p>inforabc@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t bg-gray-100 py-4 text-center text-sm mt-2">
                    <p>© 2025 VinaBook. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
