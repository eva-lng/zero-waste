const DateAdjustButton = ({
  label,
  adjustDate,
}: {
  label: string;
  adjustDate: () => void;
}) => {
  return (
    <button
      type="button"
      className="bg-blue-100 text-blue-800 text-sm px-3 py-0.5 rounded-full"
      onClick={adjustDate}
    >
      {label}
    </button>
  );
};

export default DateAdjustButton;
