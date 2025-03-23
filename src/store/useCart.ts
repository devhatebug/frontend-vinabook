import { create } from "zustand";
import {
  getCart,
  addToCart,
  deleteCart,
  updateCart,
  payCart,
} from "@/api/cart";
import { CartItem } from "@/types/cart";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { IError } from "@/api/api";

interface CartState {
  cart: CartItem[];
  cartQuantity: number;
  setCartQuantity: (quantity: number) => void;
  increaseCartQuantity: () => void;
  decreaseCartQuantity: () => void;
  resetCartQuantity: () => void;
  fetchCart: () => Promise<void>;
  addToCart: (bookId: string) => Promise<void>;
  updateCart: (cartId: string, quantity: number) => Promise<void>;
  deleteCart: (cartId: string) => Promise<void>;
  payCart: ({
    cartItemIds,
    nameClient,
    phoneNumber,
    address,
    note,
  }: {
    cartItemIds: string[];
    nameClient: string;
    phoneNumber: string;
    address: string;
    note: string;
  }) => Promise<void>;
}

const useCart = create<CartState>((set, get) => ({
  cart: [],
  cartQuantity: 0,
  setCartQuantity: (quantity) => set({ cartQuantity: quantity }),
  increaseCartQuantity: () =>
    set((state) => ({ cartQuantity: state.cartQuantity + 1 })),
  decreaseCartQuantity: () =>
    set((state) => ({ cartQuantity: Math.max(0, state.cartQuantity - 1) })),
  resetCartQuantity: () => set({ cartQuantity: 0 }),
  fetchCart: async () =>
    await getCart()
      .then((res) => {
        set({ cartQuantity: res.length, cart: res });
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        set({ cartQuantity: 0, cart: [] });
      }),
  addToCart: async (bookId) =>
    await addToCart(bookId)
      .then((res) => {
        const state = get();
        const existingItem = state.cart.find((item) => item.id === res.id);
        if (existingItem) {
          const updatedCart = state.cart.map((item) =>
            item.id === res.id ? { ...item, quantity: item.quantity + 1 } : item
          );
          set({ cart: updatedCart });
        } else {
          set((state) => ({
            cart: [...state.cart, res],
            cartQuantity: state.cartQuantity + 1,
          }));
        }
        toast.success("Thêm vào giỏ hàng thành công");
        state.increaseCartQuantity();
        state.fetchCart();
      })
      .catch((error) => {
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
      }),
  updateCart: async (cartId, quantity) =>
    await updateCart(cartId, quantity)
      .then(() => {
        const state = get();
        const updatedCart = state.cart.map((item) =>
          item.id === cartId ? { ...item, quantity } : item
        );
        set({ cart: updatedCart });
        toast.success("Cập nhật số lượng thành công");
        state.fetchCart();
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          const dataError = error.response.data as IError;
          if (dataError && dataError.message) {
            toast.error(dataError.message);
            console.log(dataError.message);
          }
        } else {
          toast.error("Có lỗi xảy ra khi cập nhật số lượng sản phẩm");
          console.error(error);
        }
      }),
  deleteCart: async (cartId) =>
    await deleteCart(cartId)
      .then(() => {
        const state = get();
        const updatedCart = state.cart.filter((item) => item.id !== cartId);
        set({ cart: updatedCart, cartQuantity: updatedCart.length });
        toast.success("Xóa sản phẩm thành công");
        state.decreaseCartQuantity();
        state.fetchCart();
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          const dataError = error.response.data as IError;
          if (dataError && dataError.message) {
            toast.error(dataError.message);
            console.log(dataError.message);
          }
        } else {
          toast.error("Có lỗi xảy ra khi xóa sản phẩm");
          console.error(error);
        }
      }),
  payCart: async ({ cartItemIds, nameClient, phoneNumber, address, note }) =>
    await payCart({
      cartItemIds,
      nameClient,
      phoneNumber,
      address,
      note,
    })
      .then(() => {
        const state = get();
        toast.success("Đặt hàng thành công");
        set({ cart: [], cartQuantity: 0 });
        state.resetCartQuantity();
        state.fetchCart();
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          const dataError = error.response.data as IError;
          if (dataError && dataError.message) {
            toast.error(dataError.message);
            console.log(dataError.message);
          }
        } else {
          toast.error("Có lỗi xảy ra khi đặt hàng");
          console.error(error);
        }
      }),
}));

export default useCart;
