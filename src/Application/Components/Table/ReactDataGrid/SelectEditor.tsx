import React from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";

interface SelectEditorProps {
  value: string;
  onChange: (value: string) => void;
  options: OptionsOrGroups<any, GroupBase<any>>;
  rowHeight: number;
  menuPortalTarget?: Element;
  className?: string;
}

export function SelectEditor({
  value,
  onChange,
  options,
  rowHeight,
  menuPortalTarget,
  className,
}: SelectEditorProps) {
  return (
    <Select
      value={options.find((o) => o.value === value)}
      onChange={(o) => onChange(o.value)}
      options={options}
      menuPortalTarget={menuPortalTarget as HTMLElement}
      styles={{
        control: (provided) => ({
          ...provided,
          height: rowHeight - 1,
          minHeight: 30,
          lineHeight: "normal",
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          height: rowHeight - 1,
        }),
      }}
      className={className}
    />
  );
}
