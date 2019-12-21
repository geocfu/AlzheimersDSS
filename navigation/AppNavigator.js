import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider as PaperProvider, DarkTheme } from "react-native-paper";

import MainTabNavigator from "./MainTabNavigator";

const AppNavigator = () => {
  const theme = {
    ...DarkTheme,
    mode: "adaptive",
    roundness: 4,
    colors: {
      ...DarkTheme.colors,
      primary: "#06a0b4"
    }
  };

  const Navigation = createAppContainer(
    createSwitchNavigator({
      //auth screen if needed
      Main: MainTabNavigator
    })
  );

  return (
    <PaperProvider theme={theme}>
      <Navigation theme="dark" />
    </PaperProvider>
  );
};

export default AppNavigator;
