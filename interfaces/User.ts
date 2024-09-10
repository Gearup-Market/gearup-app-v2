export interface User {
  _id?: string;
  userId?: string;
  email?: string;
  password?: string;
  userName?: string;
  verificationToken?: string;
  isVerified?: boolean;
  resetPasswordToken?: string;
  verificationTokenExpiry?: string; 
  createdAt?: string; 
  resetPasswordTokenExpiry?: string; 
  name?: string;
  phoneNumber?: string | number;
  token?: string;
  id?: string;
  isAuthenticated?: boolean;
  isSuperAdmin?: boolean;
  role?: string;
}