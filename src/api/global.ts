import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

let globalToken: string | null = null;

/**
 * Set the global token
 * @param token - The token to set globally
 */
export const setGlobalToken = (token: string) => {
  globalToken = token;
};

/**
 * Get the global token
 * @returns The global token
 */
export const getGlobalToken = (): string | null => {
  return globalToken;
};


let globalUserID: number | null = null;

/**
 * Set the global user ID
 * @param userID - The user ID to set globally
 */
export const setGlobalUserID = (userID: number) => {
  globalUserID = userID;
};
/**
 * Get the global user ID
 * @returns The global user ID
 */
export const getGlobalUserID = (): number | null => {
  return globalUserID;
};



