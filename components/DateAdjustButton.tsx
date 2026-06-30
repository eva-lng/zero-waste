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
      className="pill-base text-xs py-0.5 pill-light hover:bg-primary hover:text-primary-foreground cursor-pointer"
      onClick={adjustDate}
    >
      {label}
    </button>
  );
};

export default DateAdjustButton;
