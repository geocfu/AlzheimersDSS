import React, { useState } from 'react';
import { View } from "react-native";
import {
  Title,
  Text,
  withTheme,
  TextInput
} from "react-native-paper";

const Mmse = props => {

  const [mmse, setMmse] = useState("");

  function validateMmse(text) {
    //range must be from 4 to 30

    if (parseInt(text.charAt(0)) === 1 || parseInt(text.charAt(0)) === 2) {
      if (parseInt(text.length) <= 2) {
        setMmse(text);
        props.mmseValue(text);
      }
    } else if (parseInt(text.charAt(0)) === 3) {
      if (parseInt(text.length) === 1) {
        setMmse(text);
        props.mmseValue(text);
      } else if (parseInt(text.length) === 2) {
        if (parseInt(text.charAt(1)) === 0) {
          setMmse(text);
          props.mmseValue(text);
        }
      }
    } else if (parseInt(text.charAt(0)) >= 4 && parseInt(text.charAt(0)) <= 9) {
      if (parseInt(text.length) === 1) {
        setMmse(text);
        props.mmseValue(text);
      }
    }

    //edge case, user wrote the age and the deleted it
    //reset the view to its original
    if (text.length === 0) {
      setMmse("");
      props.mmseValue(null);
    }
  }

  return (
    <View>
      <Title>
        Please input your MMSE (Mini Mental State Examination).
      </Title>
      <TextInput
        mode="outlined"
        label="MMSE"
        value={mmse}
        onChangeText={(text) => validateMmse(text)}
        keyboardType="numeric"
        onBlur={() => {
          if (parseInt(mmse.length) === 1 && (parseInt(mmse.charAt(0)) >= 1 && parseInt(mmse.charAt(0)) <= 3)) {
            setMmse("");
            props.mmseValue(null);
          }
        }} />
      <Text>
        MMSE must be from 4 to 30.
      </Text>
    </View>
  );
}

export default withTheme(Mmse);