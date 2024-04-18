import * as React from 'react';
import { useState } from 'react';
import { ISearchColleaguesProps } from '../ISearchColleaguesProps';
import { Department } from './DepartmentLocation/Department';
import { Location } from './OfficeLocation/Location';
import { Region } from './RegionLocation/Region';
import LimitSelector from './LimitSelector';
import { Label } from 'office-ui-fabric-react';
import { ResetOptions } from './ResetOptions';




export const OptionMenu: React.FC<ISearchColleaguesProps> = ({fetchedUsers, onSelectedLimit}) =>{

    const users = fetchedUsers;
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [reset, setReset] = useState<boolean>(false);

    const onChangeLimit = React.useCallback((limit) =>{
      onSelectedLimit(limit)
    },[]);
    
    const handleSelectedRegion = React.useCallback((selectedRegion: string): void =>{
      setSelectedRegion(selectedRegion);
    },[]);

    const handleSelectedLocation = React.useCallback((selectedRegion: string): void =>{
      setSelectedLocation(selectedRegion);
    },[]);

    const handleSelectedDepartment = React.useCallback((selectedRegion: string): void =>{
      setSelectedDepartment(selectedRegion);
    },[]);
    const handleOnReset = React.useCallback((reset: any): void =>{
      setReset(reset);
    },[])


    console.log(selectedDepartment)
    return(<>
      <div style={{ display: 'flex', columnGap: '15px' }}>
        <Region 
        fetchedUsers={users} 
        onSelectedRegion={handleSelectedRegion} 
        onResetRegion={reset} 
        onHandleRefreshRegion={handleOnReset}
        />
        <Location 
        fetchedUsers={users} 
        onRegionChange={selectedRegion} 
        onSelectedLocation={handleSelectedLocation}
        />
        <Department 
        fetchedUsers={users} 
        onLocationChange={selectedLocation} 
        onSelectedDepartment={handleSelectedDepartment}
        />
        <ResetOptions onReset={handleOnReset}/>
        <div style={{ marginLeft: 'auto', display: 'flex', columnGap: '10px' }}>
        <Label style={{fontWeight:'normal'}}>Item limit: </Label>
        <LimitSelector onChangeLimit={onChangeLimit}/>
        </div>
      </div>
    </>)
}