const FilterTag = ({ label }: { label: string }) => {
  const formattedLabel =
    label === "soon"
      ? "Expiring soon"
      : label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
      {formattedLabel}
    </span>
  );
};

export default FilterTag;
