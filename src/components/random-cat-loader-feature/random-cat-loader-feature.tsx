import React, { useEffect, useState } from "react";
import axios from "axios";

const CatImageFetcher: React.FC = () => {
  const [catImage, setCatImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Функция для загрузки случайного изображения котика
  const fetchCatImage = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      setCatImage(response.data[0].url);
    } catch (error) {
      console.error("Error fetching cat image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Загрузка первого изображения при монтировании компонента
  useEffect(() => {
    fetchCatImage();
  }, []);

  return (
    <div
      onClick={fetchCatImage}
      className="mt-2 w-full h-[100vw] bg-white shadow-md rounded-lg overflow-hidden flex flex-col cursor-pointer relative"
    >
      {/* Контейнер для изображения */}
      <div className="flex-grow flex justify-center items-center">
        {isLoading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <img
            src={catImage}
            alt="Random Cat"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {/* Заголовок */}
      <div className="absolute bottom-0 left-0 w-full text-center text-sm text-gray-950 p-1 bg-white bg-opacity-40 z-10">
        Paw for cats
      </div>
    </div>
  );
};

export default CatImageFetcher;
