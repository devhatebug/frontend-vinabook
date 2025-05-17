import { BookOpen, Home, Package, Settings, User, Tag } from 'lucide-react';
import { Link, Outlet, useLocation } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function AdminLayout() {
    const location = useLocation();
    const [active, setActive] = useState('books');

    useEffect(() => {
        if (location.pathname.includes('admin/books')) {
            setActive('books');
        } else if (location.pathname.includes('admin/orders')) {
            setActive('orders');
        } else if (location.pathname.includes('admin/users')) {
            setActive('users');
        } else if (location.pathname.includes('admin/labels')) {
            setActive('labels');
        } else {
            setActive('home');
        }
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen flex-col w-screen">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
                <Link
                    to="/admin"
                    className="flex items-center gap-2 font-semibold"
                >
                    <BookOpen className="h-6 w-6" />
                    <span>VinaBook Admin</span>
                </Link>
                <nav className="ml-auto flex items-center gap-4">
                    <Link to="/client/home">
                        <Button variant="ghost" size="icon">
                            <Home className="h-5 w-5" />
                            <span className="sr-only">Trang chủ</span>
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Cài đặt</span>
                    </Button>
                </nav>
            </header>
            <div className="flex flex-1">
                <aside className="w-64 border-r bg-muted/40">
                    <nav className="grid gap-2 p-4">
                        <Link to="/admin">
                            <Button
                                variant="ghost"
                                className={cn(
                                    'w-full justify-start gap-2',
                                    active === 'home'
                                        ? 'bg-neutral-200 text-black'
                                        : ''
                                )}
                            >
                                <Home className="h-5 w-5" />
                                Bảng điều khiển
                            </Button>
                        </Link>
                        <Link to="/admin/books">
                            <Button
                                variant="ghost"
                                className={cn(
                                    'w-full justify-start gap-2',
                                    active === 'books'
                                        ? 'bg-neutral-200 text-black'
                                        : ''
                                )}
                            >
                                <BookOpen className="h-5 w-5" />
                                Quản lý sách
                            </Button>
                        </Link>
                        <Link to="/admin/labels">
                            <Button
                                variant="ghost"
                                className={cn(
                                    'w-full justify-start gap-2',
                                    active === 'labels'
                                        ? 'bg-neutral-200 text-black'
                                        : ''
                                )}
                            >
                                <Tag className="h-5 w-5" />
                                Quản lý nhãn
                            </Button>
                        </Link>
                        <Link to="/admin/orders">
                            <Button
                                variant="ghost"
                                className={cn(
                                    'w-full justify-start gap-2',
                                    active === 'orders'
                                        ? 'bg-neutral-200 text-black'
                                        : ''
                                )}
                            >
                                <Package className="h-5 w-5" />
                                Quản lý đơn hàng
                            </Button>
                        </Link>
                        <Link to="/admin/users">
                            <Button
                                variant="ghost"
                                className={cn(
                                    'w-full justify-start gap-2',
                                    active === 'users'
                                        ? 'bg-neutral-200 text-black'
                                        : ''
                                )}
                            >
                                <User className="h-5 w-5" />
                                Quản lý người dùng
                            </Button>
                        </Link>
                    </nav>
                </aside>
                <main className="flex-1 p-4 mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
