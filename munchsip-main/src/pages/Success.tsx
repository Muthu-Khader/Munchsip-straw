
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Success = () => {
  const [progressStage, setProgressStage] = useState(0);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Create confetti elements
    const container = document.querySelector('#confetti-container');
    if (container) {
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('absolute');
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.backgroundColor = ['#22c55e', '#60a5fa', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)];
        confetti.style.top = '0';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.opacity = '1';
        confetti.style.transform = 'translateY(0)';
        confetti.style.animation = `confetti ${Math.random() * 2 + 2}s ease-in-out forwards`;
        confetti.style.animationDelay = `${Math.random()}s`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        container.appendChild(confetti);
      }
    }
    
    // Animate progress
    setAnimate(true);
    
    const timer1 = setTimeout(() => {
      setProgressStage(1);
    }, 1000);
    
    const timer2 = setTimeout(() => {
      setProgressStage(2);
    }, 2000);
    
    const timer3 = setTimeout(() => {
      setProgressStage(3);
    }, 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  
  const progressSteps = [
    { name: "Order Confirmed", description: "We've received your order" },
    { name: "Processing", description: "Preparing your straws" },
    { name: "Shipping", description: "Your package is on its way" },
    { name: "Delivery", description: "Estimated arrival: 3-5 days" }
  ];
  
  return (
    <div className="min-h-screen flex flex-col relative">
      <div id="confetti-container" className="absolute inset-0 overflow-hidden pointer-events-none z-50"></div>
      
      <Header />
      
      <main className="flex-grow pt-24 pb-16 flex flex-col items-center justify-center">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className={`bg-success text-white rounded-full p-4 shadow-lg transition-all duration-500 ${
                animate ? 'scale-100' : 'scale-0'
              }`}>
                <CheckCircle className="h-12 w-12" />
              </div>
            </div>
            
            <div className="text-center mt-10">
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 transition-all duration-700 ${
                animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
              }`}>
                Thank You! Your Sip is on its Way 🍓
              </h1>
              <p className={`text-muted-foreground text-lg mb-8 transition-all duration-700 delay-300 ${
                animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
              }`}>
                We've received your order and are processing it right away.
              </p>
            </div>
            
            {/* Progress tracker */}
            <div className={`mb-10 transition-all duration-700 delay-500 ${
              animate ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="relative">
                {/* Progress line */}
                <div className="absolute top-5 left-6 right-6 h-1 bg-muted">
                  <div 
                    className="absolute h-full bg-success transition-all duration-1000" 
                    style={{ width: `${(progressStage / (progressSteps.length - 1)) * 100}%` }}
                  ></div>
                </div>
                
                {/* Steps */}
                <div className="flex justify-between relative">
                  {progressSteps.map((step, index) => (
                    <div key={step.name} className="flex flex-col items-center relative">
                      <div className={`rounded-full w-10 h-10 flex items-center justify-center z-10 transition-all duration-500 ${
                        index <= progressStage 
                          ? 'bg-success text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index <= progressStage ? <Check className="h-5 w-5" /> : index + 1}
                      </div>
                      <div className="mt-3 text-center">
                        <div className="font-medium">{step.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className={`border-t pt-6 transition-all duration-700 delay-700 ${
              animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}>
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-muted-foreground text-sm">Order Number</div>
                  <div className="font-medium">#MS1234567</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Order Date</div>
                  <div className="font-medium">{new Date().toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/products">
                  <Button 
                    size="lg" 
                    className={`transition-all duration-700 delay-1000 ${
                      animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    Continue Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <style jsx global>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0);
            opacity: 1;
          }
          100% {
            transform: translateY(1000px) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Success;
