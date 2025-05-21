import BookCard from '@/components/book-card';
import NewsCard from '@/components/news-card';
import { useState, useEffect } from 'react';
import { api } from '@/api/api.ts';
import { PropagateLoader } from 'react-spinners';
import { Truck, ShieldCheck, Headset, CircleDollarSign } from 'lucide-react';
interface Book {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    type: string;
    quantity?: number;
}

export default function HomePage() {
    const [loading, setLoading] = useState(false);
    const [bookNews, setBookNews] = useState<Book[]>([]);

    const cardItems = [
        {
            icon: Truck,
            label: 'Giao hàng nhanh',
            desc: 'Cho tất cả đơn hàng',
        },
        {
            icon: ShieldCheck,
            label: 'Sản phẩm an toàn',
            desc: 'Cam kết chất lượng',
        },
        {
            icon: Headset,
            label: 'Hỗ trợ 24/7',
            desc: 'Tất cả ngày trong tuần',
        },
        {
            icon: CircleDollarSign,
            label: 'Hoàn tiền',
            desc: 'Hoàn tiền nếu không hài lòng',
        },
    ];

    useEffect(() => {
        setLoading(true);
        const fetchBooks = async (): Promise<Book[]> => {
            const response = await api.get('/book/get-all');
            const books = response.data.data || [];
            setBookNews(books);
            return books;
        };
        fetchBooks().then(() => setLoading(false));
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-32">
                    <PropagateLoader
                        loading={loading}
                        size={32}
                        color="#FF6D67"
                    />
                </div>
            ) : (
                <div className="flex min-h-screen flex-col">
                    <main className="flex-1">
                        {/* Hero Banner */}
                        <section>
                            <img
                                src="/banner-hero.png"
                                alt="Hero Banner"
                                className="object-cover w-full"
                            />
                        </section>

                        {/* Card description */}
                        <div className="grid grid-cols-4 mx-auto w-fit mt-10">
                            {cardItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center shadow-lg px-6 py-3 rounded-lg w-fit cursor-pointer"
                                >
                                    <div className="flex justify-start items-center gap-x-3">
                                        <item.icon className="size-12 text-green-600" />
                                        <div className="flex flex-col items-start">
                                            <h3 className="text-lg font-bold">
                                                {item.label}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Books Section */}
                        <section className="py-10 mx-auto max-w-6xl">
                            <h2 className=" text-center text-2xl w-2xl mx-auto font-medium uppercase">
                                Khám phá sản phẩm của chúng tôi
                            </h2>
                            <div className="w-xs h-[2px] bg-green-600 mx-auto mb-6"></div>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 mx-auto">
                                {bookNews.map((book, index) => (
                                    <BookCard
                                        key={index}
                                        name={book.name}
                                        image={book.image}
                                        price={book.price}
                                        description={book.description}
                                        id={book.id}
                                        quantity={book.quantity ?? 0}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* News Section */}
                        <section className="py-10 mx-auto max-w-6xl">
                            <h2 className="mb-6 text-center text-2xl font-bold">
                                TIN TỨC
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <NewsCard
                                    title='THỬ THÁCH: MÙA "YÊU" - 100% NHẬN QUÀ'
                                    image="/news1.png"
                                    date="15/02/2023"
                                    excerpt="Lời chúc tình yêu là một món quà ngọt ngào và ấm áp ngày Valentine, thể hiện cỏi lòng của bạn cho..."
                                />
                                <NewsCard
                                    title="ĐÓN XUÂN SANG - LÌ XÌ TẾT | UP TO 50%"
                                    image="/news2.png"
                                    date="15/02/2023"
                                    excerpt="ĐÓN XUÂN SANG - LÌ XÌ TẾT | UP TO 50% toàn bộ Quý Mão, Sinh Viên đã cần gì nữa khi..."
                                />
                                <NewsCard
                                    title="Không khí lạnh hoa mai, mùa nắng, vé đêm nhạc hội"
                                    image="/news3.png"
                                    date="10/02/2023"
                                    excerpt="Trong dịp nghỉ Tết Dương lịch 2023, thời tiết Hà Nội đẹp, cùng hơi hơi se và có mưa..."
                                />
                            </div>
                        </section>
                    </main>
                </div>
            )}
        </>
    );
}
