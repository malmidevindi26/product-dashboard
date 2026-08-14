import React from "react";
import { Heart } from "lucide-react";
import type { Product } from "../types/product";

interface ProductCardProps {
    product: Product
    isFavorite: boolean
    onToggleFavorite: (id: number) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onToggleFavorite}) =>{
return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="relative h-48 w-full flex items-center justify-center p-2 mb-4 bg-slate-50 rounded-lg">
          <img src={product.image} alt={product.title} className="h-full object-contain" />
          <button 
            onClick={() => onToggleFavorite(product.id)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm hover:bg-slate-100 transition"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
          </button>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-600 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="font-medium text-slate-800 text-base mt-2 line-clamp-2">{product.title}</h3>
      </div>
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-lg font-bold text-slate-900">${product.price}</span>
        <span className="text-sm text-amber-500 font-medium">★ {product.rating?.rate}</span>
      </div>
    </div>
  );
}