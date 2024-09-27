export const setAuthToken = (token: string): void => {
    localStorage.setItem("user_token", token);
    document.cookie = `authToken=${token}; path=/; secure`;
  };
  
  export const getAuthToken = (): string | null => {
    return localStorage.getItem("user_token");
  };
  
  export const removeAuthToken = (): void => {
    localStorage.removeItem("user_token");
    document.cookie = `authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure`;
  };
  