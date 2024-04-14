import * as React from 'react';
import styles from './SearchColleagues.module.scss';
import type { ISearchColleaguesProps } from './ISearchColleaguesProps';
import { fetchUsers } from './service/https';
import { useFetch } from './hooks/useFetch';
import { ColleaguesSearchBox } from './SearchBox';
import { PersonCard } from './PersonCard/PersonCard';
const SearchColleges: React.FC<ISearchColleaguesProps> = (props) => {
  const {
    hasTeamsContext,
    context
  } = props;
  
  const { fetchData: fetchAllUsers } = useFetch(fetchUsers, context, [])

  console.log(fetchAllUsers);

  const handleSearch = (value:string): void => {  
    console.log(value);
  }

    return (
      <section className={`${styles.searchColleagues} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <ColleaguesSearchBox onSearch={handleSearch} />
          <PersonCard allUsers={fetchAllUsers}/>
        </div>
      </section>
    );
  
}

export default SearchColleges