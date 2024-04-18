import * as React from "react";
import { IIconProps,Stack } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { ISearchColleaguesProps } from "../ISearchColleaguesProps";

const emojiIcon: IIconProps = { iconName: 'Refresh' };

export const ResetOptions: React.FC<ISearchColleaguesProps> = ({onReset},props) =>{
    const { disabled, checked } = props;

    const handleReset = ():void =>{
        if(onReset){
            onReset(true);
        }
    }

    return(<>
        <Stack tokens={{ childrenGap: 8 }} horizontal>
        <IconButton iconProps={emojiIcon} title="Refresh" ariaLabel="Refresh" disabled={disabled} checked={checked} onClick={handleReset} />
      </Stack>
    </>)
}