import * as React from "react"
import { ISearchColleaguesProps } from "../../ISearchColleaguesProps"
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {dropdown: { width: 300 }, root:{textAlign:'left', minWidth:283}};
const stackTokens: IStackTokens = { childrenGap: 20 };

 export const Department: React.FC<ISearchColleaguesProps> = ({fetchedUsers, onLocationChange, onSelectedDepartment}) =>{

  const filteredUsers = onLocationChange ? fetchedUsers?.filter(user => user.officeLocation.trim().toLowerCase() === onLocationChange.trim().toLowerCase()) : fetchedUsers;

    const uniqueDepartment: string[] = [];
    filteredUsers?.forEach(user => {
        if (uniqueDepartment.indexOf(user.department) === -1) {
            uniqueDepartment.push(user.department);
        }
    });
    const options: IDropdownOption[] = uniqueDepartment?.map(department => ({
        key: department.replace(/\s+/g, ''), // Remove whitespace from keys
        text: department,
    })).sort((a, b) => a.text.localeCompare(b.text));

    const handleChange = React.useCallback((event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void =>{
      const selectedLocation = option?.text || '';

      if (onSelectedDepartment) {
        onSelectedDepartment(selectedLocation);
      }
   
    },[]);

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
        onChange={handleChange}
      />
    </Stack>
  );
}