import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No results available.</p>;

  const { score, results, total } = state;
  const highScore = localStorage.getItem("highScore") || 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-4">
          You scored {score}/{total}
        </h2>
        <p className="mb-4">🏆 High Score: {highScore}</p>

        <div className="text-left max-h-[200px] overflow-y-auto mb-4">
          {results.map((r, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg mb-2 ${
                r.isCorrect ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <p dangerouslySetInnerHTML={{ __html: r.question }} />
              <p>
                <strong>Your Answer:</strong>{" "}
                <span dangerouslySetInnerHTML={{ __html: r.selected }} />
              </p>
              {!r.isCorrect && (
                <p>
                  <strong>Correct:</strong>{" "}
                  <span dangerouslySetInnerHTML={{ __html: r.correct }} />
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
