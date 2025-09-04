import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz", { state: { difficulty } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">🎯 Quiz App</h1>
        <p className="mb-4">Select difficulty level:</p>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border p-2 rounded-lg mb-4"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={startQuiz}
          className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
