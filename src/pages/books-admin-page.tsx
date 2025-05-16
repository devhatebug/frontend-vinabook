import React, { useEffect } from 'react';
import { useState } from 'react';
import { Edit, MoreHorizontal, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { api, IError } from '@/api/api.ts';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { PropagateLoader } from 'react-spinners';

interface Book {
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    type: 'new' | 'sale';
    label: string;
}

export default function BooksAdminPage() {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [file, setFile] = useState<File>();
    const [currentBook, setCurrentBook] = useState<Book>({
        id: '',
        name: '',
        price: '',
        image: '',
        description: '',
        type: 'new',
        label: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const indexOfLastItem = currentPage * limit;
    const indexOfFirstItem = indexOfLastItem - limit;

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await api.get('/book/pagination', {
                    params: { page: currentPage, limit },
                });
                setBooks(response.data.rows);
                setTotalPages(Math.ceil(response.data.count / limit));
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    const dataError = error.response.data as IError;
                    if (dataError && dataError.message) {
                        toast.error(dataError.message);
                        console.log(dataError.message);
                    }
                } else {
                    toast.error('Có lỗi xảy ra khi lấy danh sách sách');
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [currentPage]);

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', currentBook.name);
        formData.append('price', currentBook.price);
        formData.append('description', currentBook.description);
        formData.append('label', currentBook.label);

        if (file) {
            formData.append('image', file);
        }
        setIsAddDialogOpen(false);
        try {
            const response = await api.post('/book', formData);
            setBooks((prev) =>
                prev ? [...prev, response.data.data] : [response.data.data]
            );
            toast.success('Thêm sách thành công');
            setCurrentBook({
                id: '',
                name: '',
                price: '',
                image: '',
                description: '',
                type: 'new',
                label: '',
            });
            setFile(undefined);
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const dataError = error.response.data as IError;
                if (dataError && dataError.message) {
                    toast.error(dataError.message);
                    console.log(dataError.message);
                }
            } else {
                toast.error('Có lỗi xảy ra khi thêm sách');
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEditBook = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', currentBook.name);
        formData.append('price', currentBook.price);
        formData.append('description', currentBook.description);
        formData.append('type', currentBook.type);
        formData.append('label', currentBook.label);

        if (file) {
            formData.append('image', file);
        }

        setIsEditDialogOpen(false);
        try {
            await api.put(`/book/${currentBook.id}`, formData);
            toast.success('Cập nhật sách thành công');
            const updatedBooks = books.map((book) =>
                book.id === currentBook.id ? currentBook : book
            );
            setBooks(updatedBooks);
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const dataError = error.response.data as IError;
                if (dataError && dataError.message) {
                    toast.error(dataError.message);
                    console.log(dataError.message);
                }
            } else {
                toast.error('Có lỗi xảy ra khi cập nhật sách');
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBook = async () => {
        try {
            await api.delete(`/book/${currentBook.id}`);
            toast.success('Xóa sách thành công');
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const dataError = error.response.data as IError;
                if (dataError && dataError.message) {
                    toast.error(dataError.message);
                    console.log(dataError.message);
                }
            } else {
                toast.error('Có lỗi xảy ra khi xóa sách');
                console.error(error);
            }
        }
        const updatedBooks = books.filter((book) => book.id !== currentBook.id);
        setBooks(updatedBooks);
        setIsDeleteDialogOpen(false);
    };

    const openEditDialog = (book: typeof currentBook) => {
        setCurrentBook(book);
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (book: typeof currentBook) => {
        setCurrentBook(book);
        setIsDeleteDialogOpen(true);
    };

    return (
        <div className="flex flex-col gap-y-4 items-start">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold">Quản lý sách</h1>
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="bg-blue-500 text-white font-bold flex justify-center hover:bg-blue-600">
                            <Plus className="h-4 w-4" />
                            Thêm sách
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Thêm sách mới</DialogTitle>
                            <DialogDescription>
                                Điền thông tin sách mới vào form dưới đây
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddBook}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Tên sách</Label>
                                    <Input
                                        id="name"
                                        value={currentBook.name}
                                        onChange={(e) =>
                                            setCurrentBook({
                                                ...currentBook,
                                                name: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="label">Nhãn</Label>
                                    <Select
                                        value={currentBook.label}
                                        onValueChange={(value) =>
                                            setCurrentBook({
                                                ...currentBook,
                                                label: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Chọn nhãn" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Sách giáo khoa">
                                                    Sách giáo khoa
                                                </SelectItem>
                                                <SelectItem value="Truyện">
                                                    Truyện
                                                </SelectItem>
                                                <SelectItem value="Tiểu thuyết">
                                                    Tiểu thuyết
                                                </SelectItem>
                                                <SelectItem value="Khoa học">
                                                    Khoa học
                                                </SelectItem>
                                                <SelectItem value="Lịch sử">
                                                    Lịch sử
                                                </SelectItem>
                                                <SelectItem value="Văn học">
                                                    Văn học
                                                </SelectItem>
                                                <SelectItem value="Kinh tế">
                                                    Kinh tế
                                                </SelectItem>
                                                <SelectItem value="Tâm lý">
                                                    Tâm lý
                                                </SelectItem>
                                                <SelectItem value="Tâm linh">
                                                    Tâm linh
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Giá (VNĐ)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={currentBook.price}
                                        onChange={(e) =>
                                            setCurrentBook({
                                                ...currentBook,
                                                price: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="image">Hình ảnh</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        className="w-full"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setFile(file);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Mô tả</Label>
                                    <Textarea
                                        id="description"
                                        value={currentBook.description}
                                        onChange={(e) =>
                                            setCurrentBook({
                                                ...currentBook,
                                                description: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    className="bg-blue-500 text-white font-bold flex justify-center hover:bg-blue-600"
                                    type="submit"
                                >
                                    Lưu
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border w-full">
                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <PropagateLoader
                            loading={loading}
                            size={32}
                            color="#FF6D67"
                        />
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">STT</TableHead>
                                <TableHead className="w-[80px]">
                                    Hình ảnh
                                </TableHead>
                                <TableHead>Tên sách</TableHead>
                                <TableHead>Nhãn</TableHead>
                                <TableHead>Giá (VNĐ)</TableHead>
                                <TableHead>Loại</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Mô tả
                                </TableHead>
                                <TableHead className="w-[100px]">
                                    Thao tác
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {books.map((book, index) => (
                                <TableRow key={book.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <img
                                            src={
                                                book.image || '/placeholder.svg'
                                            }
                                            alt={book.name}
                                            width={40}
                                            height={50}
                                            className="rounded-sm object-cover"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {book.name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            {book.label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {Number.parseInt(
                                            book.price
                                        ).toLocaleString('vi-VN')}
                                        ₫
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                                                book.type === 'new'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-blue-500 text-white'
                                            }`}
                                        >
                                            {book.type === 'new'
                                                ? 'Mới'
                                                : 'Bán chạy'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden max-w-[300px] truncate md:table-cell">
                                        {book.description}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Menu
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    Thao tác
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />

                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        openEditDialog(book)
                                                    }
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Sửa
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        openDeleteDialog(book)
                                                    }
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Xóa
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4 w-full">
                <div className="text-sm text-muted-foreground">
                    Showing {indexOfFirstItem + 1}-
                    {Math.min(indexOfLastItem, books?.length || 0)} of{' '}
                    {books?.length || 0} items
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa sách</DialogTitle>
                        <DialogDescription>
                            Chỉnh sửa thông tin sách ID: {currentBook.id}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditBook}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Tên sách</Label>
                                <Input
                                    id="edit-name"
                                    value={currentBook.name}
                                    onChange={(e) =>
                                        setCurrentBook({
                                            ...currentBook,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-label">Nhãn</Label>
                                <Select
                                    value={currentBook.label}
                                    onValueChange={(value) =>
                                        setCurrentBook({
                                            ...currentBook,
                                            label: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn nhãn" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Sách giáo khoa">
                                                Sách giáo khoa
                                            </SelectItem>
                                            <SelectItem value="Truyện">
                                                Truyện
                                            </SelectItem>
                                            <SelectItem value="Tiểu thuyết">
                                                Tiểu thuyết
                                            </SelectItem>
                                            <SelectItem value="Khoa học">
                                                Khoa học
                                            </SelectItem>
                                            <SelectItem value="Lịch sử">
                                                Lịch sử
                                            </SelectItem>
                                            <SelectItem value="Văn học">
                                                Văn học
                                            </SelectItem>
                                            <SelectItem value="Kinh tế">
                                                Kinh tế
                                            </SelectItem>
                                            <SelectItem value="Tâm lý">
                                                Tâm lý
                                            </SelectItem>
                                            <SelectItem value="Tâm linh">
                                                Tâm linh
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-price">Giá (VNĐ)</Label>
                                <Input
                                    id="edit-price"
                                    type="number"
                                    value={currentBook.price}
                                    onChange={(e) =>
                                        setCurrentBook({
                                            ...currentBook,
                                            price: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-image">Hình ảnh</Label>
                                <Input
                                    id="edit-image"
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setFile(file);
                                        }
                                    }}
                                />
                            </div>
                            <div className="w-full gap-y-2 flex flex-col">
                                <Label htmlFor="edit-status">Trạng thái</Label>
                                <select
                                    id="edit-status"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={currentBook.type}
                                    onChange={(e) =>
                                        setCurrentBook({
                                            ...currentBook,
                                            type: e.target.value as
                                                | 'new'
                                                | 'sale',
                                        })
                                    }
                                >
                                    <option value="new">Mới</option>
                                    <option value="sale">Bán chạy</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-description">Mô tả</Label>
                                <Textarea
                                    id="edit-description"
                                    value={currentBook.description}
                                    onChange={(e) =>
                                        setCurrentBook({
                                            ...currentBook,
                                            description: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                className="bg-blue-500 text-white font-bold flex justify-center hover:bg-blue-600"
                                type="submit"
                            >
                                Lưu thay đổi
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa sách</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa sách &quot;
                            {currentBook.name}&quot;? Hành động này không thể
                            hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-500 text-white font-bold flex justify-center hover:bg-red-600"
                            onClick={handleDeleteBook}
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
