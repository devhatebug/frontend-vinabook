import { Link } from '@tanstack/react-router';
import { BookOpen, Package, Tag, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/api/api.ts';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    TimeScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

interface dataChart {
    datasets: {
        label?: string;
        data: {
            x: string;
            y: number;
        }[];
        fill?: boolean;
        borderColor?: string;
    }[];
}

interface top10BookSellers {
    bookId: string;
    quantity: number;
    bookName: string;
    price: number;
    label: string;
}

export default function AdminPage() {
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [top10BookSellers, setTop10BookSellers] = useState<
        top10BookSellers[]
    >([]);
    const [dataOrders, setDataOrders] = useState<dataChart>({
        datasets: [
            {
                label: 'Đơn hàng',
                data: [
                    { x: '2024-01-01', y: 10 },
                    { x: '2024-02-01', y: 20 },
                    { x: '2024-03-01', y: 15 },
                ],
            },
        ],
    });
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalLabels, setTotalLabels] = useState(0);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = React.useState<Date>(
        new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    );
    const [endDate, setEndDate] = React.useState<Date>(new Date());
    const [startDate1, setStartDate1] = React.useState<Date>(
        new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    );
    const [endDate1, setEndDate1] = React.useState<Date>(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const booksResponse = await api.get('/book/get-all');
                setTotalBooks(booksResponse.data.data.length);

                const ordersResponse = await api.get('/order/get-all');
                setTotalOrders(ordersResponse.data.length);

                const usersResponse = await api.get('/user');
                setTotalUsers(usersResponse.data.users.length);

                const labelsResponse = await api.get('/label/get-all');
                setTotalLabels(labelsResponse.data.length);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchStaticData = async () => {
            try {
                const staticResponse = await api.get('/order/static-order', {
                    params: {
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString(),
                    },
                });
                setDataOrders(() => {
                    return {
                        datasets: [
                            {
                                label: 'Đơn hàng',
                                data: staticResponse.data.staticData.data.map(
                                    (item: { time: string; value: number }) => {
                                        const [day, month, year] =
                                            item.time.split('/');
                                        return {
                                            x: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
                                            y: item.value,
                                        };
                                    }
                                ),
                                fill: false,
                                borderColor: '#112f7e ',
                                borderWidth: 1,
                            },
                        ],
                    };
                });
            } catch (error) {
                console.error('Error fetching static data:', error);
            }
        };
        fetchStaticData();
    }, [startDate, endDate]);

    useEffect(() => {
        async function fetchTop10BookSellers() {
            try {
                const response = await api.get(
                    '/order/top-10-best-selling-books',
                    {
                        params: {
                            startDate: startDate1.toISOString(),
                            endDate: endDate1.toISOString(),
                        },
                    }
                );
                setTop10BookSellers(response.data.topBooks);
            } catch (error) {
                console.error('Error fetching top 10 book sellers:', error);
            }
        }
        fetchTop10BookSellers();
    }, [startDate1, endDate1]);

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: 'day' as const,
                },
                title: {
                    display: true,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                },
            },
        },
    };

    function getStarRanking(rank: number) {
        switch (rank) {
            case 1:
                return '/star/star.png';
            case 2:
                return '/star/two.png';
            case 3:
                return '/star/three.png';
            case 4:
                return '/star/four.png';
            case 5:
                return '/star/five.png';
            case 6:
                return '/star/six.png';
            case 7:
                return '/star/seven.png';
            case 8:
                return '/star/eight.png';
            case 9:
                return '/star/nine.png';
            case 10:
                return '/star/ten.png';
            default:
                return '';
        }
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid gap-4">
                    <h1 className="text-2xl font-bold">Bảng điều khiển</h1>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Link to="/admin/books">
                            <Card className="hover:bg-muted/50">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Quản lý sách
                                    </CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {totalBooks}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Tổng số sách
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link to="/admin/books">
                            <Card className="hover:bg-muted/50">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Quản lý nhãn
                                    </CardTitle>
                                    <Tag className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {totalLabels}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Tổng số nhãn
                                    </p>
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
                                    <div className="text-2xl font-bold">
                                        {totalOrders}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Đơn hàng mới
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link to="/admin/users">
                            <Card className="hover:bg-muted/50">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Quản lý người dùng
                                    </CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {totalUsers}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Người dùng mới
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                    <div className="mt-4 grid gap-4 grid-cols-1 lg:grid-cols-2">
                        <div className="rounded-md border bg-card p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">
                                    Biểu đồ đơn hàng
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'justify-start text-left font-normal',
                                                    !startDate &&
                                                        'text-muted-foreground'
                                                )}
                                            >
                                                <CalendarIcon />
                                                {startDate ? (
                                                    format(startDate, 'PPP')
                                                ) : (
                                                    <span>
                                                        Chọn ngày bắt đầu
                                                    </span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-fit p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={startDate}
                                                onSelect={(date) => {
                                                    if (date)
                                                        setStartDate(date);
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'justify-start text-left font-normal',
                                                    !endDate &&
                                                        'text-muted-foreground'
                                                )}
                                            >
                                                <CalendarIcon />
                                                {endDate ? (
                                                    format(endDate, 'PPP')
                                                ) : (
                                                    <span>
                                                        Chọn ngày kết thúc
                                                    </span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-fit p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={endDate}
                                                onSelect={(date) => {
                                                    if (date) setEndDate(date);
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <Line data={dataOrders} options={options} />
                        </div>

                        <div className="rounded-md border bg-card p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">
                                    Top 10 sách bán chạy
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'justify-start text-left font-normal',
                                                    !startDate1 &&
                                                        'text-muted-foreground'
                                                )}
                                            >
                                                <CalendarIcon />
                                                {startDate1 ? (
                                                    format(startDate1, 'PPP')
                                                ) : (
                                                    <span>
                                                        Chọn ngày bắt đầu
                                                    </span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-fit p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={startDate1}
                                                onSelect={(date) => {
                                                    if (date)
                                                        setStartDate1(date);
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'justify-start text-left font-normal',
                                                    !endDate1 &&
                                                        'text-muted-foreground'
                                                )}
                                            >
                                                <CalendarIcon />
                                                {endDate1 ? (
                                                    format(endDate1, 'PPP')
                                                ) : (
                                                    <span>
                                                        Chọn ngày kết thúc
                                                    </span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-fit p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={endDate1}
                                                onSelect={(date) => {
                                                    if (date) setEndDate1(date);
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            <Table>
                                <TableCaption>
                                    Danh sách 10 sách bán chạy nhất
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            STT{' '}
                                        </TableHead>
                                        <TableHead>Tên sách</TableHead>
                                        <TableHead>Nhãn</TableHead>
                                        <TableHead className="text-right">
                                            Giá
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Số lượng
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {top10BookSellers.map((item, index) => (
                                        <TableRow key={item.bookId}>
                                            <TableCell>
                                                <img
                                                    src={getStarRanking(
                                                        index + 1
                                                    )}
                                                    alt={item.bookName}
                                                    width={25}
                                                    className="rounded-sm object-cover"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {item.bookName}
                                            </TableCell>
                                            <TableCell>{item.label}</TableCell>
                                            <TableCell className="text-right">
                                                {item.price.toLocaleString(
                                                    'en-US',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {item.quantity}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
