export interface UserType {
  avatar?: string;
  createdAt?: string;
  email?: string;
  language?: string;
  name?: string;
  otp?: number;
  phone_number?: string;
  resetPasswordToken?: string;
  roles?: number;
  updatedAt?: string;
}

export interface LoginResponseOutput {
  verifyOtp: boolean;

}

export interface DefaultProviderType {
  isAuthenticated: boolean;
  isOtpVerified: boolean;
  user: null | UserType;
  setUser: (user:UserType) => void;
  loading: boolean;
  signup: (user:any) => Promise<void>;
  logout: () => Promise<void>;
  // updateUser: (f: any) => Promise<boolean>;
  resendOTP: (email: string) => Promise<boolean>;
}
