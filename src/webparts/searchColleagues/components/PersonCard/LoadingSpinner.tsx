import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { ISearchProps } from '../ISearchProps';

export const Loading: React.FC<ISearchProps> = () => {
  const stackTokens: IStackTokens = {
    childrenGap: 20,
    maxWidth: '100%'
  };

  return (
    <Stack tokens={stackTokens} styles={{ 
        root: {paddingTop: 60}
        }} >
      <>
        <Spinner size={SpinnerSize.large} label="fetching data..." />
      </>
    </Stack>
  );
};
