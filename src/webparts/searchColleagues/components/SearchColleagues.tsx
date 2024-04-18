import * as React from 'react';
import { useState } from 'react';
import styles from './SearchColleagues.module.scss';
import type { ISearchColleaguesProps } from './ISearchColleaguesProps';
import { fetchUsers } from './service/https';
import { useFetch } from './hooks/useFetch';
import { ColleaguesSearchBox } from './SearchBox';
import { PersonCard } from './PersonCard/PersonCard';
import { OptionMenu } from './OptionMenu/OptionMenu';


const SearchColleges: React.FC<ISearchColleaguesProps> = (props) => {
  const {
    hasTeamsContext,
    context
  } = props;
  
  const { fetchData: getAllUsers } = useFetch(fetchUsers, context, [])
  //const [allUsers, setAllUsers] = useState<any[]>(getAllUsers);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedLimit, setSelectedLimit] = useState<any>('');

  const handleSearch = React.useCallback((value: string) => {  
    const lowerCaseValue = value.toLowerCase(); // Convert search term to lowercase
    const users = getAllUsers.filter((user: any) => {
      const {
        displayName,
        department,
        givenName,
        surname,
        jobTitle,
        mail,
        mobilePhone,
        officeLocation,
        userPrincipalName,
        country
      } = user;
  
      // Convert property values to lowercase for case-insensitive search
      return (
        (displayName && displayName.toLowerCase().includes(lowerCaseValue)) || 
        (department && department.toLowerCase().includes(lowerCaseValue)) ||
        (givenName && givenName.toLowerCase().includes(lowerCaseValue)) ||
        (surname && surname.toLowerCase().includes(lowerCaseValue)) ||
        (jobTitle && jobTitle.toLowerCase().includes(lowerCaseValue)) ||
        (mail && mail.toLowerCase().includes(lowerCaseValue)) ||
        (mobilePhone && mobilePhone.toLowerCase().includes(lowerCaseValue)) ||
        (officeLocation && officeLocation.toLowerCase().includes(lowerCaseValue)) ||
        (country && country.toLowerCase().includes(lowerCaseValue)) ||
        (userPrincipalName && userPrincipalName.toLowerCase().includes(lowerCaseValue))
      );
    });
    setFilteredUsers(users);
  }, [getAllUsers]);

  const handleSelectedLimit = React.useCallback((limit: any):void =>{
    setSelectedLimit(limit);
  },[]); 


    return (
      <section className={`${styles.searchColleagues} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <ColleaguesSearchBox onSearch={handleSearch} />
          <OptionMenu fetchedUsers={getAllUsers} onSelectedLimit={handleSelectedLimit}/>
          <PersonCard fetchedUsers={getAllUsers} filteredUsers={filteredUsers} onSelectedLimit={selectedLimit}/>
        </div>
      </section>
    );
}
export default SearchColleges;