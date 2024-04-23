import * as React from 'react';
import { useState } from 'react';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
interface Props {
  onChangeLimit: (limit: number) => void;
}
const dropdownStyles: Partial<IDropdownStyles> = {
dropdown:{ minWidth: 'auto', maxWidth: 100 },
root:{
textAlign:'left'
}};
const stackTokens: IStackTokens = { childrenGap: 10 };

export const LimitSelector: React.FC<Props> = ({ onChangeLimit }) => {
  const [limitValue, setLimitValue] = useState<any>();
  const options: IDropdownOption[] = [
    { key: '10', text: '10' },
    { key: '25', text: '25' },
    { key: '50', text: '50' },
    { key: '100', text: '100' },
  ];
  
  const handleChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
    if (option) {
      const limit = parseInt(option.key as string, 10);
      onChangeLimit(limit);
      setLimitValue(limit);
    }
  };

  return (
      <Stack tokens={stackTokens}>
        <Dropdown
          placeholder={limitValue}
          options={options}
          defaultSelectedKey={options[0].key}
          selectedKey={limitValue}
          styles={dropdownStyles}
          onChange={handleChange}
        />
      </Stack>
  );
};
export default LimitSelector;