import * as React from "react"
import { ISearchColleaguesProps } from "../../ISearchColleaguesProps"
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {dropdown: { width: 300 }, root:{textAlign:'left', minWidth:283}};
const stackTokens: IStackTokens = { childrenGap: 20 };

 export const Location: React.FC<ISearchColleaguesProps> = ({fetchedUsers, onRegionChange, onSelectedLocation, onResetLocation,onHandleResetLocation}) =>{
  const [initialOfficeLocation, setInitialOfficeLocation] = React.useState<any[]>([]);
  const  [selectedOfficeKey , setSelectedOfficeKey] = React.useState<any>('');
  const [filteredUsers, setFilteredUsers] = React.useState<any[]>([]);
  //const filteredUsers = onRegionChange ? fetchedUsers?.filter(user => user.country.trim().toLowerCase() === onRegionChange.trim().toLowerCase()) : fetchedUsers;
 
  
    // Reset dropdown to initial state when onRefreshRegion is true
  React.useEffect(() => {
    if (onResetLocation) {
      const uniqueOffice = filteredUsers?.reduce((accumulator: string[], user) => {
        if (!accumulator.includes(user.officeLocation)) {
          return [...accumulator, user.officeLocation];
        }
        return accumulator;
      }, []);
      setSelectedOfficeKey('');
      setInitialOfficeLocation(uniqueOffice || []);
    }
    return () =>{
      if(onHandleResetLocation){
        onHandleResetLocation(false);
       }
    }
  }, [onResetLocation]);
  // Update filteredUsers when onLocationChange changes or fetchedUsers initially loads
  React.useEffect(() => {
    const filtered = onRegionChange ?
          fetchedUsers?.filter(user => user.country.trim().toLowerCase() === onRegionChange.trim().toLowerCase()) :
          fetchedUsers || [];
    setFilteredUsers(filtered || []);
}, [onRegionChange, fetchedUsers]);



 // Initialize initial Department location when component mounts
 React.useEffect(() => {
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
        selectedKey={selectedOfficeKey}
      />
    </Stack>
  );
}