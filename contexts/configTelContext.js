import { createContext } from "react";

const configTelContext = createContext({
    number: "",
    setNumber: (number) => {}
});

export default configTelContext;