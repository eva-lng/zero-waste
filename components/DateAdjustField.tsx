import DateAdjustButton from "./DateAdjustButton";

const DateAdjustField = ({
  adjustDate,
}: {
  adjustDate: (numOfDays: number) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 border-b p-0.5">
      <DateAdjustButton label="+ 1D" adjustDate={() => adjustDate(1)} />
      <DateAdjustButton label="+ 3D" adjustDate={() => adjustDate(3)} />
      <DateAdjustButton label="+ 5D" adjustDate={() => adjustDate(5)} />
      <DateAdjustButton label="+ 1W" adjustDate={() => adjustDate(7)} />
      <DateAdjustButton label="+ 3W" adjustDate={() => adjustDate(21)} />
      <DateAdjustButton label="+ 1M" adjustDate={() => adjustDate(30)} />
      <DateAdjustButton label="+ 3M" adjustDate={() => adjustDate(90)} />
      <DateAdjustButton label="+ 1Y" adjustDate={() => adjustDate(365)} />
    </div>
  );
};

export default DateAdjustField;
