import { createContext } from "react";

const SettingContext = createContext();

export const SettingProvider = SettingContext.Provider;
export const SettingConsumer = SettingContext.Consumer;

export default SettingContext;