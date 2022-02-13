/* 
 * Use Context manages the global state in React
 * Documentation: https://reactjs.org/docs/context.html
 *  -replaces need for React Redux
 *  -share info across component tree, like theme, language preference, current auth user,etc. 
 * Consider Component Composition vs Context or Inheritance where appropriate:
 * Documentation: https://reactjs.org/docs/composition-vs-inheritance.html
*/

import React, { useState } from "react";

const UserContext = React.createContext([{}, () => {}]);

let initialState = {};

const UserProvider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };