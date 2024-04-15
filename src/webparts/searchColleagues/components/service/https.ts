import { ISearchColleaguesProps } from '../ISearchColleaguesProps';

export const fetchUsers = async (props: ISearchColleaguesProps): Promise<any[]> => {
    if (!props || !props.context || !props.context.msGraphClientFactory) {
        throw new Error("Props or props.context or props.context.msGraphClientFactory is undefined.");
    }

    try {
        const graphClient = await props.context.msGraphClientFactory.getClient();
        
        if (!graphClient.api) {
            throw new Error("graphClient.api is not available. Ensure that the msGraphClientFactory is configured correctly.");
        }

        const response = await graphClient
        .api('/users')
        .version('v1.0')
        .select('businessPhones,displayName,givenName,id,jobTitle,mail,mobilePhone,officeLocation,preferredLanguage,surname,userPrincipalName,department')
        .get();
        return response.value;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};