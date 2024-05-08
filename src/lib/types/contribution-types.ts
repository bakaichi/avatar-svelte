export interface Session {
    name: string;
    _id: string;
    token: string;
  }
  
  export interface User {
    username: string;
    email: string;
    password: string;
    _id?: string;
  }