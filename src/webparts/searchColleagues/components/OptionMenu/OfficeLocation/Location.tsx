import * as React from "react"
import { useEffect } from "react";
import { ISearchProps } from "../../ISearchProps"
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';


const dropdownStyles: Partial<IDropdownStyles> = {dropdown: { minWidth: 180, maxWidth: 250 }, root:{textAlign:'left'}};
const stackTokens: IStackTokens = { childrenGap: 20 };

 export const Location: React.FC<ISearchProps> = ({fetchedUsers, onRegionChange, onSelectedLocation, onResetLocation,onHandleResetLocation}) =>{
  const [initialOfficeLocation, setInitialOfficeLocation] = React.useState<any[]>([]);
  const  [selectedOfficeKey , setSelectedOfficeKey] = React.useState<any>('');
  const [filteredUsers, setFilteredUsers] = React.useState<any[]>([]);

 
    // Reset dropdown to initial state when onRefreshRegion is true
  useEffect(() => {
    if (onResetLocation) {
      const uniqueOffice = fetchedUsers?.reduce((accumulator: string[], user) => {
        if (!accumulator.includes(user.officeLocation)) {
          return [...accumulator, user.officeLocation];
        }
        return accumulator;
      }, []);
     
      setInitialOfficeLocation(uniqueOffice || []);
    }
    return () =>{
      setSelectedOfficeKey('');
      if(onHandleResetLocation){
        onHandleResetLocation(false);
       }
    }
  }, [onResetLocation]);
  // Update filteredUsers when onLocationChange changes or fetchedUsers initially loads
  useEffect(() => {
    const filtered = onRegionChange ?
          fetchedUsers?.filter(user => user.country.trim().toLowerCase() === onRegionChange.trim().toLowerCase()) :
          fetchedUsers || [];
    setFilteredUsers(filtered || []);
}, [onRegionChange, fetchedUsers]);



 // Initialize initial Department location when component mounts
 useEffect(() => {
  const uniqueOffice = filteredUsers?.reduce((accumulator: string[], user) => {
    if (!accumulator.includes(user.officeLocation)) {
      return [...accumulator, user.officeLocation];
    }
    return accumulator;
  }, []);
  setInitialOfficeLocation(uniqueOffice || []);
  
},[filteredUsers]);

    const options: IDropdownOption[] = initialOfficeLocation?.map(office => ({
        key: office.replace(/\s+/g, ''), // Remove whitespace from keys
        text: office,
    })).sort((a, b) => a.text.localeCompare(b.text));

    const handleChange = React.useCallback((event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void =>{
      const selectedLocation = option?.text || '';
      const selectedKey = option?.key || '';
      setSelectedOfficeKey(selectedKey);
      if (onSelectedLocation) {
        onSelectedLocation(selectedLocation);
      }
   
    },[onSelectedLocation]);

   return (
    <Stack tokens={stackTokens}>
      <Dropdown
        placeholder="Select location"
        //label="Basic uncontrolled example"
        options={options}
        styles={dropdownStyles}
        onChange={handleChange}
        selectedKey={selectedOfficeKey}
      />
    </Stack>
  );
}