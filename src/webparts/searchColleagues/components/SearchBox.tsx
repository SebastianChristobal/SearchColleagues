import * as React from 'react';

import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { ISearchColleaguesProps } from './ISearchColleaguesProps';
const stackTokens: Partial<IStackTokens> = { childrenGap: 20};

export const ColleaguesSearchBox: React.FC<ISearchColleaguesProps> = ({ onSearch }) => {
  
  const handleChange = (newValue: any): void => {
    if (onSearch) {
      onSearch(newValue);
    }
  };

  return (
    <Stack tokens={stackTokens}
     styles={{
        root: {
          paddingBottom: 45
        }
      }}
    >
      <SearchBox
        placeholder="search for colleagues"
        onChange={(event) => handleChange(event?.target.value)}
      />
    </Stack>
  );
};