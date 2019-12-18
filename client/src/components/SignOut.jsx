import React from 'react';

import { withFirebase } from './Firebase/context';

const SignOut = ({ firebase }) => {
  return (
    <div>
      <button type='button' onClick={firebase.doSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default withFirebase(SignOut);
