import * as React from 'react';
import {
  DocumentCard,
  //DocumentCardActivity,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardImage,
  IDocumentCardStyles,
 // IDocumentCardActivityPerson,
} from '@fluentui/react/lib/DocumentCard';

//import { IIconProps } from '@fluentui/react/lib/Icon';
import { ImageFit } from '@fluentui/react/lib/Image';
//import { TestImages } from '@fluentui/example-data';
import { ISearchColleaguesProps } from '../ISearchColleaguesProps';
import { Person } from '../Persona/Person';

const cardStyles: IDocumentCardStyles = {
  root: { display: 'inline-block', marginRight: 10, marginBottom: 10, width: 300, maxWidth: 280 },
};

export const PersonCard: React.FC<ISearchColleaguesProps> = ({allUsers, filteredUsers, ...props}) => {
  //const { absoluteSiteUrl } = props;
  //console.log(absoluteSiteUrl);

  const users = filteredUsers && filteredUsers.length > 0 ? filteredUsers : allUsers;
  
  return (
    <>
    {users?.map((colleagues: any) => {
      return  <DocumentCard key={colleagues.Id}
        aria-label={
          'Document Card with image. How to make a good design. ' +
          'Last modified by Annie Lindqvist and 2 others in March 13, 2018.'
        }
        styles={cardStyles}
        onClickHref="http://bing.com"
      >
       {colleagues.userPrincipalName &&
        <DocumentCardImage 
        height={140} 
        imageFit={ImageFit.cover} 
        styles={{root:  { display: 'inline-block', width:'50%', height: '80%', borderRadius: '100px', marginTop: '10px' }}}
        imageSrc={colleagues.userPrincipalName && `https://ionii.sharepoint.com/_layouts/15/userphoto.aspx?size=L&username=${encodeURIComponent(colleagues.userPrincipalName.toLowerCase())}`}
        />
        }
        <DocumentCardDetails>
          <DocumentCardTitle title={colleagues.displayName} shouldTruncate />
          <Person
                text={colleagues?.jobTitle}
                secondaryText={colleagues?.department}
               // tertiaryText={colleagues?.onPremisesExtensionAttributes?.[extensionAttributeValue]}
                optionaltext={colleagues?.officeLocation}
                userEmail={colleagues?.mail === null ? colleagues.userPrincipalName : colleagues?.mail}
                //pictureUrl={colleagues?.pictureUrl}
                //size={PersonaSize.size40}
              />
        </DocumentCardDetails>
        {/* <DocumentCardActivity activity="Modified March 13, 2018" people={people.slice(0, 3)} /> */}
     
      </DocumentCard>
    
    })}
      
    </>
  );
};
