import { SelectComponents } from "../UI/SelectComponents/SelectComponents";

interface filterOptions {
  label: string;
  collections: string[];
  entity: string | undefined;
  setEntity: (entity: string | undefined) => void;
}
interface FilterBarProps {
  options: filterOptions[];
  filterAction: () => void;
  ResetAction: () => void;
}

export const FilterBar = ({
  options,
  filterAction,
  ResetAction,
}: FilterBarProps) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-center items-center space-x-4 overflow-x-auto h-full">
        {options?.map((option, index) => (
          <SelectComponents
            key={index}
            entity={option?.entity}
            setEntity={option?.setEntity}
            options={option?.collections}
            label={option?.label}
          />
        ))}
        <div className="flex space-x-4 items-baseline">
          <button
            onClick={filterAction}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg"
          >
            Filtrer
          </button>
          <button
            onClick={ResetAction}
            className="px-4 py-3 bg-gray-300 text-gray-800 rounded-lg"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
};
