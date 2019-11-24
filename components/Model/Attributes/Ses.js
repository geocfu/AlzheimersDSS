import React, { useState } from 'react';
import { View } from "react-native";
import {
  Title,
  Text,
  withTheme,
  TextInput
} from "react-native-paper";

const Ses = props => {

  const [ses, setSes] = useState("");

  function validateSes(text) {
    //range must be from 1 to 5
    if (/^[-+]?\d+$/.test(text) && (text >= 1 && text <= 5)) {
      setSes(text);
      props.sesValue(text);
      return;
    }
    //edge case, user wrote the age and the deleted it
    //reset the view to its original
    if (text.length === 0) {
      setSes("");
      props.sesValue(null);
    }
  }

  return (
    <View>
      <Title>
        Please input your SES.
      </Title>
      <TextInput
        mode="outlined"
        label="SES"
        value={ses}
        onChangeText={(text) => validateSes(text)}
        keyboardType="numeric" />
      <Text>
        SES must be from 1 to 5.
      </Text>
    </View>
  );
}

export default withTheme(Ses);