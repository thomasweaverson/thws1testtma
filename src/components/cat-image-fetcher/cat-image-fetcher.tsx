import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./cat-image-fetcher.css";
import CatLoader from "../loader/cat-loader";
import { useUserContext } from "../../context/use-user-context";

// Константы для настройки
const INITIAL_PRELOAD_COUNT = 5;
const PRELOAD_THRESHOLD = 4;
const PRELOAD_BATCH_SIZE = 5;
const ANIMATION_DURATION = 500;

function CatImageFetcher(): JSX.Element {
  const { incrementCatPoints } = useUserContext();
  const [catImages, setCatImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [nextImage, setNextImage] = useState<string>("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showClickHint, setShowClickHint] = useState(true);

  const fetchCatImage = useCallback(async (): Promise<string | null> => {
    try {
      const response = await axios.get("https://api.thecatapi.com/v1/images/search");
      return response.data[0].url;
    } catch (error) {
      console.error("Error fetching cat image:", error);
      return null;
    }
  }, []);

  const preloadCatImages = useCallback(async (count: number) => {
    const requests = Array.from({ length: count }, () => fetchCatImage());
    const results = await Promise.all(requests);
    const newImages = results.filter((url): url is string => Boolean(url));

    setCatImages(prev => [...prev, ...newImages]);
  }, [fetchCatImage]);

  const updateDisplayImages = useCallback(() => {
    if (catImages.length > 0) {
      setCurrentImage(catImages[0]);
      setNextImage(catImages[1] || "");
    }
  }, [catImages]);

  const handleImageTransition = useCallback(() => {
    setIsAnimating(true);

    const animationDuration = ANIMATION_DURATION / 1000; // Convert to seconds
    const startTime = performance.now();

    function step(timestamp: number) {
      const elapsedTime = (timestamp - startTime) / 1000;

      if (elapsedTime < animationDuration) {
        requestAnimationFrame(step);
      } else {
        setCatImages(prev => {
          const newImages = prev.slice(1);
          updateDisplayImages(); // Ensure display images are updated
          return newImages;
        });
        setIsAnimating(false);
      }
    }

    requestAnimationFrame(step);
  }, [updateDisplayImages]);

  // Эффекты
  useEffect(() => {
    preloadCatImages(INITIAL_PRELOAD_COUNT);
  }, [preloadCatImages]);

  useEffect(() => {
    updateDisplayImages();
  }, [catImages, updateDisplayImages]);

  useEffect(() => {
    if (catImages.length < PRELOAD_THRESHOLD && !isFetchingMore) {
      setIsFetchingMore(true);
      preloadCatImages(PRELOAD_BATCH_SIZE).finally(() => setIsFetchingMore(false));
    }
  }, [catImages.length, isFetchingMore, preloadCatImages]);

  // Обработчики событий
  const handleClick = () => {
    if (catImages.length === 0 || isAnimating) return;

    setShowClickHint(false);
    handleImageTransition();
    incrementCatPoints();
  };

  return (
    <div
      onClick={handleClick}
      className="cat-image-container"
      role="button"
      aria-label="View next cat"
    >
      {showClickHint && <div className="watermark">
        Paw for cats
      </div>}
      <div className="image-wrapper">
        {!catImages.length ? (
          <CatLoader />
        ) : (
          <>
            <ImageWithAnimation
              src={currentImage}
              animationClass={isAnimating ? "fade-out" : ""}
            />
            <ImageWithAnimation
              src={nextImage}
              animationClass={isAnimating ? "fade-in" : "opacity-0"}
            />
          </>
        )}
      </div>
      {isFetchingMore && (
        <div className="loader-indicator">
          <CatLoader small />
        </div>
      )}
      {showClickHint && <ClickHint />}
    </div>
  );
}

// Вспомогательные компоненты
const ImageWithAnimation = ({
  src,
  animationClass
}: {
  src: string;
  animationClass: string;
}) => (
  <img
    src={src}
    alt="Random Cat"
    className={`cat-image ${animationClass}`}
    loading="lazy"
  />
);

const ClickHint = () => (
  <div className="click-hint">
    <span className="animated-emoji">👆</span>
  </div>
);

export default CatImageFetcher;