type BookItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type CartItem = {
  id: string;
  userId: string;
  book: BookItem;
  quantity: number;
  status: "pending" | "completed";
};
