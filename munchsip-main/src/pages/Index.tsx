import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SplashScreen from "@/components/SplashScreen";
import AnimatedText from "@/components/AnimatedText";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [animatedElements, setAnimatedElements] = useState({
    benefits: false,
    testimonials: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === benefitsRef.current) {
              setAnimatedElements((prev) => ({ ...prev, benefits: true }));
            } else if (entry.target === testimonialRef.current) {
              setAnimatedElements((prev) => ({ ...prev, testimonials: true }));
            }
            // Once triggered, no need to observe anymore
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when at least 20% of element is visible
      }
    );

    if (benefitsRef.current) observer.observe(benefitsRef.current);
    if (testimonialRef.current) observer.observe(testimonialRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const benefits = [
    {
      title: "100% Edible",
      description:
        "Made from natural ingredients, our straws are completely safe to eat after use.",
      icon: "🌱",
    },
    {
      title: "Zero Waste",
      description:
        "No more plastic waste. Everything is consumed or biodegradable.",
      icon: "♻️",
    },
    {
      title: "Fun & Tasty",
      description:
        "Available in multiple flavors that complement your favorite drinks.",
      icon: "🍓",
    },
  ];

  const testimonials = [
    {
      name: "Ranjith A",
      role: "Eco-Conscious Consumer",
      content:
        "MunchSip straws made me realize going green doesn't mean sacrificing fun. My kids love the strawberry flavor!",
      image: "img/ranjith.jpg",
    },
    {
      name: "Sagar",
      role: "Café Owner",
      content:
        "Our customers absolutely love these straws. They're not only environmentally friendly but also add a unique touch to our drinks.",
      image: "img/sagar.jpg",
    },
    {
      name: "Nalan",
      role: "Environmental Enthusiast",
      content:
        "Finally, a sustainable alternative to plastic straws that actually works well and tastes good. MunchSip is leading the eco-revolution!",
      image: "img/nalan.jpg",
    },
  ];

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <div
        className={`transition-opacity duration-500 ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header />

        {/* Hero Section */}
        <section className="min-h-screen relative flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="/img/home.jpg"
              alt="MunchSip straws in drinks"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 z-10 pt-24">
            <div className="max-w-lg text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-2">
                <span className="block mb-2">Sip.</span>
                <span className="block mb-2">Enjoy.</span>
                <span className="block text-secondary">Eat Your Straw.</span>
              </h1>

              <p className="text-xl my-6">
                MunchSip offers{" "}
                <AnimatedText
                  phrases={["Tasty", "Eco-Friendly", "Biodegradable"]}
                  className="font-semibold text-mint"
                />{" "}
                straws for a sustainable future.
              </p>

              <div className="space-x-4 mt-8">
                <Link to="/products">
                  <Button className="text-base px-6 py-6 bg-primary hover:bg-primary/80 shadow-lg">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    className="text-base px-6 py-6 border-white bg-primary text-white hover:bg-white/20"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-white" ref={benefitsRef}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why MunchSip?{" "}
              <span className="text-primary">
                The Tasty Way to Save Our Planet
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={`bg-muted p-6 rounded-lg shadow-md transition-all duration-500 delay-${
                    index * 200
                  } ${
                    animatedElements.benefits
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Preview */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
                Featured Flavors
              </h2>
              <Link to="/products">
                <Button variant="secondary" className="flex items-center">
                  View All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  id: "1",
                  name: "Vanilla Sip (10 pcs)",
                  price: 150.0,
                  flavor: "vanilla flavor",
                  description:
                    "Sweet and creamy, our vanilla straw adds a smooth twist to your drink—then you can eat it!",
                  image: "img/vanilla.jpg",
                },
                {
                  id: "2",
                  name: "Strawberry Twist (10 pcs)",
                  price: 200.0,
                  flavor: "strawberry flavor",
                  description:
                    "Sweet and fruity edible straw with real strawberry flavor—perfect for a tasty sip!",
                  image: "img/strawberry.jpg",
                },
              ].map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-slide-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg hover:scale-[1.02] duration-300">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{product.name}</h3>
                        <span className="font-semibold text-berry">
                          ₹{product.price}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        {product.description}
                      </p>
                      <Link to={`/products`}>
                        <Button className="w-full">Shop Now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-white" ref={testimonialRef}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Our Customers Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className={`bg-muted p-6 rounded-lg shadow-md transition-all duration-500 delay-${
                    index * 200
                  } ${
                    animatedElements.testimonials
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="italic text-foreground">
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/products">
                <Button className="px-6 py-6">
                  Try MunchSip Today <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Index;
