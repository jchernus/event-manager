export interface Roles { 
  viewer? : boolean;
  moderator? : boolean;
  admin? : boolean;
}

var roles = [
    "Viewer",
    "Moderator",
    "Admin",
  ]
export { roles };
  
export interface User {
  uid : string;
  email : string;
  photoURL? : string;
  displayName? : string;
  roles: Roles;
}