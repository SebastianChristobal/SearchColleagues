import * as React from "react"
import { ISearchColleaguesProps } from "../../ISearchColleaguesProps"
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {dropdown: { width: 300 }, root:{textAlign:'left', minWidth:283}};
const stackTokens: IStackTokens = { childrenGap: 20 };

 export const Location: React.FC<ISearchColleaguesProps> = ({fetchedUsers, onRegionChange, onSelectedLocation}) =>{
  // Filter fetchedUsers based on onRegion

  const filteredUsers = onRegionChange ? fetchedUsers?.filter(user => user.country.trim().toLowerCase() === onRegionChange.trim().toLowerCase()) : fetchedUsers;
 
  
    const uniqueOfficeLocations: string[] = [];
    filteredUsers?.forEach(user => {
        if (uniqueOfficeLocations.indexOf(user.officeLocation) === -1) {
            uniqueOfficeLocations.push(user.officeLocation);
        }
    });
    const options: IDropdownOption[] = uniqueOfficeLocations?.map(location => ({
        key: location.replace(/\s+/g, ''), // Remove whitespace from keys
        text: location,
    })).sort((a, b) => a.text.localeCompare(b.text));

    const handleChange = React.useCallback((event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void =>{
      const selectedLocation = option?.text || '';

      if (onSelectedLocation) {
        onSelectedLocation(selectedLocation);
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
        placeholder="Select location"
        //label="Basic uncontrolled example"
        options={options}
        styles={dropdownStyles}
        onChange={handleChange}
      />
    </Stack>
  );
}