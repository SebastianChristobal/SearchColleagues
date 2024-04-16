import * as React from 'react';
import { useState } from 'react';
import styles from './SearchColleagues.module.scss';
import type { ISearchColleaguesProps } from './ISearchColleaguesProps';
import { fetchUsers } from './service/https';
import { useFetch } from './hooks/useFetch';
import { ColleaguesSearchBox } from './SearchBox';
import { PersonCard } from './PersonCard/PersonCard';
import { Location } from './OfficeLocation/Location';
import { Department } from './DepartmentLocation/Department';
import { Region } from './RegionLocation/Region';


const SearchColleges: React.FC<ISearchColleaguesProps> = (props) => {
  const {
    hasTeamsContext,
    context
  } = props;
  
  const { fetchData: getAllUsers } = useFetch(fetchUsers, context, [])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

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

  console.log(getAllUsers);

    return (
      <section className={`${styles.searchColleagues} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <ColleaguesSearchBox onSearch={handleSearch} />
          <div style={{ display: 'flex', columnGap: '15px' }}>
            <Region allUsers={getAllUsers}/>
            <Location allUsers={getAllUsers}/>
            <Department allUsers={getAllUsers} />
          </div>
          <PersonCard allUsers={getAllUsers} filteredUsers={filteredUsers}/>
        </div>
      </section>
    );
  
}

export default SearchColleges;