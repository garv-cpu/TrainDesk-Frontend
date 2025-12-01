import { useEffect, useRef, useState } from "react";

export default function Slider() {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const images = [
    "traindesk_admin_dashboard.png",
    "traindesk_admin_SOPs_dashboard.png",
    "traindesk_employee_dashboard.png",
  ];

  const totalSlides = images.length;

  const goToSlide = (index) => {
    if (sliderRef.current && containerRef.current) {
      const slideWidth = containerRef.current.clientWidth;
      sliderRef.current.style.transform = `translateX(-${index * slideWidth}px)`;
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const resetAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 3500);
  };

  // Updates the slide width whenever the slide index changes
  useEffect(() => {
    goToSlide(currentSlide);
  }, [currentSlide]);

  // Auto-slide and handle resizing
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 3500);

    const handleResize = () => goToSlide(currentSlide);
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full gap-2 sm:gap-4 mt-10">

      {/* Prev Button */}
      <button
        onClick={() => {
          prevSlide();
          resetAutoSlide();
        }}
        className="
          p-2 sm:p-3 
          bg-black/30 hover:bg-black/50 
          rounded-full 
          transition
          active:scale-90
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Slider Container */}
      <div
        ref={containerRef}
        className="
          w-full 
          max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl
          overflow-hidden 
          rounded-xl shadow-md
        "
      >
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={() => {
          nextSlide();
          resetAutoSlide();
        }}
        className="
          p-2 sm:p-3 
          bg-black/30 hover:bg-black/50 
          rounded-full 
          transition
          active:scale-90
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
