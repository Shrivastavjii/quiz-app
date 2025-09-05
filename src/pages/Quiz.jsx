import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [results, setResults] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const difficulty = location.state?.difficulty || "easy";

    //  Function to format questions from The Trivia API
    const formatQuestions = (data) => {
        return data.map((q, index) => {
            const options = [...q.incorrectAnswers, q.correctAnswer].sort(
                () => Math.random() - 0.5
            );
            return {
                id: index,
                question: q.question.text,
                options,
                correct: q.correctAnswer,
            };
        });
    };

    //  Next Question / Submit logic wrapped in useCallback
    // This is good practice to prevent `handleNext` from being recreated on every render
    const handleNext = useCallback(() => {
        const currentQ = questions[currentIndex];
        const isCorrect = selected === currentQ?.correct;

        // If no answer was selected, mark it as incorrect
        const newResult = {
            question: currentQ.question,
            selected,
            correct: currentQ.correct,
            isCorrect: selected !== null && isCorrect, // isCorrect is false if selected is null
        };

        setResults((prev) => [...prev, newResult]);
        if (selected !== null && isCorrect) {
            setScore((prev) => prev + 1);
        }

        setSelected(null);
        setTimeLeft(30);

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            const best = localStorage.getItem("highScore") || 0;
            if (score > best) localStorage.setItem("highScore", score);
            navigate("/results", { state: { results: [...results, newResult], score: selected !== null && isCorrect ? score + 1 : score, total: questions.length } });
        }
    }, [currentIndex, questions, selected, score, results, navigate]);

    // Load Questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(
                    `https://the-trivia-api.com/v2/questions?limit=10&difficulties=${difficulty}`
                );
                const data = await res.json();

                if (!Array.isArray(data) || data.length === 0) {
                    const local = await import("../questions.json");
                    setQuestions(local.default);
                } else {
                    setQuestions(formatQuestions(data));
                }
            } catch (err) {
                if (!navigator.onLine) {
                    setError("⚠️ Check your internet connection.");
                } else {
                    try {
                        const local = await import("../questions.json");
                        setQuestions(local.default);
                    } catch {
                        setError("❌ Failed to load questions. Please try again later.");
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [difficulty]);

    //  Timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    //  Auto-advance on timeout
    useEffect(() => {
        if (timeLeft === 0) {
            handleNext();
        }
    }, [timeLeft, handleNext]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-[400px]">
                <ProgressBar current={currentIndex + 1} total={questions.length} />

                <p className="text-right mb-2">⏳ {timeLeft > 0 ? `${timeLeft}s` : "0s"}</p>

                <QuestionCard
                    question={questions[currentIndex].question}
                    options={questions[currentIndex].options}
                    selected={selected}
                    setSelected={setSelected}
                />

                {/* ✅ Navigation Buttons */}
                <div className="flex gap-2 mt-4">
                    {/* Previous Button */}
                    {currentIndex > 0 && (
                        <button
                            onClick={() => {
                                setCurrentIndex((prev) => prev - 1);
                                setSelected(null);
                                setTimeLeft(30);
                            }}
                            className="w-1/3 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
                        >
                            Previous
                        </button>
                    )}

                    {/* Skip Button */}
                    <button
                        onClick={() => {
                            setSelected(null); // Explicitly set to null for skipped questions
                            setTimeLeft(30);
                            handleNext();
                        }}
                        className="w-1/3 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-white"
                    >
                        Skip
                    </button>

                    {/* Next / Finish Button */}
                    <button
                        onClick={handleNext}
                        disabled={!selected}
                        className={`w-1/3 py-2 rounded-xl ${selected
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-300 cursor-not-allowed"
                            }`}
                    >
                        {currentIndex + 1 === questions.length ? "Finish" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;






