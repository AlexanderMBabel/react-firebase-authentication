import React from 'react';
const FirebaseContext = React.createContext(null);

export const withFirebase = BaseComponent => props => (
  <FirebaseContext.Consumer>
    {firebase => <BaseComponent {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);
export default FirebaseContext;
