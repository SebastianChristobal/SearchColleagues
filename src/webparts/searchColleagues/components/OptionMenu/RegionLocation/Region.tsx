import * as React from "react"
import { ISearchColleaguesProps } from "../../ISearchColleaguesProps"
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {dropdown: { width: 300 }, root:{textAlign:'left', minWidth:283}};
const stackTokens: IStackTokens = { childrenGap: 20 };

 export const Region: React.FC<ISearchColleaguesProps> = ({fetchedUsers}) =>{

    const uniqueRegionLocation: string[] = [];
    fetchedUsers?.forEach(user => {
        if (uniqueRegionLocation.indexOf(user.country) === -1) {
          uniqueRegionLocation.push(user.country);
        }
    });
    const options: IDropdownOption[] = uniqueRegionLocation?.map(country => ({
        key: country.replace(/\s+/g, ''), // Remove whitespace from keys
        text: country,
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
        placeholder="Select country"
        //label="Basic uncontrolled example"
        options={options}
        styles={dropdownStyles}
        onChange={(e)  => handleChange(e)}
      />
    </Stack>
  );
}