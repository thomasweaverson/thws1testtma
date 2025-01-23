import { useState } from "react";
import axios from "axios";

type CardProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
} | null;
function Card(): JSX.Element {
  const [cardData, setCardData] = useState<CardProps>(null);

  const fetchData = async () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${randomNumber}`
    );
    setCardData(response.data);
  };

  return (
    <div>
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        onClick={fetchData}
      >
        Загрузить карточку
      </button>
      {cardData && (
        <div className="mt-4 p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-bold">{cardData.title}</h2>
          <p>{cardData.body}</p>
          <p>Author ID: {cardData.userId}</p>
          <p>Post ID: {cardData.id}</p>
        </div>
      )}
    </div>
  );
}

export default Card;
