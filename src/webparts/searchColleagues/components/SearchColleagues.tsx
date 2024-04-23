import * as React from 'react';
import { useState } from 'react';
import styles from './SearchColleagues.module.scss';
import type { ISearchProps } from './ISearchProps';
import { fetchUsers } from './service/https';
import { useFetch } from './hooks/useFetch';
import { Search } from './SearchBox';
import { PersonCard } from './PersonCard/PersonCard';
import { OptionMenu } from './OptionMenu/OptionMenu';

const SearchColleges: React.FC<ISearchProps> = (props) => {
  const {
    hasTeamsContext,
    context,
    absoluteUrl
  } = props;
  
  const { fetchData: getAllUsers } = useFetch(fetchUsers, context, [])
  const [onFilteredUsers, setOnFilteredAllUsers] = useState<any[]>(getAllUsers);
  const [onFilteredByOptions, setOnFilteredByOptions] = useState<any>();
  const [selectedLimit, setSelectedLimit] = useState<any>('');

  const handleSelectedLimit = React.useCallback((limit: any):void =>{
    setSelectedLimit(limit);
  },[]); 
  const handleFilteredUsers = React.useCallback((users: any):void =>{
    setOnFilteredAllUsers(users);
  },[]); 

  const handleFilteredByOptionsValue = React.useCallback((optionValues: any): void =>{  
      setOnFilteredByOptions(optionValues);
  },[])

    return (
      <section className={`${styles.searchColleagues} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <Search 
            allUsers={getAllUsers} 
            onFilteredUsers={handleFilteredUsers} 
            onFilteredByOptions={onFilteredByOptions}
          />
          <OptionMenu 
            fetchedUsers={getAllUsers} 
            onSelectedLimit={handleSelectedLimit} 
            onFilteredOptions={handleFilteredByOptionsValue}
          />
          <div>
          <PersonCard 
            fetchedUsers={getAllUsers} 
            filteredUsers={onFilteredUsers}
            onSelectedLimit={selectedLimit} 
            absoluteUrl={absoluteUrl}
           />
           </div>
        </div>
      </section>
    );
}
export default SearchColleges;