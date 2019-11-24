import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ModelScreen from '../screens/ModelScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Model: ModelScreen,
  },
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={"home"}
    />
  ),
};

const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
  },
);

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={"info"}
    />
  ),
};

const ModelStack = createStackNavigator(
  {
    Model: ModelScreen,
  },
);


const MainTabNavigator = createBottomTabNavigator({
    HomeStack,
    AboutStack,
  },
  {
    tabBarOptions: {
      //color hardcoded to match theme.primary TODO: try to pass the theme as props
      activeTintColor: "#06a0b4",
      //color hardcoded to match theme.text TODO: try to pass the theme as props
      inactiveTintColor: "#FFFFFF",
    }
  }
);

export default MainTabNavigator;