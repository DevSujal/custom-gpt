import { createContext, useContext } from "react";

const requestResponseContext = createContext({
  data: [{
    id: String,
    request : String,
    response : String
  }],

  addData: (data) => {},
  deleteData: (id) => {},
  updateData : (id, answer) => {}
});

export const RequestResponseProvider = requestResponseContext.Provider;

export default function useRequestResponseContext() {
  return useContext(requestResponseContext);
}
