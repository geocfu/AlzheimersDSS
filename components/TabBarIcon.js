import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { withTheme } from 'react-native-paper';

const TabBarIcon = props => {
  const { colors } = props.theme;
  return (
    <MaterialIcons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? colors.primary : colors.text}
    />
  );
}

export default withTheme(TabBarIcon);
