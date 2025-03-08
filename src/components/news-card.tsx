import { Link } from "@tanstack/react-router";

interface NewsCardProps {
  title: string;
  image: string;
  date: string;
  excerpt: string;
}

export default function NewsCard({
  title,
  image,
  date,
  excerpt,
}: NewsCardProps) {
  return (
    <div className="overflow-hidden">
      <Link to="/" className="group">
        <div className="overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={200}
            className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="mb-2 text-sm text-red-600 text-center">{date}</div>
          <h3 className="mb-2 font-bold uppercase group-hover:text-primary">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{excerpt}</p>
        </div>
      </Link>
    </div>
  );
}
