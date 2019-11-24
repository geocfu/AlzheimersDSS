import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import {
  Title,
  RadioButton,
  Paragraph,
  withTheme
} from "react-native-paper";

const Group = props => {
  //prevent the group from showing if the user;s age is below 60
  if (!props.visible) {
    return null;
  }

  const [group, setGroup] = useState("");

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
        Please input your Group.
      </Title>
      <RadioButton.Group
        onValueChange={
          value => {
            setGroup(value);
            //return to the parent component the value from the radio buttons
            props.groupValue(value);
          }
        }
        value={group}>
        <View
          style={styles.activity}>
          <RadioButton
            value="demented" />
          <Paragraph>Demented</Paragraph>
        </View>
        <View
          style={styles.activity}>
          <RadioButton
            value="nondemented" />
          <Paragraph>Nondemented</Paragraph>
        </View>
        <View
          style={styles.activity}>
          <RadioButton
            value="converted" />
          <Paragraph>Converted</Paragraph>
        </View>
      </RadioButton.Group>
    </View>
  );
}

export default withTheme(Group);