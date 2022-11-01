import { createContext } from "react";

const UserDataContext = createContext();

export const UserDataProvider = UserDataContext.Provider;
export const UserDataConsumer = UserDataContext.Consumer;

export default UserDataContext;