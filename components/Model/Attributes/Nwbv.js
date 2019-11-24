import React, { useState } from 'react';
import { View } from "react-native";
import {
  Title,
  Text,
  withTheme,
  TextInput
} from "react-native-paper";

const Nwbv = props => {

  const [nwbv, setNwbv] = useState("");

  function validateNwbv(text) {
    //range must be from 0.64 to 0.84
    if (parseInt(text.charAt(0)) === 0) {
      if (parseInt(text.length) === 1) {
        setNwbv(text);
        props.nwbvValue(text);
      } else if (parseInt(text.length) === 2) {
        if (text.charAt(1) === ".") {
          setNwbv(text);
          props.nwbvValue(text);
        }
      } else if (parseInt(text.length) === 3) {
        if (parseInt(text.charAt(2)) >= 6 && parseInt(text.charAt(2)) <= 8) {
          setNwbv(text);
          props.nwbvValue(text);
        }
      } else if (parseInt(text.length) === 4) {
        if (parseInt(text.charAt(2)) === 6 &&
          (parseInt(text.charAt(3)) >= 4 && parseInt(text.charAt(3)) <= 9)) {
          setNwbv(text);
          props.nwbvValue(text);
        } else if (parseInt(text.charAt(2)) === 7) {
          setNwbv(text);
          props.nwbvValue(text);
        }
        else if (parseInt(text.charAt(2)) === 8 &&
          (parseInt(text.charAt(3)) >= 0 && parseInt(text.charAt(3)) <= 4)) {
          setNwbv(text);
          props.nwbvValue(text);
        }
      }
    }
    //edge case, user wrote the age and the deleted it
    //reset the view to its original
    if (parseInt(text.length) === 0) {
      setNwbv("");
      props.nwbvValue(null);
    }
  }

  return (
    <View>
      <Title>
        Please input your nWBV.
      </Title>
      <TextInput
        mode="outlined"
        label="nWBV"
        value={nwbv}
        onChangeText={(text) => validateNwbv(text)}
        keyboardType="numeric"
        onBlur={() => {
          if (parseInt(nwbv.length) <= 2 || parseFloat(nwbv) < 0.64) {
            setNwbv("");
            props.nwbvValue(null);
          }
        }} />
      <Text>
        nWBV must be from 0.64 to 0.84.
    </Text>
    </View>
  );
}

export default withTheme(Nwbv);