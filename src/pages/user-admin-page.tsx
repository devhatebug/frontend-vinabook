import React, { useEffect, useState } from "react";
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
import { api, IError } from "@/api/api.ts";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { PropagateLoader } from "react-spinners";

interface User {
  id: string;
  username: string;
  password?: string;
  role: "admin" | "user";
}

export default function UsersAdminPage() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    username: "",
    role: "user",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/user/pagination", {
          params: { page: currentPage, limit },
        });
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const dataError = error.response.data as IError;
          if (dataError && dataError.message) {
            toast.error(dataError.message);
            console.log(dataError.message);
          }
        } else {
          toast.error("Có lỗi xảy ra khi lấy danh sách người dùng");
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      username: currentUser.username,
      role: currentUser.role,
      password: currentUser.password,
    };
    setIsAddDialogOpen(false);
    try {
      const response = await api.post("/user", userData);
      setUsers((prev) =>
        prev ? [...prev, response.data.user] : [response.data.user]
      );
      toast.success(response.data.message);
      setCurrentUser({
        id: "",
        username: "",
        role: "user",
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const dataError = error.response.data as IError;
        if (dataError && dataError.message) {
          toast.error(dataError.message);
          console.log(dataError.message);
        }
      } else {
        toast.error("Có lỗi xảy ra khi thêm người dùng");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      username: currentUser.username,
      role: currentUser.role,
    };
    setIsEditDialogOpen(false);
    try {
      await api.put(`/user/${currentUser.id}`, userData);
      toast.success("Cập nhật người dùng thành công");
      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? currentUser : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const dataError = error.response.data as IError;
        if (dataError && dataError.message) {
          toast.error(dataError.message);
          console.log(dataError.message);
        }
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật người dùng");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await api.delete(`/user/${currentUser.id}`);
      toast.success("Xóa người dùng thành công");
      const updatedUsers = users.filter((user) => user.id !== currentUser.id);
      setUsers(updatedUsers);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const dataError = error.response.data as IError;
        if (dataError && dataError.message) {
          toast.error(dataError.message);
          console.log(dataError.message);
        }
      } else {
        toast.error("Có lỗi xảy ra khi xóa người dùng");
        console.error(error);
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (user: typeof currentUser) => {
    setCurrentUser(user);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: typeof currentUser) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-y-4 items-start">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 text-white font-bold flex justify-center hover:bg-blue-600">
              <Plus className="h-4 w-4" />
              Thêm người dùng
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm người dùng mới</DialogTitle>
              <DialogDescription>
                Điền thông tin người dùng mới vào form dưới đây
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUser}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    id="username"
                    value={currentUser.username}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        username: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Mật khẩu</Label>
                  <Input
                    id="password"
                    value={currentUser.password || ""}
                    type="password"
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="w-full gap-y-2 flex flex-col">
                  <Label htmlFor="role">Vai trò</Label>
                  <select
                    id="role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={currentUser.role}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        role: e.target.value as "admin" | "user",
                      })
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="user">Client</option>
                  </select>
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
            <PropagateLoader loading={loading} size={32} color="#FF6D67" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">STT</TableHead>
                <TableHead>Tên đăng nhập</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead className="w-[100px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-red-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {user.role === "admin" ? "Admin" : "Client"}
                    </span>
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
                        <DropdownMenuItem onClick={() => openEditDialog(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(user)}
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
          {Math.min(indexOfLastItem, users?.length || 0)} of{" "}
          {users?.length || 0} items
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
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin người dùng ID: {currentUser.id}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditUser}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-username">Tên đăng nhập</Label>
                <Input
                  id="edit-username"
                  value={currentUser.username}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="w-full gap-y-2 flex flex-col">
                <Label htmlFor="edit-role">Vai trò</Label>
                <select
                  id="edit-role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={currentUser.role}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      role: e.target.value as "admin" | "user",
                    })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="client">Client</option>
                </select>
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
            <AlertDialogTitle>Xác nhận xóa người dùng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa người dùng "{currentUser.username}"?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white font-bold flex justify-center hover:bg-red-600"
              onClick={handleDeleteUser}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
