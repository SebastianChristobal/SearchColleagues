//import { IUsers } from "@pnp/graph/users";

export interface ISearchColleaguesProps {
  description?: string;
  isDarkTheme?: boolean;
  environmentMessage?: string;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  absoluteSiteUrl?:string;
  context?: any;
  onSearch?: (query: string) => void;
  fetchedUsers?: any[];
  filteredUsers?: any[];
  onSelectedDepartment?: any;
  onSelectedLimit?: any;
}
