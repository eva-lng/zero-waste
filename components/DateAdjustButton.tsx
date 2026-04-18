const DateAdjustButton = ({ label }: { label: string }) => {
  return (
    <button className="bg-blue-100 text-blue-800 text-sm px-3 py-0.5 rounded-full">
      {label}
    </button>
  );
};

export default DateAdjustButton;
