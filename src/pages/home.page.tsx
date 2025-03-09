import BookCard from "@/components/book-card";
import NewsCard from "@/components/news-card";
import { useState, useEffect } from "react";
import { api } from "@/api/api.ts";
import { PropagateLoader } from "react-spinners";

interface Book {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
}

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [bookNews, setBookNews] = useState<Book[]>([]);
  const [bookBestSellers, setBookBestSellers] = useState<Book[]>([]);
  const midIndex = Math.ceil(bookBestSellers.length / 2);

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async (): Promise<Book[]> => {
      const response = await api.get("/book");
      const books = response.data || [];
      setBookNews(books.filter((book: Book) => book.type === "new"));
      setBookBestSellers(books.filter((book: Book) => book.type === "sale"));
      return books;
    };
    fetchBooks().then(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <PropagateLoader loading={loading} size={32} color="#FF6D67" />
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

            {/* New Books Section */}
            <section className="py-10 mx-auto max-w-6xl">
              <h2 className="mb-6 text-center text-2xl font-bold">SÁCH MỚI</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 mx-auto">
                {bookNews.map((book, index) => (
                  <BookCard
                    key={index}
                    name={book.name}
                    image={book.image}
                    price={book.price}
                    description={book.description}
                    id={book.id}
                  />
                ))}
              </div>
            </section>

            {/* Best Sellers Section */}
            <section className="py-10 mx-auto max-w-6xl">
              <h2 className="mb-6 text-center text-2xl font-bold">
                BÁN CHẠY NHẤT
              </h2>
              <div className="grid grid-cols-4 gap-x-4">
                {bookBestSellers.slice(0, midIndex).map((book, index) => (
                  <BookCard
                    key={index}
                    name={book.name}
                    image={book.image}
                    price={book.price}
                    description={book.description}
                    id={book.id}
                  />
                ))}
              </div>
            </section>

            {/* Self-help Books Banner */}
            <section className="py-6 mx-auto max-w-7xl">
              <img
                src="/banner-center.png"
                alt="Self-help Books Banner"
                className="object-cover w-full"
              />
            </section>

            {/* Self-help Books Section */}
            <section className="py-6 mx-auto max-w-6xl">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                {bookBestSellers.slice(midIndex).map((book, index) => (
                  <BookCard
                    key={index}
                    name={book.name}
                    image={book.image}
                    price={book.price}
                    description={book.description}
                    id={book.id}
                  />
                ))}
              </div>
            </section>

            {/* News Section */}
            <section className="py-10 mx-auto max-w-6xl">
              <h2 className="mb-6 text-center text-2xl font-bold">TIN TỨC</h2>
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
