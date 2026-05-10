import { createContext } from "react";
import counterstore from "./counterstore";
import { UiStore } from "./uiStore";

interface Store{
    counterStore: counterstore
    uiStore: UiStore
}

export const store: Store = {
    counterStore: new counterstore(),
    uiStore: new UiStore()
}

export const StoreContext = createContext(store);
