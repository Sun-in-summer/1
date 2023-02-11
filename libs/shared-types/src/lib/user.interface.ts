import { UserRole } from "./user-role.enum.js";

export interface User {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  birthDate: Date;
  avatar: string;
  role: UserRole
  passwordHash: string;
  isSubscribed: boolean;
}
