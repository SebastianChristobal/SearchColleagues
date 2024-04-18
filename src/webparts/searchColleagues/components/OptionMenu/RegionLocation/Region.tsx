import * as React from "react"
import { ISearchColleaguesProps } from "../../ISearchColleaguesProps"
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {dropdown: { width: 300 }, root:{textAlign:'left', minWidth:283}};
const stackTokens: IStackTokens = { childrenGap: 20 };

export const Region: React.FC<ISearchColleaguesProps> = ({fetchedUsers, onSelectedRegion, onResetRegion}) =>{
  const [initialRegionLocation, setInitialRegionLocation] = React.useState<any[]>([]);
  //const [uniqueRegionLocation, setUniqueRegionLocation] = React.useState<any[]>(initialRegionLocation);
 // const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);

   // Reset dropdown to initial state when onRefreshRegion is true
   React.useEffect(() => {
    if (onResetRegion) {
      setInitialRegionLocation([]);
    }
  }, [onResetRegion]);

  // Initialize initial region location when component mounts
  React.useEffect(() => {
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

    if (onSelectedRegion) {
      onSelectedRegion(selectedRegion);
    }
  },[onSelectedRegion]);

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
        options={options}
        styles={dropdownStyles}
        onChange={handleChange}
      />
    </Stack>
  );
}