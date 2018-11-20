import * as React from "react";
import { Filter as FilterType } from "../types";

interface Props {
  filter: FilterType;
  onFilter: (filter: string) => void;
  total: number;
  onReset: () => void;
}

const options = [
  { value: "all", label: "All" },
  { value: "valid", label: "Valid" },
  { value: "invalid", label: "Invalid" }
];

const Filter = ({ filter, onFilter, onReset, total }: Props) => {
  if (!total) return null;
  return (
    <div className="filter">
      <select
        className="filter__select"
        onChange={(event: any) => onFilter(event.target.value)}
        value={filter}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="filter__total">{`${total} ${
        filter !== "all" ? filter : "total"
      } records`}</span>
      <button className="filter__reset" onClick={onReset}>
        reset
      </button>
    </div>
  );
};

export default Filter;
