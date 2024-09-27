export interface User {
  _id?: string;
  userId: string;
  email: string;
  name?: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  about?: string;
  avatar?: string;
  linkedin?: string;
	facebook?: string;
	instagram?: string;
	twitter?: string;
  isVerified: boolean;
  token?: string;
  createdAt?: string; 
  isAuthenticated?: boolean;
  isSuperAdmin?: boolean;
  role?: string;
  accountPin?: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
}