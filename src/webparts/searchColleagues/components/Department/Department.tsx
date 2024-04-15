import * as React from "react"
import { ISearchColleaguesProps } from "../ISearchColleaguesProps"
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {dropdown: { width: 300 },};
const stackTokens: IStackTokens = { childrenGap: 20 };

 export const Department: React.FC<ISearchColleaguesProps> = ({allUsers}) =>{

    const uniqueDepartment: string[] = [];
    allUsers?.forEach(user => {
        if (uniqueDepartment.indexOf(user.department) === -1) {
            uniqueDepartment.push(user.department);
        }
    });
    const options: IDropdownOption[] = uniqueDepartment?.map(department => ({
        key: department.replace(/\s+/g, ''), // Remove whitespace from keys
        text: department,
    })).sort();

   return (
    <Stack tokens={stackTokens}
    styles={{
        root: {
          paddingBottom: 45
        }
      }}
    >
      <Dropdown
        placeholder="Select department"
        //label="Basic uncontrolled example"
        options={options}
        styles={dropdownStyles}
      />
    </Stack>
  );
}