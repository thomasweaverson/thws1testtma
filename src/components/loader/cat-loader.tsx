import Lottie from "lottie-react";
import lottieLoaderAnimation from "./lottie-loader-animation.json"; // Импортируем JSON с анимацией

const CatLoader: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Lottie
        animationData={lottieLoaderAnimation} // Передаем анимацию
        loop={true} // Анимация будет повторяться
        style={{ width: 150, height: 150 }} // Размер анимации
      />
    </div>
  );
};

export default CatLoader;
