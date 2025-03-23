import { api } from "./api";

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data.cart;
};

export const addToCart = async (bookId: string) => {
  const response = await api.post("/cart", {
    bookId,
  });
  return response.data.cartItem;
};

export const updateCart = async (cartId: string, quantity: number) => {
  const response = await api.put(`/cart/${cartId}`, {
    quantity,
  });
  return response.data;
};

export const deleteCart = async (cartId: string) => {
  const response = await api.delete(`/cart/${cartId}`);
  return response.data;
};

export const payCart = async ({
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
}) => {
  const response = await api.post("/cart/pay", {
    cartItemIds,
    nameClient,
    phoneNumber,
    address,
    note,
  });
  return response.data;
};
