export interface User {
  uid: string;
  email: string;
  password?: string;
  photoURL?: string;
  phoneNumber? : string;
  signInMethod? : string;
  displayName?: string;
  createdDate?: any;
  updatedDate?: any;
}
