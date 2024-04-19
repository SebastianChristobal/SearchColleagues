import * as React from "react"
import { ISearchColleaguesProps } from "../../ISearchColleaguesProps"
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {dropdown: { width: 300 }, root:{textAlign:'left', minWidth:283}};
const stackTokens: IStackTokens = { childrenGap: 20 };

 export const Department: React.FC<ISearchColleaguesProps> = ({fetchedUsers, onLocationChange, onSelectedDepartment, onResetDepartment, onHandleResetDepartment}) =>{
  const [initialDeparmentLocation, setInitialDeparmetLocation] = React.useState<any[]>([]);
  const  [selectedDeparmentKey , setSelectedDeparmentKey] = React.useState<any>('');
  const [filteredUsers, setFilteredUsers] = React.useState<any[]>([]);

  //const filteredUsers = onLocationChange ? fetchedUsers?.filter(user => user.officeLocation.trim().toLowerCase() === onLocationChange.trim().toLowerCase()) : fetchedUsers;
  // Reset dropdown to initial state when onRefreshRegion is true
  React.useEffect(() => {
    if (onResetDepartment) {
      const uniqueDepartment = filteredUsers?.reduce((accumulator: string[], user) => {
        if (!accumulator.includes(user.department)) {
          return [...accumulator, user.department];
        }
        return accumulator;
      }, []);
      setSelectedDeparmentKey('');
      setInitialDeparmetLocation(uniqueDepartment || []);
    }
    return () =>{
      if(onHandleResetDepartment){
        onHandleResetDepartment(false);
       }
    }
  }, [onResetDepartment]);
   // Update filteredUsers when onLocationChange changes or fetchedUsers initially loads
   React.useEffect(() => {
    const filtered = onLocationChange ?
          fetchedUsers?.filter(user => user.officeLocation.trim().toLowerCase() === onLocationChange.trim().toLowerCase()) :
          fetchedUsers || [];
    setFilteredUsers(filtered || []);
}, [onLocationChange, fetchedUsers]);



 // Initialize initial Department location when component mounts
 React.useEffect(() => {
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
        selectedKey={selectedDeparmentKey}
      />
    </Stack>
  );
}