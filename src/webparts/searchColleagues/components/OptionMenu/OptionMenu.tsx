import * as React from 'react';
import { useState, useEffect } from 'react';
import { ISearchProps } from '../ISearchProps';
import { Department } from './DepartmentLocation/Department';
import { Location } from './OfficeLocation/Location';
import { Region } from './RegionLocation/Region';
import LimitSelector from './LimitSelector';
import { Label } from 'office-ui-fabric-react';
import { ResetOptions } from './ResetOptions';
import styles from '../SearchColleagues.module.scss';

export const OptionMenu: React.FC<ISearchProps> = ({fetchedUsers, onSelectedLimit, onFilteredOptions}) =>{

    const users = fetchedUsers;
    const [reset, setReset] = useState<boolean>(false);
    const [selectedOptionsValue, setSelectedOptionsValues] = useState({
      selectedRegion: '',
      selectedLocation: '',
      selectedDepartment: ''
      });
 
    const onChangeLimit = React.useCallback((limit) =>{
      onSelectedLimit(limit)
    },[]);
    
    const handleSelectedRegion = React.useCallback((selectedRegion: string): void =>{
      setSelectedOptionsValues(prevValues => ({ ...prevValues, selectedRegion: selectedRegion }));
    },[]);

    const handleSelectedLocation = React.useCallback((selectedLocation: string): void =>{
      setSelectedOptionsValues(prevValues => ({ ...prevValues, selectedLocation: selectedLocation }));
    },[]);

    const handleSelectedDepartment = React.useCallback((selectedDepartment: string): void =>{
      setSelectedOptionsValues(prevValues => ({ ...prevValues, selectedDepartment : selectedDepartment }));
    },[]);

    const handleOnReset = React.useCallback((reset: any): void =>{
      setSelectedOptionsValues({
        selectedRegion: '',
        selectedLocation: '',
        selectedDepartment: ''
       });
      setReset(reset);
    },[])
    const handleReset = React.useCallback((reset: any) => {
      setReset(reset); // Set reset back to false
  }, []);

  useEffect(() =>{
    onFilteredOptions(selectedOptionsValue);
  },[selectedOptionsValue])
  
    return(<>
      <div className={styles.optionMenu}>
        <Region 
        fetchedUsers={users} 
        onSelectedRegion={handleSelectedRegion} 
        onResetRegion={reset} 
        onReset={handleReset}
        onHandleResetRegion={handleOnReset}
        />
        <Location 
        fetchedUsers={users} 
        onRegionChange={selectedOptionsValue.selectedRegion} 
        onSelectedLocation={handleSelectedLocation}
        onResetLocation={reset} 
        onReset={handleReset}
        onHandleResetLocation={handleOnReset}
        />
        <Department 
        fetchedUsers={users} 
        onLocationChange={selectedOptionsValue.selectedLocation} 
        onSelectedDepartment={handleSelectedDepartment}
        onResetDepartment={reset} 
        onReset={handleReset}
        onHandleResetDepartment={handleOnReset}
        />
        <ResetOptions onReset={handleOnReset}/>
        <div style={{ marginLeft: 'auto', display: 'flex', columnGap: '10px' }}>
        <Label style={{fontWeight:'normal'}}>Item limit: </Label>
        <LimitSelector onChangeLimit={onChangeLimit}/>
        </div>
      </div>
    </>)
}