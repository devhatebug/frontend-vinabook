import { Link } from "@tanstack/react-router";
import { BookOpen, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/api/api.ts";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const booksResponse = await api.get("/book/get-all");
      setTotalBooks(booksResponse.data.length);

      const ordersResponse = await api.get("/order/get-all");
      setTotalOrders(ordersResponse.data.length);

      const usersResponse = await api.get("/user");
      setTotalUsers(usersResponse.data.users.length);

      setLoading(false);
    };

    fetchData().then();
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Bảng điều khiển</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link to="/admin/books">
              <Card className="hover:bg-muted/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Quản lý sách
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalBooks}</div>
                  <p className="text-xs text-muted-foreground">Tổng số sách</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/admin/orders">
              <Card className="hover:bg-muted/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Quản lý đơn hàng
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                  <p className="text-xs text-muted-foreground">Đơn hàng mới</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/admin/users">
              <Card className="hover:bg-muted/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Quản lý người dùng
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    Người dùng mới
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
