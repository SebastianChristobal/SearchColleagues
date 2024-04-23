import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardImage,
  IDocumentCardStyles
} from '@fluentui/react/lib/DocumentCard';
import { IIconProps } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { ImageFit } from '@fluentui/react/lib/Image';
import { ISearchProps } from '../ISearchProps';
import { Person } from '../Persona/Person';
import { Loading } from './LoadingSpinner';
import styles from '../SearchColleagues.module.scss';

const emojiIcon: IIconProps = { iconName: 'Chat' };
const cardStyles: IDocumentCardStyles = {
  root: { display: 'inline-block', marginRight: 10, marginBottom: 10, width: 300, maxWidth: 280 },
};

export const PersonCard: React.FC<ISearchProps> = ({fetchedUsers, filteredUsers, onSelectedLimit, absoluteUrl}) => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const absoluteSiteUrl = absoluteUrl;

 useEffect(() => {
    const initialize = (): void => {
        const users = filteredUsers?.length !== undefined &&  filteredUsers?.length < 1 ? fetchedUsers : filteredUsers; // Access data directly, not as a function
        const limitedUsers = users?.slice(0, onSelectedLimit || 10);
        setAllUsers(limitedUsers || [] );
    };
    initialize();
  }, [fetchedUsers, onSelectedLimit, filteredUsers]);
  const users = allUsers.sort((a, b) => a.displayName.localeCompare(b.displayName));

  return (
    <>
  {users && users.length > 0 ? (
  users.map((user: any) => (
    <DocumentCard
    className={styles.documentCard}
      key={user.userPrincipalName}
      aria-label={
        'Document Card with image. How to make a good design. ' +
        'Last modified by Annie Lindqvist and 2 others in March 13, 2018.'
      }
      styles={cardStyles}
      //onClickHref="http://bing.com"
    >
      {user.userPrincipalName && (
        <DocumentCardImage
          height={100}
          imageFit={ImageFit.cover}
          styles={{ root: { display: 'inline-block', width: '40%', borderRadius: '100px', marginTop: '10px' } }}
          imageSrc={user.userPrincipalName && `${absoluteSiteUrl}/_layouts/15/userphoto.aspx?size=L&username=${encodeURIComponent(user.userPrincipalName.toLowerCase())}`}
        />
      )}
      <DocumentCardDetails>
        <DocumentCardTitle title={user.displayName} shouldTruncate />
        <Person
          text={user.jobTitle}
          secondaryText={user.department}
          optionaltext={user.officeLocation}
          userEmail={user.mail === null ? user.userPrincipalName : user.mail}
        />
        <div style={{ marginLeft: 'auto'}}>
        <IconButton iconProps={emojiIcon} title="Chat" ariaLabel="Chat"  onClick={ (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        window.open(
          `https://teams.microsoft.com/l/chat/0/0?users=${user.userPrincipalName}&message=Hi ${user.displayName} `,
          "_blank"
        );
      }} />
        </div>
      </DocumentCardDetails>
    </DocumentCard>
  ))) : (<Loading />)}  
    </>
  );
};
