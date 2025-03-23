import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginApi } from "@/api/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { IError } from "@/api/api";
import { IUser } from "@/types/user";
import useUser from "@/store/useUser";

export function LoginPage() {
  const router = useRouter();
  const { setUser, user, resetUser } = useUser();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    resetUser();
    toast.success("Đăng xuất thành công");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await loginApi({ username, password });
      if (response.token) {
        localStorage.setItem("token", JSON.stringify(response.token));
        setUser(response.user as IUser);
        toast.success("Đăng nhập thành công");
        setTimeout(() => {
          if (response.user?.role === "admin") {
            router.navigate({ to: "/admin" });
          } else {
            router.navigate({ to: "/client/home" });
          }
        }, 1000);
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const dataError = error.response.data as IError;
        if (dataError && dataError.message) {
          toast.error(dataError.message);
          console.log(dataError.message);
        }
      } else {
        toast.error("Đã xảy ra lỗi không xác định");
        console.error(error);
      }
    }
  };

  if (token && user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-2xl max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Thông tin người dùng
            </CardTitle>
            <CardDescription className="text-center">
              Bạn đã đăng nhập vào hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>ID</Label>
                <p className="text-gray-700">{user.id}</p>
              </div>
              <div className="grid gap-2">
                <Label>Tên đăng nhập</Label>
                <p className="text-gray-700">{user.username}</p>
              </div>
              <div className="grid gap-2">
                <Label>Vai trò</Label>
                <p className="text-gray-700">{user.role}</p>
              </div>
              <Button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white font-semibold hover:bg-red-600 mt-2"
              >
                Đăng xuất
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mt-2 text-center text-sm">
              {user.role === "admin" ? (
                <Link
                  to="/admin"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Đi đến trang quản trị
                </Link>
              ) : (
                <Link
                  to="/client/home"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Đi đến trang chính
                </Link>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-2xl max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Đăng nhập
          </CardTitle>
          <CardDescription className="text-center">
            Nhập thông tin đăng nhập của bạn để tiếp tục
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="@devhatebug"
                  required
                />
              </div>
              <div className="grid gap-2 mt-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold hover:bg-blue-600 mt-2"
              >
                Đăng nhập
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="mt-2 text-center text-sm">
            Chưa có tài khoản?{" "}
            <Link
              to="/auth/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Đăng ký
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
