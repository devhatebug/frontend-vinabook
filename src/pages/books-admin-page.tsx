import type React from "react";
import { useState } from "react";
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const booksData = [
  {
    id: "1",
    name: "Shin - Cậu bé bút chì - Tập 1",
    price: "19500",
    image: "/book-new1.png",
    description: "Truyện tranh hài hước dành cho thiếu nhi",
  },
  {
    id: "2",
    name: "Naruto - Quyển 20",
    price: "21000",
    image: "/book-new2.png",
    description: "Truyện tranh về ninja",
  },
  {
    id: "3",
    name: "One Piece - Tập 101",
    price: "25000",
    image: "/book-new3.png",
    description: "Truyện tranh về hải tặc",
  },
  {
    id: "4",
    name: "Chú thuật hồi chiến - Tập 1",
    price: "30000",
    image: "/book-new4.png",
    description: "Truyện tranh về phép thuật",
  },
];

export default function BooksAdminPage() {
  const [books, setBooks] = useState(booksData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = {
      ...currentBook,
      id: (books.length + 1).toString(),
    };
    setBooks([...books, newBook]);
    setIsAddDialogOpen(false);
    setCurrentBook({ id: "", name: "", price: "", image: "", description: "" });
  };

  const handleEditBook = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBooks = books.map((book) =>
      book.id === currentBook.id ? currentBook : book,
    );
    setBooks(updatedBooks);
    setIsEditDialogOpen(false);
  };

  const handleDeleteBook = () => {
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                      setCurrentBook({ ...currentBook, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Giá (VNĐ)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={currentBook.price}
                    onChange={(e) =>
                      setCurrentBook({ ...currentBook, price: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">URL Hình ảnh</Label>
                  <Input
                    id="image"
                    value={currentBook.image}
                    onChange={(e) =>
                      setCurrentBook({ ...currentBook, image: e.target.value })
                    }
                    placeholder="/placeholder.svg"
                    required
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead className="w-[80px]">Hình ảnh</TableHead>
              <TableHead>Tên sách</TableHead>
              <TableHead>Giá (VNĐ)</TableHead>
              <TableHead className="hidden md:table-cell">Mô tả</TableHead>
              <TableHead className="w-[100px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.name}
                    width={40}
                    height={50}
                    className="rounded-sm object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{book.name}</TableCell>
                <TableCell>
                  {Number.parseInt(book.price).toLocaleString("vi-VN")}₫
                </TableCell>
                <TableCell className="hidden max-w-[300px] truncate md:table-cell">
                  {book.description}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => openEditDialog(book)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openDeleteDialog(book)}>
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
      </div>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
                    setCurrentBook({ ...currentBook, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Giá (VNĐ)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={currentBook.price}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">URL Hình ảnh</Label>
                <Input
                  id="edit-image"
                  value={currentBook.image}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, image: e.target.value })
                  }
                  required
                />
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
              Bạn có chắc chắn muốn xóa sách &quot;{currentBook.name}&quot;?
              Hành động này không thể hoàn tác.
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
