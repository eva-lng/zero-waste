import DateAdjustButton from "./DateAdjustButton";

const DateAdjustField = () => {
  return (
    <div className="flex flex-wrap gap-2 p-0.5">
      <DateAdjustButton label="+ 1D" />
      <DateAdjustButton label="+ 3D" />
      <DateAdjustButton label="+ 5D" />
      <DateAdjustButton label="+ 1W" />
      <DateAdjustButton label="+ 3W" />
      <DateAdjustButton label="+ 1M" />
      <DateAdjustButton label="+ 3M" />
      <DateAdjustButton label="+ 1Y" />
    </div>
  );
};

export default DateAdjustField;
