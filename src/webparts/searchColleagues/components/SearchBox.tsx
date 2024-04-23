import * as React from 'react';
import { useEffect } from 'react';
import styles from './SearchColleagues.module.scss';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { ISearchProps } from './ISearchProps';
const stackTokens: Partial<IStackTokens> = { childrenGap: 20};

export const Search: React.FC<ISearchProps> = ({ allUsers, onFilteredUsers, onFilteredByOptions }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const handleChange = (newValue: any): void => {
    setSearchValue(newValue);
  };

  useEffect(() => {
    let filteredUsers = allUsers;
      // Filter based on selected options
      if (onFilteredByOptions?.selectedRegion !== '' || onFilteredByOptions?.selectedLocation !== '' || onFilteredByOptions?.selectedDepartment !== '') {
        filteredUsers = filteredUsers?.filter((user: any) => {
          const matchesRegion = !onFilteredByOptions?.selectedRegion || (user.country.trim().toLowerCase() === onFilteredByOptions?.selectedRegion.trim().toLowerCase());
          const matchesLocation = !onFilteredByOptions?.selectedLocation || (user.officeLocation.trim().toLowerCase() === onFilteredByOptions?.selectedLocation.trim().toLowerCase());
          const matchesDepartment = !onFilteredByOptions?.selectedDepartment || (user.department.trim().toLowerCase() === onFilteredByOptions?.selectedDepartment.trim().toLowerCase());

          return matchesRegion && matchesLocation && matchesDepartment;
        });
      }
      const lowerCaseValue = searchValue.toLowerCase(); // Convert search term to lowercase and trim whitespace
      // Function to check if any of the specified fields contain the search term
      const containsSearchTerm = (user: any, fields: any): any => {
        for (const field of fields) {
          if (user[field] && user[field].toLowerCase().includes(lowerCaseValue || 
            (onFilteredByOptions?.selectedLocation.toLowerCase() || onFilteredByOptions?.selectedDepartment.toLowerCase() || onFilteredByOptions?.selectedRegion.toLowerCase()))) {
            return true;
          }
        }
        return false;
      };
      
      // Define the fields to search in
      const fieldsToSearch = [
        'displayName',
        'userPrincipalName',
        'givenName',
        'surname',
        'jobTitle',
        'mail',
        'mobilePhone',
        'country',
        'officeLocation',
        'department'
      ];
      
      // Continue filtering based on search term
      const filteredResults = filteredUsers?.filter((user: any) => containsSearchTerm(user, fieldsToSearch));
      console.log(filteredResults)
      if (onFilteredUsers) {
        onFilteredUsers(filteredResults);
      }

  }, [searchValue, onFilteredByOptions, onFilteredUsers]);

  return (
    <Stack tokens={stackTokens}
     styles={{
        root: {
          paddingBottom: 20
        }
      }}
    >
      <SearchBox  className={isFocused ? styles.searchBoxActive : styles.searchBox} // Apply the active or inactive class based on isFocused state
        placeholder="search for colleagues"
        onChange={(event) => handleChange(event?.target.value)}
        onFocus={() => setIsFocused(true)}
      />
    </Stack>
  );
};