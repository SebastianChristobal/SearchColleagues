import * as React from 'react';
import styles from './SearchColleagues.module.scss';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { ISearchColleaguesProps } from './ISearchColleaguesProps';
const stackTokens: Partial<IStackTokens> = { childrenGap: 20};

export const ColleaguesSearchBox: React.FC<ISearchColleaguesProps> = ({ onSearch }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const handleChange = (newValue: any): void => {
    if (onSearch) {
      onSearch(newValue);
    }
  };

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