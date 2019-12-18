import React from 'react';

import FirebaseContext from './Firebase/context';

const Landing = () => {
  return (
    <div>
      <FirebaseContext.Consumer>
        {firebase => {
          return <div>This has access to Firebase</div>;
        }}
      </FirebaseContext.Consumer>
    </div>
  );
};

export default Landing;
