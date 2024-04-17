import * as React from "react"
import { ISearchColleaguesProps } from "../../ISearchColleaguesProps"
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {dropdown: { width: 300 }, root:{textAlign:'left', minWidth:283}};
const stackTokens: IStackTokens = { childrenGap: 20 };

 export const Department: React.FC<ISearchColleaguesProps> = ({fetchedUsers}) =>{

    const uniqueDepartment: string[] = [];
    fetchedUsers?.forEach(user => {
        if (uniqueDepartment.indexOf(user.department) === -1) {
            uniqueDepartment.push(user.department);
        }
    });
    const options: IDropdownOption[] = uniqueDepartment?.map(department => ({
        key: department.replace(/\s+/g, ''), // Remove whitespace from keys
        text: department,
    })).sort();

    const handleChange = (event: any): void =>{
      //onSelectedDepartment(event.target.value);
      console.log(event.target.value);
    }

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
        onChange={(e)  => handleChange(e)}
      />
    </Stack>
  );
}