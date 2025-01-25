import Lottie from "lottie-react";
import lottieLoaderAnimation from "./lottie-loader-animation.json"; // Импортируем JSON с анимацией

type CatLoaderProps = {
  small?: boolean;
};

function CatLoader( { small }: CatLoaderProps): JSX.Element {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Lottie
        animationData={lottieLoaderAnimation} // Передаем анимацию
        loop={true} // Анимация будет повторяться
        style={{ width: small ? 100 : 200, height: small ? 100 : 200 }} // Размер анимации
      />
    </div>
  );
};

export default CatLoader;
