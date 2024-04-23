import * as React from "react"
import { useEffect } from "react";
import { ISearchProps } from "../../ISearchProps"
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {dropdown: {minWidth: 180, maxWidth: 250 }, root:{textAlign:'left'}};
const stackTokens: IStackTokens = { childrenGap: 20 };

 export const Department: React.FC<ISearchProps> = ({fetchedUsers, onLocationChange, onSelectedDepartment, onResetDepartment, onHandleResetDepartment}) =>{
  const [initialDeparmentLocation, setInitialDeparmetLocation] = React.useState<any[]>([]);
  const  [selectedDeparmentKey , setSelectedDeparmentKey] = React.useState<any>('');
  const [filteredUsers, setFilteredUsers] = React.useState<any[]>([]);

  // Reset dropdown to initial state when onRefreshRegion is true
 useEffect(() => {
    if (onResetDepartment) {
      const uniqueDepartment = fetchedUsers?.reduce((accumulator: string[], user) => {
        if (!accumulator.includes(user.department)) {
          return [...accumulator, user.department];
        }
        return accumulator;
      }, []);
     
      setInitialDeparmetLocation(uniqueDepartment || []);
    }
    return () =>{
      setSelectedDeparmentKey('');
      if(onHandleResetDepartment){
        onHandleResetDepartment(false);
       }
    }
  }, [onResetDepartment]);
   // Update filteredUsers when onLocationChange changes or fetchedUsers initially loads
  useEffect(() => {
    const filtered = onLocationChange ?
          fetchedUsers?.filter(user => user.officeLocation.trim().toLowerCase() === onLocationChange.trim().toLowerCase()) :
          fetchedUsers || [];
    setFilteredUsers(filtered || []);
}, [onLocationChange, fetchedUsers]);



 // Initialize initial Department location when component mounts
useEffect(() => {
  const uniqueDepartment = filteredUsers?.reduce((accumulator: string[], user) => {
    if (!accumulator.includes(user.department)) {
      return [...accumulator, user.department];
    }
    return accumulator;
  }, []);
  setInitialDeparmetLocation(uniqueDepartment || []);
  
},[filteredUsers]);

    const options: IDropdownOption[] = initialDeparmentLocation?.map(department => ({
        key: department.replace(/\s+/g, ''), // Remove whitespace from keys
        text: department,
    })).sort((a, b) => a.text.localeCompare(b.text));

    const handleChange = React.useCallback((event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void =>{
      const selectedLocation = option?.text || '';
      const selectedKey = option?.key || '';
      setSelectedDeparmentKey(selectedKey)
      if (onSelectedDepartment) {
        onSelectedDepartment(selectedLocation);
      }
   
    },[onSelectedDepartment]);

   return (
    <Stack tokens={stackTokens}>
      <Dropdown
        placeholder="Select department"
        //label="Basic uncontrolled example"
        options={options}
        styles={dropdownStyles}
        onChange={handleChange}
        selectedKey={selectedDeparmentKey}
      />
    </Stack>
  );
}