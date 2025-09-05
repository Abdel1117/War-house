interface SelectComponentsProps {
  label?: string;
  options?: string[];
  entity?: string;
  setEntity?: (entity: string) => void;
}

export const SelectComponents: React.FC<SelectComponentsProps> = ({
  label,
  options,
  entity,
  setEntity,
}) => {
  const selectId: string =
    label
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, "-") // Remplace tous les caractères non alphanumériques par des tirets
      .replace(/-+/g, "-") // Remplace les tirets multiples par un seul
      .replace(/^-|-$/g, "") || // Supprime les tirets en début/fin
    "select";

  return (
    <div>
      <select
        className="block w-full px-4 py-3 cursor-pointer text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id={selectId}
        name={label}
        value={entity || ""}
        onChange={(e) => setEntity?.(e.target.value)}
      >
        <option value="">{label}</option>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
