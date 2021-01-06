export interface IGetUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: {id: number, name: string};
  organisation: {id: number, name: string};
}
