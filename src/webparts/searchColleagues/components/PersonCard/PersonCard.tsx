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

// const people: IDocumentCardActivityPerson[] = [
//   { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
//   { name: 'Roko Kolar', profileImageSrc: '', initials: 'RK' },
//   { name: 'Aaron Reid', profileImageSrc: TestImages.personaMale },
//   { name: 'Christian Bergqvist', profileImageSrc: '', initials: 'CB' },
// ];

// const oneNoteIconProps: IIconProps = {
//   iconName: 'OneNoteLogo',
//   styles: { root: { color: '#813a7c', fontSize: '120px', width: '120px', height: '120px' } },
// };


export const PersonCard: React.FC<ISearchColleaguesProps> = ({allUsers, ...props}) => {
  const { absoluteSiteUrl } = props;
  
  console.log(absoluteSiteUrl);
  const cardStyles: IDocumentCardStyles = {
    root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
  };
  const users = allUsers;
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
       {colleagues.mail !== null &&  <DocumentCardImage height={200} imageFit={ImageFit.cover} imageSrc={`https://ionii.sharepoint.com/_layouts/15/userphoto.aspx?size=L&username=${encodeURIComponent(colleagues.mail.toLowerCase())}`} />}
        <DocumentCardDetails>
          <DocumentCardTitle title={colleagues.displayName} shouldTruncate />
          <Person
                text={colleagues?.jobTitle}
                secondaryText={colleagues?.officeLocation}
               // tertiaryText={colleagues?.onPremisesExtensionAttributes?.[extensionAttributeValue]}
               optionaltext={colleagues?.mail === null ? colleagues.userPrincipalName : colleagues?.mail}
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
