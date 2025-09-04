const QuestionCard = ({ question, options, selected, setSelected }) => {
  return (
    <div>
      <h2
        className="text-lg font-semibold mb-4"
        dangerouslySetInnerHTML={{ __html: question }}
      />

      <div className="flex flex-col gap-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(opt)}
            aria-pressed={selected === opt}
            className={`p-2 border rounded-xl focus:outline-none focus:ring-2 ${
              selected === opt
                ? "bg-blue-200 border-blue-500"
                : "hover:bg-gray-100"
            }`}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
