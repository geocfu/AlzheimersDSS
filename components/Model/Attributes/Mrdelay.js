import React, { useState, useEffect } from 'react';
import { View } from "react-native";
import {
  Title,
  Text,
  withTheme,
  TextInput
} from "react-native-paper";

const Mrdelay = props => {

  const [mrdelay, setMrdelay] = useState("");

  function validateMrdelay(text) {
    //range must be from 0 to 2639
    if (/^[-+]?\d+$/.test(text) && (text >= 0 && text <= 2639)) {
      setMrdelay(text);
      props.mrdelayValue(text);
      return;
    }
    //edge case, user wrote the age and the deleted it
    //reset the view to its original
    if (text.length === 0) {
      setMrdelay("");
      props.mrdelayValue(null);
    }
  }

  return (
    <View>
      <Title>
        Please input your MR Delay (Time).
      </Title>
      <TextInput
        mode="outlined"
        label="MR delay"
        value={mrdelay}
        onChangeText={(text) => validateMrdelay(text)}
        keyboardType="numeric" />
      <Text>
        MR delay must be from 0 to 2639.
      </Text>
    </View>
  );
}

export default withTheme(Mrdelay);