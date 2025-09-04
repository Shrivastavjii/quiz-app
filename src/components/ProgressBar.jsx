const ProgressBar = ({ current, total }) => {
  const percent = (current / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
      <div
        className="bg-blue-500 h-3 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
