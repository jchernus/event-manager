export interface Roles { 
  viewer? : boolean;
  moderator? : boolean;
  admin? : boolean;
}
  
export interface User {
  uid : string;
  email : string;
  photoURL? : string;
  displayName? : string;
  roles: Roles;
}