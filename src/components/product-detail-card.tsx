import { useState } from "react";

interface ProductDetailCardProps {
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductDetailCard({
  title = "CHÚ THUẬT HỒI CHIẾN - TẬP 1",
  price = 30000,
  description = "Chú thuật hồi chiến - Tập 1",
  image = "/book-sale4.png",
}: Partial<ProductDetailCardProps>) {
  const [selectedImage, setSelectedImage] = useState(image);

  return (
    <div className="border-0 shadow-none">
      <div className="p-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[120px_1fr_1fr]">
          <div className="hidden flex-col gap-2 md:flex">
            <button
              className="overflow-hidden rounded border-2 border-primary p-1"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={title}
                width={100}
                height={150}
                className="h-auto w-full object-cover"
              />
            </button>
          </div>

          <div className="mx-auto md:mx-0">
            <img
              src={selectedImage || image}
              alt={title}
              width={280}
              height={400}
              className="h-auto max-h-[400px] w-auto object-contain"
            />
          </div>
          <div className="flex flex-col mt-4 gap-y-2">
            <h1 className="text-md font-bold md:text-xl">{title}</h1>
            <div className="text-red-600 mt-1">
              {Number(price).toLocaleString("vi-VN")} vnd
            </div>
            <div>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
