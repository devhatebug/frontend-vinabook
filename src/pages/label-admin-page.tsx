import React, { useEffect, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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
import { api, IError } from '@/api/api.ts';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { PropagateLoader } from 'react-spinners';

export interface LabelType {
    id: string;
    name: string;
    value: string;
    description: string;
}

export default function LabelsAdminPage() {
    const [loading, setLoading] = useState(false);
    const [labels, setLabels] = useState<LabelType[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentLabel, setCurrentLabel] = useState<LabelType>({
        id: '',
        name: '',
        value: '',
        description: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const indexOfLastItem = currentPage * limit;
    const indexOfFirstItem = indexOfLastItem - limit;

    useEffect(() => {
        const fetchLabels = async () => {
            setLoading(true);
            try {
                const response = await api.get('/label/pagination', {
                    params: { page: currentPage, limit },
                });
                setLabels(response.data.rows);
                setTotalPages(response.data.count);
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    const dataError = error.response.data as IError;
                    if (dataError && dataError.message) {
                        toast.error(dataError.message);
                        console.log(dataError.message);
                    }
                } else {
                    toast.error('Có lỗi xảy ra khi lấy danh sách label');
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchLabels();
    }, [currentPage]);

    const handleAddLabel = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const labelData = {
            name: currentLabel.name,
            value: currentLabel.value,
            description: currentLabel.description,
        };
        setIsAddDialogOpen(false);
        try {
            const response = await api.post('/label', labelData);
            setLabels((prev) =>
                prev ? [...prev, response.data.label] : [response.data.label]
            );
            toast.success(response.data.message || 'Thêm label thành công');
            setCurrentLabel({
                id: '',
                name: '',
                value: '',
                description: '',
            });
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const dataError = error.response.data as IError;
                if (dataError && dataError.message) {
                    toast.error(dataError.message);
                    console.log(dataError.message);
                }
            } else {
                toast.error('Có lỗi xảy ra khi thêm label');
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEditLabel = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const labelData = {
            name: currentLabel.name,
            value: currentLabel.value,
            description: currentLabel.description,
        };
        setIsEditDialogOpen(false);
        try {
            await api.put(`/label/${currentLabel.id}`, labelData);
            toast.success('Cập nhật label thành công');
            const updatedLabels = labels.map((label) =>
                label.id === currentLabel.id ? currentLabel : label
            );
            setLabels(updatedLabels);
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const dataError = error.response.data as IError;
                if (dataError && dataError.message) {
                    toast.error(dataError.message);
                    console.log(dataError.message);
                }
            } else {
                toast.error('Có lỗi xảy ra khi cập nhật label');
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteLabel = async () => {
        try {
            await api.delete(`/label/${currentLabel.id}`);
            toast.success('Xóa label thành công');
            const updatedLabels = labels.filter(
                (label) => label.id !== currentLabel.id
            );
            setLabels(updatedLabels);
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const dataError = error.response.data as IError;
                if (dataError && dataError.message) {
                    toast.error(dataError.message);
                    console.log(dataError.message);
                }
            } else {
                toast.error('Có lỗi xảy ra khi xóa label');
                console.error(error);
            }
        }
        setIsDeleteDialogOpen(false);
    };

    const openEditDialog = (label: typeof currentLabel) => {
        setCurrentLabel(label);
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (label: typeof currentLabel) => {
        setCurrentLabel(label);
        setIsDeleteDialogOpen(true);
    };

    return (
        <div className="flex flex-col gap-y-4 items-start">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold">Quản lý Label</h1>
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="bg-blue-500 text-white font-bold flex justify-center hover:bg-blue-600">
                            <Plus className="h-4 w-4" />
                            Thêm Label
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Thêm label mới</DialogTitle>
                            <DialogDescription>
                                Điền thông tin label mới vào form dưới đây
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddLabel}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Tên Label</Label>
                                    <Input
                                        id="name"
                                        value={currentLabel.name}
                                        onChange={(e) =>
                                            setCurrentLabel({
                                                ...currentLabel,
                                                name: e.target.value,
                                                value: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Mô tả</Label>
                                    <Textarea
                                        id="description"
                                        value={currentLabel.description}
                                        onChange={(e) =>
                                            setCurrentLabel({
                                                ...currentLabel,
                                                description: e.target.value,
                                            })
                                        }
                                        required
                                        rows={4}
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
                                <TableHead className="w-[200px]">
                                    Tên Label
                                </TableHead>
                                <TableHead>Giá trị</TableHead>
                                <TableHead>Mô tả</TableHead>
                                <TableHead className="w-[100px]">
                                    Thao tác
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {labels.map((label, index) => (
                                <TableRow key={label.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">
                                        {label.name}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-500 text-white">
                                            {label.value}
                                        </span>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {label.description}
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
                                                        openEditDialog(label)
                                                    }
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Sửa
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        openDeleteDialog(label)
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
                    {Math.min(indexOfLastItem, labels?.length || 0)} of{' '}
                    {labels?.length || 0} items
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
                        <DialogTitle>Chỉnh sửa Label</DialogTitle>
                        <DialogDescription>
                            Chỉnh sửa thông tin label ID: {currentLabel.id}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditLabel}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Tên Label</Label>
                                <Input
                                    id="edit-name"
                                    value={currentLabel.name}
                                    onChange={(e) =>
                                        setCurrentLabel({
                                            ...currentLabel,
                                            name: e.target.value,
                                            value: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-description">Mô tả</Label>
                                <Textarea
                                    id="edit-description"
                                    value={currentLabel.description}
                                    onChange={(e) =>
                                        setCurrentLabel({
                                            ...currentLabel,
                                            description: e.target.value,
                                        })
                                    }
                                    required
                                    rows={4}
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
                        <AlertDialogTitle>Xác nhận xóa Label</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa label "{currentLabel.name}
                            "? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-500 text-white font-bold flex justify-center hover:bg-red-600"
                            onClick={handleDeleteLabel}
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
