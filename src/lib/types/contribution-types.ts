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

  export interface Character {
    name: string;
    _id: string;
  }
  
  export interface Lore {
    bookno: number;
    charactersinv: Character | string;
    lat: number;
    lng: number;
    lore: string;
    contributor: User | string;
    nation: string;
    _id: string;
    images: string[];
}

export interface DataSet {
  labels: string[];
  datasets: [{values: number[] }];
}