import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import diasporaLeader1 from '@/assets/diaspora-leader-1.jpg';
import diasporaLeader2 from '@/assets/diaspora-leader-2.jpg';
import diasporaLeader3 from '@/assets/diaspora-leader-3.jpg';
import diasporaLeader4 from '@/assets/diaspora-leader-4.jpg';

const leaders = [
  {
    id: 1,
    image: diasporaLeader1,
    name: "Priya Sharma",
    title: "Founder & CEO, TechVenture Solutions",
    background: "South Asian Diaspora",
    achievement: "Raised £5M Series A funding for AI healthcare platform"
  },
  {
    id: 2,
    image: diasporaLeader2,
    title: "Co-Founder, InnovateTech Hub",
    background: "African Diaspora", 
    achievement: "Built Africa's largest fintech accelerator program"
  },
  {
    id: 3,
    image: diasporaLeader3,
    name: "Sofia Martinez",
    title: "Founder, GreenImpact Ventures",
    background: "Caribbean Diaspora",
    achievement: "Leading sustainable business transformation in Latin America"
  },
  {
    id: 4,
    image: diasporaLeader4,
    name: "Amara Hassan",
    title: "CEO, CleanTech Innovations",
    background: "Middle Eastern Diaspora",
    achievement: "Pioneer in renewable energy solutions for emerging markets"
  }
];

const DiasporaLeadersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % leaders.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % leaders.length);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + leaders.length) % leaders.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-flow-dark mb-4">
            Inspiring
            <span className="bg-gradient-primary bg-clip-text text-transparent ml-2">
              Diaspora Leaders
            </span>
          </h2>
          <p className="text-lg text-flow-grey max-w-2xl mx-auto">
            Celebrating the achievements of underrepresented founders and female entrepreneurs 
            who are building businesses that change the world.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main carousel container */}
          <div className="relative overflow-hidden rounded-2xl shadow-glow">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {leaders.map((leader, index) => (
                <div key={leader.id} className="min-w-full relative">
                  <div className="relative h-[500px] lg:h-[600px]">
                    <img
                      src={leader.image}
                      alt={`${leader.name} - ${leader.background} business leader`}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
                      <div className="max-w-2xl">
                        <div className="inline-block px-4 py-2 bg-flow-teal/90 rounded-full text-sm font-semibold mb-4">
                          {leader.background}
                        </div>
                        {leader.name && (
                          <h3 className="text-3xl lg:text-4xl font-black mb-2">
                            {leader.name}
                          </h3>
                        )}
                        <p className="text-xl lg:text-2xl font-medium mb-4 text-white/90">
                          {leader.title}
                        </p>
                        <p className="text-lg text-white/80 leading-relaxed">
                          {leader.achievement}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="glass"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 w-12 h-12"
            onClick={goToPrev}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 w-12 h-12"
            onClick={goToNext}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {leaders.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-flow-teal scale-125' 
                    : 'bg-flow-grey/30 hover:bg-flow-grey/50'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-flow-grey mb-6">
            Ready to join these inspiring leaders in building the future?
          </p>
          <Button variant="hero" size="lg" className="shadow-glow">
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiasporaLeadersCarousel;