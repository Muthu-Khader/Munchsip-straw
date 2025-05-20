import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type SplashScreenProps = {
  onComplete: () => void;
};

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auto transition after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onComplete, 100); // Small delay for fade out animation
    }, 200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsLoading(false);
    setTimeout(onComplete, 100); // Small delay for fade out animation
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-64 h-64 flex items-center justify-center mb-8">
        {/* Replace with actual logo */}
        <div className="text-5xl font-bold text-white font-poppins">
          MunchSip
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={handleSkip}
        className="absolute bottom-8 text-white hover:bg-primary/20"
      >
        Skip
      </Button>
    </div>
  );
};

export default SplashScreen;
