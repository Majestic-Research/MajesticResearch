import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Interface for carousel props
interface CarouselProps {
  images: string[];
  mini: boolean
}

// CustomCarousel component
const CustomCarousel: React.FC<CarouselProps> = ({ images, mini}) => {
  const [width, setWidth] = useState<number | null>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  var clasNameCarousel: string = ''
  var clasNameImage: string = ''
  

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    maxWidth();
  };

  const maxWidth = () => {
    const img = new Image();
    img.src = images[currentSlide];
    setWidth(Math.round((img.width / img.height) * 384));
  };
  mini ? clasNameCarousel = 'max-w-xs' : clasNameCarousel = 'max-w-[560px]'
  mini ? clasNameImage = 'max-h-56 object-contain' : clasNameImage = 'max-h-80 object-contain'

  return (
    <Carousel
      className={clasNameCarousel}
      showThumbs={false}
      showArrows={true}
      infiniteLoop={true}
      useKeyboardArrows={true}
      centerSlidePercentage={100}
      onChange={handleSlideChange}
      dynamicHeight={true}
      showStatus={false} 
      renderArrowPrev={(clickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            onClick={clickHandler}
            title={label}
            className='absolute p-2 rounded-full mx-1 left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 hover:bg-gray-800 hover:text-white transition duration-300'
          >
            {"<"}
          </button>
        )
      }
      renderArrowNext={(clickHandler, hasNext, label) =>
        hasNext && (
          <button
            onClick={clickHandler}
            title={label}
            className='absolute p-2 rounded-full mx-1 right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 hover:bg-gray-800 hover:text-white transition duration-300'
          >
            {">"}
          </button>
        )
      }
    >
      {images.map((image, index) => (
        <div key={index}>
          <img
            className={clasNameImage}
            src={image}
            alt={`Image ${index}`}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
