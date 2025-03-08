import type React from "react";
import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

// Mock data for orders
const ordersData = [
  {
    id: "ORD001",
    idBook: "1",
    nameClient: "Nguyễn Văn A",
    phoneNumber: "0912345678",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    note: "Giao hàng ngoài giờ hành chính",
    status: "pending",
  },
  {
    id: "ORD002",
    idBook: "3",
    nameClient: "Trần Thị B",
    phoneNumber: "0987654321",
    address: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    note: "Gọi trước khi giao",
    status: "processing",
  },
  {
    id: "ORD003",
    idBook: "2",
    nameClient: "Lê Văn C",
    phoneNumber: "0909123456",
    address: "789 Đường Cách Mạng Tháng 8, Quận 3, TP.HCM",
    note: "",
    status: "completed",
  },
  {
    id: "ORD004",
    idBook: "5",
    nameClient: "Phạm Thị D",
    phoneNumber: "0976543210",
    address: "101 Đường Võ Văn Tần, Quận 3, TP.HCM",
    note: "Đóng gói cẩn thận",
    status: "completed",
  },
  {
    id: "ORD005",
    idBook: "4",
    nameClient: "Hoàng Văn E",
    phoneNumber: "0918765432",
    address: "202 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
    note: "Giao vào buổi sáng",
    status: "cancelled",
  },
];

const statusMap = {
  pending: { label: "Chờ xử lý", color: "bg-yellow-500" },
  processing: { label: "Đang xử lý", color: "bg-blue-500" },
  completed: { label: "Hoàn thành", color: "bg-green-500" },
  cancelled: { label: "Đã hủy", color: "bg-red-500" },
};

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState(ordersData);
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

  const handleEditOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedOrders = orders.map((order) =>
      order.id === currentOrder.id ? currentOrder : order,
    );
    setOrders(updatedOrders);
    setIsEditDialogOpen(false);
  };

  const handleDeleteOrder = () => {
    const updatedOrders = orders.filter(
      (order) => order.id !== currentOrder.id,
    );
    setOrders(updatedOrders);
    setIsDeleteDialogOpen(false);
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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.idBook}</TableCell>
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
                      <DropdownMenuItem onClick={() => openEditDialog(order)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openDeleteDialog(order)}>
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
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

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
                      status: e.target.value,
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
                  onChange={(e) =>
                    setCurrentOrder({
                      ...currentOrder,
                      nameClient: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phoneNumber">Số điện thoại</Label>
                <Input
                  id="edit-phoneNumber"
                  value={currentOrder.phoneNumber}
                  onChange={(e) =>
                    setCurrentOrder({
                      ...currentOrder,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Địa chỉ</Label>
                <Input
                  id="edit-address"
                  value={currentOrder.address}
                  onChange={(e) =>
                    setCurrentOrder({
                      ...currentOrder,
                      address: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-note">Ghi chú</Label>
                <Textarea
                  id="edit-note"
                  value={currentOrder.note}
                  onChange={(e) =>
                    setCurrentOrder({
                      ...currentOrder,
                      note: e.target.value,
                    })
                  }
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
