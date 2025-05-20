import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Wallet } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Payment = () => {
  const { totalItems, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate("/success");
    }, 1500);
  };

  if (totalItems === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate("/cart")}
              className="text-muted-foreground hover:text-primary flex items-center transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Cart
            </button>
            <h1 className="text-3xl font-bold ml-auto">Payment</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <form onSubmit={handlePayment}>
                    {/* Customer details */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-4">
                        Customer Information
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" required />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="123-456-7890"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shipping address */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-4">
                        Shipping Address
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input
                            id="address"
                            placeholder="123 Main St"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" required />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="NY" required />
                        </div>
                        <div>
                          <Label htmlFor="zipcode">Zip Code</Label>
                          <Input id="zipcode" placeholder="10001" required />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            placeholder="United States"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment method */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4">
                        Payment Method
                      </h2>

                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="space-y-4"
                      >
                        <div
                          className={`flex items-center border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors ${
                            paymentMethod === "card"
                              ? "border-primary bg-primary/5"
                              : ""
                          }`}
                          onClick={() => setPaymentMethod("card")}
                        >
                          <RadioGroupItem
                            value="card"
                            id="card"
                            className="mr-3"
                          />
                          <Label
                            htmlFor="card"
                            className="flex items-center cursor-pointer"
                          >
                            <CreditCard className="h-5 w-5 mr-2" />
                            Credit / Debit Card
                          </Label>
                        </div>

                        <div
                          className={`flex items-center border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors ${
                            paymentMethod === "wallet"
                              ? "border-primary bg-primary/5"
                              : ""
                          }`}
                          onClick={() => setPaymentMethod("wallet")}
                        >
                          <RadioGroupItem
                            value="wallet"
                            id="wallet"
                            className="mr-3"
                          />
                          <Label
                            htmlFor="wallet"
                            className="flex items-center cursor-pointer"
                          >
                            <Wallet className="h-5 w-5 mr-2" />
                            Digital Wallet
                          </Label>
                        </div>
                      </RadioGroup>

                      {/* Card details */}
                      {paymentMethod === "card" && (
                        <div className="mt-4 pt-4 border-t animate-fade-in">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input
                                id="cardName"
                                placeholder="John Doe"
                                required
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" required />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" required />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Wallet options */}
                      {paymentMethod === "wallet" && (
                        <div className="mt-4 pt-4 border-t animate-fade-in">
                          <div className="flex space-x-4">
                            <div className="flex-1 border rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                              <span className="flex items-center font-medium">
                                Google Pay
                              </span>
                            </div>
                            <div className="flex-1 border rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                              <span className="flex items-center font-medium">
                                PayTM
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items ({totalItems})</span>
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
                      <span className="text-lg text-primary">
                        ₹{(totalPrice + totalPrice * 0.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6 py-6"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Pay Now"
                  )}
                </Button>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Your payment is secure and encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
