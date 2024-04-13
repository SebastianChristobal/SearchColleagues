import { spfi, SPFx  } from "@pnp/sp";
import "@pnp/sp/site-users/web";
import "@pnp/sp/webs";
import { ISearchColleaguesProps } from "../ISearchColleaguesProps";

export const fetchUsers = async (props: ISearchColleaguesProps): Promise<any[]> => {

    if (!props || !props.context) {
        throw new Error("Props or props.context is undefined.");
    }

    const sp = spfi().using(SPFx(props.context));
    const users = await sp.web.siteUsers();
   

   return users; 
  }
