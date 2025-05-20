import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product, useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast(`Added ${product.name} to cart`, {
      description: `${product.flavor} flavor`,
      position: "bottom-right",
    });
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 h-full ${
        isHovered ? "shadow-lg transform scale-[1.02]" : "shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="p-4 w-full">
            <p className="text-white font-medium truncate">
              {product.flavor} Flavor
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-4 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <span className="font-semibold text-berry">
            ₹{product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-muted-foreground text-sm mb-4 flex-grow">
          {product.description}
        </p>

        <Button
          onClick={handleAddToCart}
          className={`w-full transition-all duration-300 ${
            isHovered
              ? "bg-primary text-white"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
