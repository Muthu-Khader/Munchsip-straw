import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [animateTotal, setAnimateTotal] = useState(false);
  const navigate = useNavigate();

  // Animate total price whenever it changes
  useEffect(() => {
    setAnimateTotal(true);
    const timer = setTimeout(() => {
      setAnimateTotal(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [totalPrice]);

  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link
              to="/products"
              className="text-muted-foreground hover:text-primary flex items-center transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold ml-auto">Your Cart</h1>
          </div>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium text-muted-foreground">
                      <div className="col-span-6">Product</div>
                      <div className="col-span-2 text-center">Price</div>
                      <div className="col-span-2 text-center">Quantity</div>
                      <div className="col-span-2 text-right">Total</div>
                    </div>

                    <div className="divide-y">
                      {cart.map((item, index) => (
                        <div
                          key={item.product.id}
                          className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-slide-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {/* Product info */}
                          <div className="col-span-6 flex items-center">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4 flex flex-col">
                              <h3 className="font-medium">
                                {item.product.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {item.product.flavor} Flavor
                              </p>
                              <button
                                className="text-berry hover:text-berry/80 text-sm mt-2 flex items-center md:hidden"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="md:col-span-2 md:text-center">
                            <div className="flex justify-between items-center md:block">
                              <span className="md:hidden">Price:</span>
                              <span>₹{item.product.price.toFixed(2)}</span>
                            </div>
                          </div>

                          {/* Quantity */}
                          <div className="md:col-span-2 md:text-center">
                            <div className="flex justify-between items-center md:justify-center">
                              <span className="md:hidden">Quantity:</span>
                              <div className="flex items-center border rounded-md">
                                <button
                                  className="px-2 py-1 text-muted-foreground hover:text-foreground"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="px-4 py-1 border-x">
                                  {item.quantity}
                                </span>
                                <button
                                  className="px-2 py-1 text-muted-foreground hover:text-foreground"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Total price */}
                          <div className="md:col-span-2 md:text-right">
                            <div className="flex justify-between items-center md:block">
                              <span className="md:hidden">Total:</span>
                              <span className="font-medium">
                                ₹
                                {(item.product.price * item.quantity).toFixed(
                                  2
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Remove button (desktop) */}
                          <button
                            className="hidden md:flex items-center justify-center text-muted-foreground hover:text-berry"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₹{(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 mt-4">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span
                          className={`text-lg text-primary transition-transform ${
                            animateTotal ? "scale-110" : "scale-100"
                          }`}
                        >
                          ₹{(totalPrice + totalPrice * 0.1).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 py-6"
                    onClick={handleProceedToPayment}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-10 text-center animate-fade-in">
              <img
                src="https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&q=80&w=300"
                alt="Empty Cart"
                className="mx-auto h-48 w-48 object-cover rounded-full mb-6"
              />
              <h2 className="text-2xl font-semibold mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any straws to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
