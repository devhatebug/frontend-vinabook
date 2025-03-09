import React, { useEffect } from "react";
import { useState } from "react";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { api, IError } from "@/api/api.ts";
import { PropagateLoader } from "react-spinners";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface Order {
  id: string;
  idBook: string;
  nameClient: string;
  phoneNumber: string;
  address: string;
  note: string;
  status: "pending" | "processing" | "completed" | "cancelled";
}

interface Book {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  type: "new" | "sale";
}

const statusMap = {
  pending: { label: "Chờ xử lý", color: "bg-yellow-500" },
  processing: { label: "Đang xử lý", color: "bg-blue-500" },
  completed: { label: "Hoàn thành", color: "bg-green-500" },
  cancelled: { label: "Đã hủy", color: "bg-red-500" },
};

export default function OrdersAdminPage() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookOrders, setBookOrders] = useState<Book>({
    id: "",
    name: "",
    price: "",
    image: "",
    description: "",
    type: "new",
  });
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    id: "",
    idBook: "",
    nameClient: "",
    phoneNumber: "",
    address: "",
    note: "",
    status: "pending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async (): Promise<Order[]> => {
      const response = await api.get("/order/pagination", {
        params: { page: currentPage, limit },
      });
      const { rows, count } = response.data;
      setOrders(rows);
      setTotalPages(Math.ceil(count / limit));
      return rows;
    };
    fetchOrders().then(() => setLoading(false));
  }, [currentPage]);

  const handleEditOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("status", currentOrder.status);
    setIsEditDialogOpen(false);

    try {
      const response = await api.put(`/order/${currentOrder.id}`, {
        status: formData.get("status"),
      });
      console.log(response.data);
      toast.success("Cập nhật đơn hàng thành công");
      orders.map((order) => {
        if (order.id === currentOrder.id) {
          order.status = currentOrder.status as Order["status"];
        }
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const dataError = error.response.data as IError;
        if (dataError && dataError.message) {
          toast.error(dataError.message);
          console.log(dataError.message);
        }
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật sách");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async () => {
    setLoading(true);
    setIsDeleteDialogOpen(false);
    try {
      await api.delete(`/order/${currentOrder.id}`);
      toast.success("Xóa đơn hàng thành công");
      const updatedOrders = orders.filter(
        (order) => order.id !== currentOrder.id,
      );
      setOrders(updatedOrders);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const dataError = error.response.data as IError;
        if (dataError && dataError.message) {
          toast.error(dataError.message);
          console.log(dataError.message);
        }
      } else {
        toast.error("Có lỗi xảy ra khi xóa đơn hàng");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const openViewDialog = async (order: typeof currentOrder) => {
    setCurrentOrder(order);
    const response = await api.get(`/order/get-by-id/${order.id}`);
    const { book } = response.data;
    setBookOrders(book);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (order: typeof currentOrder) => {
    setCurrentOrder(order);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (order: typeof currentOrder) => {
    setCurrentOrder(order);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
      </div>

      <div className="rounded-md border">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <PropagateLoader loading={loading} size={32} color="#FF6D67" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Mã đơn</TableHead>
                <TableHead className="w-[80px]">Mã sách</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead className="hidden md:table-cell">Địa chỉ</TableHead>
                <TableHead className="hidden md:table-cell">Ghi chú</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="w-[100px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell>ORD{index + 1}</TableCell>
                  <TableCell className="text-ellipsis max-w-[100px] truncate">
                    {order.idBook.substring(0, 8)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.nameClient}
                  </TableCell>
                  <TableCell>{order.phoneNumber}</TableCell>
                  <TableCell className="hidden max-w-[200px] truncate md:table-cell">
                    {order.address}
                  </TableCell>
                  <TableCell className="hidden max-w-[200px] truncate md:table-cell">
                    {order.note || "Không có"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${statusMap[order.status as keyof typeof statusMap].color} text-white`}
                    >
                      {statusMap[order.status as keyof typeof statusMap].label}
                    </Badge>
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
                        <DropdownMenuItem onClick={() => openViewDialog(order)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(order)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(order)}
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, orders?.length || 0)} of{" "}
          {orders?.length || 0} items
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
            <DialogTitle>Chỉnh sửa đơn hàng</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin đơn hàng {currentOrder.id}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditOrder}>
            <div className="grid gap-4 py-4">
              <div className="w-full gap-y-2 flex flex-col">
                <Label htmlFor="edit-status">Trạng thái</Label>
                <select
                  id="edit-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={currentOrder.status}
                  onChange={(e) =>
                    setCurrentOrder({
                      ...currentOrder,
                      status: e.target.value as Order["status"],
                    })
                  }
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-nameClient">Tên khách hàng</Label>
                <Input
                  id="edit-nameClient"
                  value={currentOrder.nameClient}
                  required
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phoneNumber">Số điện thoại</Label>
                <Input
                  id="edit-phoneNumber"
                  value={currentOrder.phoneNumber}
                  required
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Địa chỉ</Label>
                <Input
                  id="edit-address"
                  value={currentOrder.address}
                  required
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-note">Ghi chú</Label>
                <Textarea id="edit-note" value={currentOrder.note} disabled />
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

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết đơn hàng {currentOrder.id}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
              <p className="font-bold">Tên khách hàng:</p>
              <p>{currentOrder.nameClient}</p>
            </div>
            <div className="flex items-center gap-x-4">
              <p className="font-bold">Số điện thoại:</p>
              <p>{currentOrder.phoneNumber}</p>
            </div>
            <div className="flex items-center gap-x-4">
              <p className="font-bold">Địa chỉ:</p>
              <p>{currentOrder.address}</p>
            </div>
            <div className="flex items-center gap-x-4">
              <p className="font-bold">Ghi chú:</p>
              <p>{currentOrder.note}</p>
            </div>
            <div className="flex items-center gap-x-4">
              <p className="font-bold">Trạng thái:</p>
              <Badge
                className={`${statusMap[currentOrder.status as keyof typeof statusMap].color} text-white`}
              >
                {statusMap[currentOrder.status as keyof typeof statusMap].label}
              </Badge>
            </div>
            <div className="flex items-center gap-x-4">
              <p className="font-bold">Tên sách:</p>
              <p>{bookOrders.name}</p>
            </div>
            <div className="flex items-center gap-x-4">
              <p className="font-bold">Giá:</p>
              <p>{bookOrders.price}</p>
            </div>
            <div className="flex items-center gap-x-4">
              <p className="font-bold">Mã sách:</p>
              <p>{bookOrders.id}</p>
            </div>
            <div className="flex items-center gap-x-4">
              <img
                src={bookOrders.image}
                alt="book"
                className="h-32 w-32 object-cover"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-500 text-white font-bold flex justify-center hover:bg-blue-600"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa đơn hàng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa đơn hàng {currentOrder.id}? Hành động
              này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white font-bold flex justify-center hover:bg-red-600"
              onClick={handleDeleteOrder}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
