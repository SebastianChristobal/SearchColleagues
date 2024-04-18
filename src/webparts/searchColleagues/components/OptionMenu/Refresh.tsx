import * as React from "react";
import { 
     IIconProps,
     //IContextualMenuProps, 
     Stack, 
     //Link 
    } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';

export interface IButtonProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const emojiIcon: IIconProps = { iconName: 'Refresh' };


export const Refresh: React.FC<IButtonProps> = (props) =>{
    const { disabled, checked } = props;

    return(<>
        <Stack tokens={{ childrenGap: 8 }} horizontal>
        <IconButton iconProps={emojiIcon} title="Refresh" ariaLabel="Refresh" disabled={disabled} checked={checked} />
      </Stack>
    </>)
}