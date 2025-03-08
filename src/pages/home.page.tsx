import BookCard from "@/components/book-card";
import NewsCard from "@/components/news-card";

export default function HomePage() {
  const bookNews = [
    {
      title: "Nina ở thì trần cao nguyên - Tập 2",
      image: "/book-new1.png",
      price: 34200,
      description: "Nina ở thì trần cao nguyên - Tập 2",
    },
    {
      title: "Những ngày tết ta",
      image: "/book-new2.png",
      price: 81000,
      description: "Những ngày tết ta",
    },
    {
      title: "World Trigger - Tập 4",
      image: "/book-new3.png",
      price: 31500,
      description: "World Trigger - Tập 4",
    },
    {
      title: "Những người bạn từ trang sách",
      image: "/book-new4.png",
      price: 85000,
      description: "Những người bạn từ trang sách",
    },
  ];

  const bookBestSellers = [
    {
      title: "Shin - Cậu bé bút chì - Tập 1",
      image: "/book-sale1.png",
      price: 19500,
      description: "Shin - Cậu bé bút chì - Tập 1",
    },
    {
      title: "Naruto - Quyển 20",
      image: "/book-sale2.png",
      price: 21000,
      description: "Naruto - Quyển 20",
    },
    {
      title: "One Piece - Tập 101",
      image: "/book-sale3.png",
      price: 25100,
      description: "One Piece - Tập 101",
    },
    {
      title: "Chú thuật hồi chiến - Tập 1",
      image: "/book-sale4.png",
      price: 30000,
      description: "Chú thuật hồi chiến - Tập 1",
    },
    {
      title: "Thiền định mỗi ngày",
      image: "/book-sale5.png",
      price: 48100,
      description: "Thiền định mỗi ngày",
    },
    {
      title: "Một năm sống tử tế",
      image: "/book-sale6.png",
      price: 168200,
      description: "Một năm sống tử tế",
    },
    {
      title: "Sống cuộc sống với nhân số học",
      image: "/book-sale7.png",
      price: 181000,
      description: "Sống cuộc sống với nhân số học",
    },
    {
      title: "Dám nghĩ lại",
      image: "/book-sale8.png",
      price: 126000,
      description: "Dám nghĩ lại",
    },
  ];

  return (
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
            {bookNews.map((book) => (
              <BookCard
                key={book.title}
                title={book.title}
                image={book.image}
                price={book.price}
                description={book.description}
              />
            ))}
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="py-10 mx-auto max-w-6xl">
          <h2 className="mb-6 text-center text-2xl font-bold">BÁN CHẠY NHẤT</h2>
          <div className="grid grid-cols-4 gap-x-4">
            {bookBestSellers.slice(0, 4).map((book) => (
              <BookCard
                key={book.title}
                title={book.title}
                image={book.image}
                price={book.price}
                description={book.description}
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
            {bookBestSellers.slice(4, 8).map((book) => (
              <BookCard
                key={book.title}
                title={book.title}
                image={book.image}
                price={book.price}
                description={book.description}
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
  );
}
