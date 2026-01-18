export interface IUser {
  id: number;
  firstName: string;
   lastName: string;

  email?: string;
  role: "USER" | "PROVIDER" | "ADMIN";
  providerType?: string;
}
