import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import React, { useState } from 'react';

import AppNavigator from './navigation/AppNavigator';

const App = props => {

  const [isLoading, setLoading] = useState(true);

  async function loadResourcesAsync() {
    await Promise.all([
      Asset.loadAsync([
        //require('./assets/images/default-monochrome.png'),
      ]),
    ]);
  }

  if (isLoading && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
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