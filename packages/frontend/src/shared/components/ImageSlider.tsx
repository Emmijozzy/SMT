import { useCallback, useEffect, useState } from "react";

interface ImageSliderProps {
  images: string[];
}

function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, handleNext]);

  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-lg">
      {/* Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image) => (
          <div
            key={image}
            className="w-full h-[40rem] flex-shrink-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 hidden"
      >
        &#8592;
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 hidden"
      >
        &#8594;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-2 hidden">
        {images.map((_, index) => (
          <button
            key={_}
            type="button"
            aria-label="Slide Indicator"
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full bg-white transition-opacity duration-300 ${
              currentIndex === index ? "opacity-100" : "opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
