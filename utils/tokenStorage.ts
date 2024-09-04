export const setAuthToken = (token: string): void => {
    localStorage.setItem("user_token", token);
  };
  
  export const getAuthToken = (): string | null => {
    return localStorage.getItem("user_token");
  };
  
  export const removeAuthToken = (): void => {
    localStorage.removeItem("user_token");
  };
  