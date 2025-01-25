import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./cat-image-fetcher.css";
import CatLoader from "../loader/cat-loader";

function CatImageFetcher(): JSX.Element {
  const [catImages, setCatImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [nextImage, setNextImage] = useState<string>("");
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showClickHint, setShowClickHint] = useState<boolean>(true);

  const fetchCatImage = async (): Promise<string | null> => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      return response.data[0].url;
    } catch (error) {
      console.error("Error fetching cat image:", error);
      return null;
    }
  };

  const preloadCatImages = useCallback(async (count: number) => {
    const images: string[] = [];
    for (let i = 0; i < count; i++) {
      const imageUrl = await fetchCatImage();
      if (imageUrl) {
        images.push(imageUrl);
      }
    }
    setCatImages((prevImages) => [...prevImages, ...images]);
  }, []);

  useEffect(() => {
    preloadCatImages(5);
  }, [preloadCatImages]);

  useEffect(() => {
    if (catImages.length < 4 && !isFetchingMore) {
      setIsFetchingMore(true);
      preloadCatImages(5).then(() => setIsFetchingMore(false));
    }
  }, [catImages.length, isFetchingMore, preloadCatImages]);

  useEffect(() => {
    if (catImages.length > 0) {
      setCurrentImage(catImages[0]);
      if (catImages.length > 1) {
        setNextImage(catImages[1]);
      }
    }
  }, [catImages]);

  const handleClick = async () => {
    if (catImages.length === 0) return;

    if (showClickHint) {
      setShowClickHint(false);
    }

    setIsAnimating(true);

    setTimeout(() => {
      setCatImages((prevImages) => prevImages.slice(1));
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div
      onClick={handleClick}
      className="mt-2 w-full h-[100vw] bg-white shadow-md rounded-lg overflow-hidden flex flex-col cursor-pointer relative"
    >
      <div className="absolute bottom-0 left-0 w-full text-center text-sm text-gray-950 p-1 bg-white bg-opacity-40 z-10">
        Paw for cats
      </div>
      <div className="flex-grow flex justify-center items-center relative">
        {catImages.length === 0 ? (
          <CatLoader />
        ) : (
          <>
            {currentImage && (
              <img
                src={currentImage}
                alt="Random Cat"
                className={`w-full h-full object-cover absolute top-0 left-0 ${
                  isAnimating ? "fade-out" : ""
                }`}
              />
            )}
            {nextImage && (
              <img
                src={nextImage}
                alt="Random Cat"
                className={`w-full h-full object-cover absolute top-0 left-0 ${
                  isAnimating ? "fade-in" : "opacity-0"
                }`}
              />
            )}
          </>
        )}
      </div>
      {isFetchingMore && catImages.length !== 0 && (
        <div className="absolute bottom-2 right-2 p-1 bg-gray-200 rounded-full">
          <CatLoader small />
        </div>
      )}
      {showClickHint && (
        <div className="absolute bottom-10 right-4 transform -translate-x-1/2 -translate-y-1/2 click-hint text-5xl">
          <span className=" custom-rotate-15">👆</span>
        </div>
      )}
    </div>
  );
}

export default CatImageFetcher;
