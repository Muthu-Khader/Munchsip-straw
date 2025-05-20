import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product } from "@/context/CartContext";

// Sample product data
const productData: Product[] = [
  {
    id: "1",
    name: "Vanilla Sip (10 pcs)",
    price: 150.0,
    flavor: "Vanilla",
    description:
      "Sweet and creamy, our vanilla straw adds a smooth twist to your drink—then you can eat it!",
    image: "img/vanilla.jpg",
  },
  {
    id: "2",
    name: "Strawberry Twist (10 pcs)",
    price: 200.0,
    flavor: "Strawberry",
    description:
      "Sweet and fruity edible straw with real strawberry flavor—perfect for a tasty sip!",
    image: "img/strawberry.jpg",
  },
];

// Flavor options
const flavors = ["All", "Vanilla", "Strawberry"];

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFlavor, setSelectedFlavor] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading products
  useEffect(() => {
    setTimeout(() => {
      setProducts(productData);
      setFilteredProducts(productData);
      setLoading(false);
    }, 800);
  }, []);

  // Apply filters when they change
  useEffect(() => {
    let result = products;

    // Apply flavor filter
    if (selectedFlavor !== "All") {
      result = result.filter((product) => product.flavor === selectedFlavor);
    }

    // Apply price filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(result);
  }, [selectedFlavor, priceRange, products]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          {/* Page header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Our Products</h1>
              <p className="text-muted-foreground mt-2">
                Discover our range of delicious, eco-friendly straws
              </p>
            </div>

            <Button
              variant="outline"
              className="flex items-center mt-4 md:mt-0 md:ml-4"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter Products
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - desktop */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-muted p-6 rounded-lg sticky top-28">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>

                {/* Flavor filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Flavor</h3>
                  <div className="space-y-2">
                    {flavors.map((flavor) => (
                      <div key={flavor} className="flex items-center">
                        <Button
                          variant={
                            selectedFlavor === flavor ? "default" : "ghost"
                          }
                          className={`w-full justify-start text-sm h-8 px-3 ${
                            selectedFlavor === flavor
                              ? "bg-primary text-primary-foreground"
                              : ""
                          }`}
                          onClick={() => setSelectedFlavor(flavor)}
                        >
                          {flavor}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 250]}
                      min={0}
                      max={250}
                      step={1}
                      value={priceRange}
                      onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      className="mb-6"
                    />
                    <div className="flex justify-between text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile filters */}
            {mobileFiltersOpen && (
              <div className="md:hidden bg-muted p-4 rounded-lg mb-6 animate-fade-in">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Flavor</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {flavors.map((flavor) => (
                      <Button
                        key={flavor}
                        variant={
                          selectedFlavor === flavor ? "default" : "outline"
                        }
                        className="text-sm h-8"
                        onClick={() => setSelectedFlavor(flavor)}
                      >
                        {flavor}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-2">
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 250]}
                      min={0}
                      max={250}
                      step={1}
                      value={priceRange}
                      onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product grid */}
            <div className="flex-grow">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-muted rounded-lg overflow-hidden h-80 animate-pulse"
                      >
                        <div className="h-48 bg-muted-foreground/20"></div>
                        <div className="p-4">
                          <div className="h-4 bg-muted-foreground/20 rounded w-2/3 mb-2"></div>
                          <div className="h-4 bg-muted-foreground/20 rounded w-1/4 mb-4"></div>
                          <div className="h-4 bg-muted-foreground/20 rounded w-full mb-2"></div>
                          <div className="h-8 bg-muted-foreground/20 rounded w-full mt-4"></div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-slide-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-xl font-medium mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to find what you're looking for
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedFlavor("All");
                      setPriceRange([0, 250]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
