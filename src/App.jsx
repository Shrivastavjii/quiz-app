import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Home from "./pages/Home";

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Result />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
