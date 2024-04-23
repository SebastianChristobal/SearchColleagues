import * as React from "react"
import { useEffect } from "react";
import { ISearchProps } from "../../ISearchProps"
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {dropdown:{ minWidth: 180, maxWidth: 250}, root:{textAlign:'left'}};
const stackTokens: IStackTokens = { childrenGap: 20 };

export const Region: React.FC<ISearchProps> = ({fetchedUsers, onSelectedRegion, onResetRegion, onHandleResetRegion}) =>{
  const [initialRegionLocation, setInitialRegionLocation] = React.useState<any[]>([]);
  const  [selectedRegionKey , setSelectedRegionKey] = React.useState<any>('');
   
  // Reset dropdown to initial state when onResetRegion is true
   useEffect(() => {
    if (onResetRegion) {
      const uniqueCountries = fetchedUsers?.reduce((accumulator: string[], user) => {
        if (!accumulator.includes(user.country)) {
          return [...accumulator, user.country];
        }
        return accumulator;
      }, []);
      setInitialRegionLocation(uniqueCountries || []);
    }
    return () =>{
      setSelectedRegionKey('');
      if(onHandleResetRegion){
        onHandleResetRegion(false);
       }
    }
  }, [onResetRegion]);

  // Initialize initial region location when component mounts
  useEffect(() => {
    const uniqueCountries = fetchedUsers?.reduce((accumulator: string[], user) => {
      if (!accumulator.includes(user.country)) {
        return [...accumulator, user.country];
      }
      return accumulator;
    }, []);
    setInitialRegionLocation(uniqueCountries || []);
    
  }, [fetchedUsers]);

  const options: IDropdownOption[] = initialRegionLocation?.map(country => ({
    key: country.replace(/\s+/g, ''), // Remove whitespace from keys
    text: country,
  })).sort((a, b) => a.text.localeCompare(b.text));

  const handleChange = React.useCallback((event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void =>{
    const selectedRegion = option?.text || '';
    const selectedKey = option?.key || ''
    setSelectedRegionKey(selectedKey);
    if (onSelectedRegion) {
      onSelectedRegion(selectedRegion);
    }
  },[]);

  return (
    <Stack tokens={stackTokens}>
      <Dropdown
        placeholder="Select country"
        options={options}
        styles={dropdownStyles}
        onChange={handleChange}
        selectedKey={selectedRegionKey}
      />
    </Stack>
  );
}