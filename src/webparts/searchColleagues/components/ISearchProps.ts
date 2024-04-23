//import { IUsers } from "@pnp/graph/users";

export interface ISearchProps {
  description?: string;
  isDarkTheme?: boolean;
  environmentMessage?: string;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  absoluteUrl?:any;
  context?: any;
  allUsers?: any[];
  onFilteredUsers?: (query: any) => void;
  onSearch?: (query: string) => void;
  onSelectedRegion?:any;
  onSelectedLocation?: (query: string) => void;
  onSelectedDepartment?:(query: string) => void;
  onHandleResetRegion?:(query: any) => void;
  onHandleResetLocation?:(query: any) => void;
  onHandleResetDepartment?:(query: any) => void;
  fetchedUsers?: any[];
  filteredUsers?: any[];
  onSelectedLimit?: any;
  onRegionChange?: any;
  onLocationChange?:string;
  disabled?: boolean;
  checked?: boolean;
  onReset?:any;
  onResetRegion?: any;
  onResetLocation?: any;
  onResetDepartment?:any;
  onFilteredByOptions?: any;
  onFilteredOptions?:any;
}
