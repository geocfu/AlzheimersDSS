import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import React, { useState } from 'react';

import AppNavigator from './navigation/AppNavigator';

const App = props => {

  const [isLoading, setLoading] = useState(true);

  if (isLoading && !props.skipLoadingScreen) {
    return (
      <AppLoading
        onFinish={() => setLoading(false)}
      />
    );
  } else {
    return (
      <AppNavigator />
    );
  }
}

export default App;