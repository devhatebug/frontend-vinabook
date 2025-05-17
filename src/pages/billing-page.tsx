import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Check, CreditCard, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useCart from '@/store/useCart';
import { toast } from 'sonner';

export function BillingPage() {
    const navigate = useNavigate();
    const { cart, payCart } = useCart();

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const cartItemIds = cart.map((item) => item.id);
    const [orderStatus, setOrderStatus] = useState('pending');
    const [shippingInfo, setShippingInfo] = useState({
        nameClient: '',
        phoneNumber: '',
        address: '',
        note: '',
    });

    const handlePaymentMethodChange = async () => {
        setOrderStatus('processing');
        try {
            const response = await payCart({
                cartItemIds,
                nameClient: shippingInfo.nameClient,
                phoneNumber: shippingInfo.phoneNumber,
                address: shippingInfo.address,
                note: shippingInfo.note,
            });

            if (response || response.status === 'success') {
                setOrderStatus('success');
            } else {
                setOrderStatus('pending');
                toast.error('Đặt hàng thất bại, vui lòng thử lại sau!');
            }
        } catch (error) {
            setOrderStatus('pending');
            console.log(error);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setShippingInfo({
            ...shippingInfo,
            [name]: value,
        });
    };

    const shipping = 30000;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const handlePlaceOrder = () => {
        if (
            !shippingInfo.nameClient ||
            !shippingInfo.phoneNumber ||
            !shippingInfo.address
        ) {
            toast.warning('Vui lòng điền đầy đủ thông tin giao hàng!');
            return;
        }

        setOrderStatus('processing');

        if (paymentMethod === 'cod') {
            handlePaymentMethodChange();
        } else {
            setTimeout(() => {
                setOrderStatus('awaiting_payment');
            }, 1000);
        }
    };

    const handleConfirmPayment = () => {
        handlePaymentMethodChange();
    };

    const handleBackToHome = () => {
        navigate({ to: '/' });
    };

    if (orderStatus === 'success') {
        return (
            <div className="bg-gray-50 min-h-screen py-12 px-4">
                <div className="max-w-md mx-auto">
                    <Card className="border-green-200 shadow-lg">
                        <CardHeader className="bg-green-50 border-b border-green-100">
                            <div className="flex justify-center mb-2">
                                <div className="rounded-full bg-green-100 p-3">
                                    <Check className="h-8 w-8 text-green-600" />
                                </div>
                            </div>
                            <CardTitle className="text-center text-xl text-green-700">
                                Đặt hàng thành công!
                            </CardTitle>
                            <CardDescription className="text-center">
                                Cảm ơn bạn đã mua sắm tại VinaBook
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-gray-700">
                                        Thông tin đơn hàng
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Mã đơn hàng: #VB
                                        {Math.floor(Math.random() * 10000)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Ngày đặt:{' '}
                                        {new Date().toLocaleDateString('vi-VN')}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-700">
                                        Thông tin giao hàng
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {shippingInfo.nameClient}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {shippingInfo.phoneNumber}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-700">
                                        Phương thức thanh toán
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {paymentMethod === 'cod'
                                            ? 'Thanh toán khi nhận hàng'
                                            : 'Thanh toán trực tiếp'}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-700">
                                        Phí vận chuyển
                                    </h3>
                                    <p className="text-lg font-semibold text-primary">
                                        {formatCurrency(shipping)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full bg-blue-500 text-white hover:bg-blue-600"
                                onClick={handleBackToHome}
                            >
                                Tiếp tục mua sắm
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    }

    if (orderStatus === 'awaiting_payment') {
        return (
            <div className="bg-gray-50 min-h-screen py-12 px-4">
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Xác nhận thanh toán</CardTitle>
                            <CardDescription>
                                Vui lòng hoàn tất thanh toán để hoàn thành đơn
                                hàng
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Alert>
                                    <CreditCard className="h-4 w-4" />
                                    <AlertTitle>
                                        Thông tin thanh toán
                                    </AlertTitle>
                                    <AlertDescription>
                                        <p className="mt-2">
                                            Số tài khoản:{' '}
                                            <strong>1234 5678 9012</strong>
                                        </p>
                                        <p>
                                            Ngân hàng:{' '}
                                            <strong>VietcomBank</strong>
                                        </p>
                                        <p>
                                            Chủ tài khoản:{' '}
                                            <strong>
                                                CÔNG TY TNHH VINABOOK
                                            </strong>
                                        </p>
                                        <p>
                                            Vận chuyển:{' '}
                                            <strong>
                                                {formatCurrency(shipping)}
                                            </strong>
                                        </p>
                                        <p>
                                            Nội dung:{' '}
                                            <strong>
                                                VB
                                                {Math.floor(
                                                    Math.random() * 10000
                                                )}
                                            </strong>
                                        </p>
                                    </AlertDescription>
                                </Alert>

                                <div className="text-center text-sm text-gray-500 mt-4">
                                    <p>
                                        Đây là demo, bạn có thể bấm "Xác nhận đã
                                        thanh toán" để tiếp tục
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-end gap-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setOrderStatus('pending')}
                            >
                                Quay lại
                            </Button>
                            <Button
                                className="bg-blue-500 text-white hover:bg-blue-600"
                                onClick={handleConfirmPayment}
                            >
                                Xác nhận đã thanh toán
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    }

    if (orderStatus === 'processing') {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold mb-2">
                        Đang xử lý đơn hàng của bạn
                    </h2>
                    <p className="text-gray-500">
                        Vui lòng đợi trong giây lát...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto py-8 px-4">
                <div className="mb-6">
                    <Link
                        to="/client/cart"
                        className="inline-flex items-center text-primary hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Quay lại giỏ hàng
                    </Link>
                </div>

                <h1 className="text-2xl font-bold mb-8">Thanh toán</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <h2 className="text-lg font-semibold mb-4">
                                Thông tin giao hàng
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nameClient">
                                        Họ và tên{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="nameClient"
                                        name="nameClient"
                                        value={shippingInfo.nameClient}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">
                                        Số điện thoại{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={shippingInfo.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="address">
                                        Địa chỉ{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={shippingInfo.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="note">Ghi chú</Label>
                                    <Textarea
                                        id="note"
                                        name="note"
                                        value={shippingInfo.note}
                                        onChange={handleInputChange}
                                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">
                                Phương thức thanh toán
                            </h2>
                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                                className="space-y-4"
                            >
                                <div className="flex items-start space-x-3 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                                    <RadioGroupItem
                                        value="cod"
                                        id="cod"
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <Label
                                            htmlFor="cod"
                                            className="flex items-center cursor-pointer"
                                        >
                                            <Truck className="h-5 w-5 mr-2 text-orange-500" />
                                            <span className="font-medium">
                                                Thanh toán khi nhận hàng (COD)
                                            </span>
                                        </Label>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Bạn chỉ phải thanh toán khi nhận
                                            được hàng
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                                    <RadioGroupItem
                                        value="direct"
                                        id="direct"
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <Label
                                            htmlFor="direct"
                                            className="flex items-center cursor-pointer"
                                        >
                                            <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                                            <span className="font-medium">
                                                Thanh toán trực tiếp
                                            </span>
                                        </Label>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Thanh toán qua chuyển khoản ngân
                                            hàng
                                        </p>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                            <h2 className="text-lg font-semibold mb-4">
                                Đơn hàng của bạn
                            </h2>
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="flex-shrink-0 w-16">
                                            <img
                                                src={
                                                    item.book.image ||
                                                    '/placeholder.svg'
                                                }
                                                alt={item.book.name}
                                                className="w-full h-auto object-cover border rounded"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm line-clamp-2">
                                                {item.book.name}
                                            </h3>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-sm text-gray-500">
                                                    SL: {item.quantity}
                                                </span>
                                                <span className="text-sm font-medium">
                                                    {formatCurrency(
                                                        item.book.price *
                                                            item.quantity
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Vận chuyển
                                        </span>
                                        <span>{formatCurrency(shipping)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Phí vận chuyển
                                        </span>
                                        <span>{formatCurrency(shipping)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Vận chuyển</span>
                                        <span className="text-primary">
                                            {formatCurrency(shipping)}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600"
                                    size="lg"
                                    onClick={handlePlaceOrder}
                                >
                                    Đặt hàng
                                </Button>

                                <p className="text-xs text-gray-500 text-center mt-2">
                                    Bằng cách đặt hàng, bạn đồng ý với các{' '}
                                    <Link
                                        to="/terms"
                                        className="text-primary hover:underline"
                                    >
                                        điều khoản và điều kiện
                                    </Link>{' '}
                                    của chúng tôi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
