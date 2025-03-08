import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col w-full ">
      <main className="flex-1 w-[99vw] mx-auto items-center justify-center flex flex-col">
        {/* Hero Section */}
        <section className="bg-muted/30 py-12 md:py-24 rounded-lg">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Về VinaBook
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Chúng tôi là nhà sách trực tuyến hàng đầu Việt Nam, cung cấp
                    hàng ngàn đầu sách chất lượng với dịch vụ giao hàng nhanh
                    chóng và uy tín.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/client/contact">
                    <Button className="bg-green-700 font-bold hover:bg-green-800">
                      Liên hệ ngay
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline">Khám phá sách</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.png?height=400&width=600"
                  alt="VinaBook Storefront"
                  width={600}
                  height={400}
                  className="aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Câu chuyện của chúng tôi
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                VinaBook được thành lập vào năm 2010 với sứ mệnh mang tri thức
                đến gần hơn với mọi người. Chúng tôi bắt đầu từ một cửa hàng nhỏ
                tại Hà Nội và nay đã phát triển thành một trong những nhà sách
                trực tuyến lớn nhất Việt Nam.
              </p>
              <Separator className="my-4" />
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                      <path d="M10 2c1 .5 2 2 2 5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Chất lượng</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Chúng tôi cam kết cung cấp sách chính hãng, chất lượng cao
                    từ các nhà xuất bản uy tín.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Dịch vụ</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Đội ngũ nhân viên tận tâm, sẵn sàng hỗ trợ và tư vấn cho
                    khách hàng mọi lúc.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Đam mê</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Chúng tôi làm việc với niềm đam mê sách và mong muốn lan tỏa
                    văn hóa đọc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted/30 py-12 md:py-24 rounded-lg">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Đội ngũ của chúng tôi
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Gặp gỡ những con người tài năng và đam mê đằng sau thành công
                của VinaBook.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <img
                    src="/placeholder.png?height=300&width=300"
                    alt="Team Member"
                    width={300}
                    height={300}
                    className="aspect-square w-full object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <CardTitle>Nguyễn Văn A</CardTitle>
                  <CardDescription>Giám đốc điều hành</CardDescription>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <img
                    src="/placeholder.png?height=300&width=300"
                    alt="Team Member"
                    width={300}
                    height={300}
                    className="aspect-square w-full object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <CardTitle>Trần Thị B</CardTitle>
                  <CardDescription>Giám đốc marketing</CardDescription>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <img
                    src="/placeholder.png?height=300&width=300"
                    alt="Team Member"
                    width={300}
                    height={300}
                    className="aspect-square w-full object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <CardTitle>Lê Văn C</CardTitle>
                  <CardDescription>Quản lý cửa hàng</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Store Locations */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Hệ thống cửa hàng
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Ghé thăm một trong những cửa hàng của chúng tôi để trải nghiệm
                không gian sách tuyệt vời.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Chi nhánh Hà Nội</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p>27 Chùa Bộc, Đống Đa, Hà Nội</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p>024.3852.2222</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p>hanoi@bookstore.com</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Xem bản đồ
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Chi nhánh TP. Hồ Chí Minh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p>028.3822.3333</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p>hcm@bookstore.com</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Xem bản đồ
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-green-600 text-primary-foreground py-12 md:py-24 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Hãy đến với VinaBook ngay hôm nay
              </h2>
              <p className="max-w-[85%] leading-normal sm:text-lg sm:leading-7">
                Khám phá thế giới sách cùng chúng tôi và tìm kiếm những cuốn
                sách yêu thích của bạn.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/">
                  <Button variant="secondary" size="lg">
                    Mua sắm ngay
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-green-600-foreground/10"
                  >
                    Liên hệ chúng tôi
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
