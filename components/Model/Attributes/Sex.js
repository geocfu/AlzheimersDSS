import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import {
  Title,
  RadioButton,
  Paragraph,
  withTheme
} from "react-native-paper";

const Sex = props => {

  const [sex, setSex] = useState("");

  const styles = StyleSheet.create({
    activity: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
  });

  return (
    <View>
      <Title>
        Please input your Sex.
      </Title>
      <RadioButton.Group
        onValueChange={
          value => {
            setSex(value);
            //return to the parent component the value from the radio buttons
            props.sexValue(value);
          }
        }
        value={sex}>
        <View
          style={styles.activity}>
          <RadioButton
            value="M" />
          <Paragraph>Male</Paragraph>
        </View>
        <View
          style={styles.activity}>
          <RadioButton
            value="F" />
          <Paragraph>Female</Paragraph>
        </View>
      </RadioButton.Group>
    </View>
  );
}

export default withTheme(Sex);