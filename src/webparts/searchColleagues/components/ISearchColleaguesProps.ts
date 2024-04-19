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
  onSelectedRegion?:  (query: string) => void;
  onSelectedLocation?: (query: string) => void;
  onSelectedDepartment?:(query: string) => void;
  onHandleResetRegion?:(query: any) => void;
  onHandleResetLocation?:(query: any) => void;
  onHandleResetDepartment?:(query: any) => void;
  fetchedUsers?: any[];
  filteredUsers?: any[];
  onSelectedLimit?: any;
  onRegionChange?: string;
  onLocationChange?:string;
  disabled?: boolean;
  checked?: boolean;
  onReset?:any;
  onResetRegion?: any;
  onResetLocation?: any;
  onResetDepartment?:any;
}
