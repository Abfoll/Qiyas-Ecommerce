import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-orange-400 transition-colors shadow-sm">
      <div className="relative h-40 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
        image
        {product.badge && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-semibold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="font-medium text-sm mb-1">{product.name}</p>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">${product.price}</span>
          {product.oldPrice && (
            <span className="text-xs text-slate-400 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">
          ★ {product.rating} ({product.reviews})
        </p>
      </div>
    </div>
  );
}