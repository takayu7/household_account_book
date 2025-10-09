import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PulldownPropsOption {
  key: string;
  value: string;
  label: string;
}

interface PulldownProps {
  options: PulldownPropsOption[];
  selected: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const SelectForm: React.FC<PulldownProps> = ({
  selected,
  options,
  placeholder,
  ...props
}) => {
  return (
    <Select value={selected} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder || ''} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.key} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectForm;
