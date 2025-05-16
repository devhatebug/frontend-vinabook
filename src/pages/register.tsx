import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { IError } from '@/api/api';
import { signupApi } from '@/api/auth';

export function RegisterPage() {
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get('email') as string;
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const response = await signupApi({ email, username, password });
            if (response.user) {
                toast.success('Đăng ký thành công');
            } else {
                toast.error('Đăng ký thất bại');
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const dataError = error.response.data as IError;
                if (dataError && dataError.message) {
                    toast.error(dataError.message);
                    console.log(dataError.message);
                }
            } else {
                toast.error('Đã xảy ra lỗi không xác định');
                console.error(error);
            }
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-2xl max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Đăng ký
                    </CardTitle>
                    <CardDescription className="text-center">
                        Tạo tài khoản mới để bắt đầu
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Tên đăng nhập</Label>
                                <Input
                                    id="username"
                                    type="username"
                                    name="username"
                                    placeholder="@devhatebug"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-semibold hover:bg-blue-600"
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <div className="mt-2 text-center text-sm">
                        Đã có tài khoản?{' '}
                        <Link
                            to="/auth/login"
                            className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                            Đăng nhập
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
