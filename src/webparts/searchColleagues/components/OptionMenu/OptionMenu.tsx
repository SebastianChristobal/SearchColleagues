import * as React from 'react';
import { ISearchColleaguesProps } from '../ISearchColleaguesProps';
import { Department } from './DepartmentLocation/Department';
import { Location } from './OfficeLocation/Location';
import { Region } from './RegionLocation/Region';
import LimitSelector from './LimitSelector';
import { Label } from 'office-ui-fabric-react';
import { Refresh } from './Refresh';




export const OptionMenu: React.FC<ISearchColleaguesProps> = ({fetchedUsers, onSelectedLimit}) =>{

    const users = fetchedUsers;

    const onChangeLimit = React.useCallback((limit) =>{
        onSelectedLimit(limit)
    },[])
  

    return(<>
      <div style={{ display: 'flex', columnGap: '15px' }}>
        <Region fetchedUsers={users}/>
        <Location fetchedUsers={users}/>
        <Department fetchedUsers={users}/>
        <Refresh />
        <div style={{ marginLeft: 'auto', display: 'flex', columnGap: '10px' }}>
        <Label style={{fontWeight:'normal'}}>Item limit: </Label>
        <LimitSelector onChangeLimit={onChangeLimit}/>
        </div>
      </div>
    </>)
}