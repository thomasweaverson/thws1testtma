import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./cat-image-fetcher.css"; // Подключаем CSS для анимаций
import CatLoader from "../loader/cat-loader"; // Импортируем компонент лоадера

function CatImageFetcher(): JSX.Element {
  const [catImages, setCatImages] = useState<string[]>([]); // Массив для хранения загруженных изображений
  const [currentImage, setCurrentImage] = useState<string>(""); // Текущее изображение
  const [nextImage, setNextImage] = useState<string>(""); // Следующее изображение
  const [isLoading, setIsLoading] = useState<boolean>(true); // Состояние загрузки
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // Состояние анимации
  const [showClickHint, setShowClickHint] = useState<boolean>(true); // Показывать ли подсказку о клике

  // Функция для загрузки случайного изображения котика
  const fetchCatImage = async (): Promise<string | null> => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      return response.data[0].url; // Возвращаем URL изображения
    } catch (error) {
      console.error("Error fetching cat image:", error);
      return null;
    }
  };

  // Функция для предварительной загрузки изображений
  const preloadCatImages = useCallback(async (count: number) => {
    const images: string[] = [];
    for (let i = 0; i < count; i++) {
      const imageUrl = await fetchCatImage();
      if (imageUrl) {
        images.push(imageUrl);
      }
    }
    setCatImages((prevImages) => [...prevImages, ...images]); // Добавляем новые изображения
    setIsLoading(false); // Загрузка завершена
  }, []);

  // Загрузка первых 5 изображений при монтировании компонента
  useEffect(() => {
    preloadCatImages(5); // Предварительно загружаем 5 изображений
  }, [preloadCatImages]); // Добавляем preloadCatImages в зависимости

  // Автоматическая подгрузка новых изображений, когда остается мало
  useEffect(() => {
    if (catImages.length < 4 && !isLoading) {
      setIsLoading(true);
      preloadCatImages(5); // Подгружаем еще 5
    }
  }, [catImages.length, isLoading, preloadCatImages]); // Добавляем preloadCatImages в зависимости

  // Устанавливаем текущее и следующее изображение при изменении catImages
  useEffect(() => {
    if (catImages.length > 0) {
      setCurrentImage(catImages[0]);
      if (catImages.length > 1) {
        setNextImage(catImages[1]);
      }
    }
  }, [catImages]);

  // Обработчик клика для показа следующего изображения
  const handleClick = async () => {
    if (catImages.length === 0) return; // Если изображений нет, ничего не делаем

    // Скрываем подсказку о клике после первого клика
    if (showClickHint) {
      setShowClickHint(false);
    }

    // Запускаем анимацию
    setIsAnimating(true);

    // Ждем завершения анимации (0.5 секунды)
    setTimeout(() => {
      // Удаляем первое изображение из массива (оно уже показано)
      setCatImages((prevImages) => prevImages.slice(1));
      setIsAnimating(false); // Завершаем анимацию
    }, 500); // Длительность анимации
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
        {isLoading || catImages.length === 0 ? (
          <CatLoader />
        ) : (
          <>
            {/* Текущее изображение (затухает) */}
            {currentImage && (
              <img
                src={currentImage}
                alt="Random Cat"
                className={`w-full h-full object-cover absolute top-0 left-0 ${
                  isAnimating ? "fade-out" : ""
                }`}
              />
            )}
            {/* Следующее изображение (появляется) */}
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
      {/* Подсказка о клике (иконка руки) */}
      {showClickHint && (
        <div className="absolute bottom-10 right-4 transform -translate-x-1/2 -translate-y-1/2 click-hint text-5xl">
          <span className=" custom-rotate-15">👆</span>
        </div>
      )}
    </div>
  );
}

export default CatImageFetcher;
