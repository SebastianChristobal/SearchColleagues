import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardImage,
  IDocumentCardStyles,
  IDocumentCardActivityPerson,
} from '@fluentui/react/lib/DocumentCard';
//import { IIconProps } from '@fluentui/react/lib/Icon';
import { ImageFit } from '@fluentui/react/lib/Image';
import { TestImages } from '@fluentui/example-data';
import { ISearchColleaguesProps } from './ISearchColleaguesProps';

const people: IDocumentCardActivityPerson[] = [
  { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
  { name: 'Roko Kolar', profileImageSrc: '', initials: 'RK' },
  { name: 'Aaron Reid', profileImageSrc: TestImages.personaMale },
  { name: 'Christian Bergqvist', profileImageSrc: '', initials: 'CB' },
];

// const oneNoteIconProps: IIconProps = {
//   iconName: 'OneNoteLogo',
//   styles: { root: { color: '#813a7c', fontSize: '120px', width: '120px', height: '120px' } },
// };

export const PersonaCard: React.FC<ISearchColleaguesProps> = ({allUsers}) => {

  console.log(allUsers);
  const cardStyles: IDocumentCardStyles = {
    root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
  };

  return (
    <>
    {allUsers?.map((colleagues) => {
      return  <DocumentCard key={colleagues.Id}
        aria-label={
          'Document Card with image. How to make a good design. ' +
          'Last modified by Annie Lindqvist and 2 others in March 13, 2018.'
        }
        styles={cardStyles}
        onClickHref="http://bing.com"
      >
        <DocumentCardImage height={150} imageFit={ImageFit.cover} imageSrc={TestImages.documentPreviewTwo} />
        <DocumentCardDetails>
          <DocumentCardTitle title={colleagues.Title} shouldTruncate />
        </DocumentCardDetails>
        <DocumentCardActivity activity="Modified March 13, 2018" people={people.slice(0, 3)} />
      </DocumentCard>
    
    })}
      
    </>
  );
};
