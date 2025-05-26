import { useEffect, useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { api } from '@/api/api.ts';
import BookCard from '@/components/book-card.tsx';
import { PropagateLoader } from 'react-spinners';

interface Book {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    type: string;
    label: string;
    quantity?: number;
}

export default function SearchPage() {
    const [loading, setLoading] = useState(false);
    const [booksData, setBooksData] = useState<Book[]>([]);

    useEffect(() => {
        setLoading(true);
        const fetchBooks = async (): Promise<Book[]> => {
            const response = await api.get('/book/get-all');
            const books = response.data.data || [];
            setBooksData(books);
            return books;
        };
        fetchBooks().then(() => setLoading(false));
    }, []);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q')
        ? decodeURIComponent(searchParams.get('q') as string)
        : '';
    const [searchResults, setSearchResults] = useState(booksData);

    useEffect(() => {
        if (query) {
            const filteredBooks = booksData.filter(
                (book) =>
                    book.name.toLowerCase().includes(query.toLowerCase()) ||
                    book.description
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    book.label.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredBooks);
        } else {
            setSearchResults(booksData);
        }
    }, [booksData, query]);

    return (
        <div className="flex min-h-screen flex-col mx-auto w-full justify-center items-center">
            <main className="flex-1 py-6 px-4 w-full">
                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <PropagateLoader
                            loading={loading}
                            size={32}
                            color="#FF6D67"
                        />
                    </div>
                ) : (
                    <div className="max-w-[1500px] mx-auto">
                        {/* Search Results Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold">
                                Kết quả tìm kiếm
                            </h1>
                            {query && (
                                <p className="text-muted-foreground">
                                    Kết quả cho:{' '}
                                    <span className="font-medium">{query}</span>
                                </p>
                            )}
                            <p className="text-sm text-muted-foreground">
                                Tìm thấy {searchResults.length} sách
                            </p>
                        </div>

                        {searchResults.length > 0 ? (
                            <div className="grid grid-cols-4 gap-4 ">
                                {searchResults.map((book, index) => (
                                    <BookCard
                                        key={index}
                                        name={book.name}
                                        image={book.image}
                                        price={book.price}
                                        description={book.description}
                                        id={book.id}
                                        quantity={book.quantity || 0}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                                <p className="text-lg font-medium">
                                    Không tìm thấy sách phù hợp
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Vui lòng thử lại với từ khóa khác
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
