import * as React from "react";
import { IIconProps,Stack } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { ISearchProps } from "../ISearchProps";
const emojiIcon: IIconProps = { iconName: 'Refresh' };

export const ResetOptions: React.FC<ISearchProps> = ({onReset},props) =>{
    const { disabled, checked } = props;
    const handleReset = ():void =>{
        if(onReset){
        onReset(true);
        }
    }

    return(<>
        <Stack tokens={{ childrenGap: 8 }} horizontal>
        <IconButton iconProps={emojiIcon} title="Reset" ariaLabel="Reset" disabled={disabled} checked={checked} onClick={handleReset} />
      </Stack>
    </>)
}