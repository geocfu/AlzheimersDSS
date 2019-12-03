import React, { useState } from 'react';
import { View } from "react-native";
import {
  Title,
  Text,
  withTheme,
  TextInput
} from "react-native-paper";

const Etiv = props => {

  const [etiv, setEtiv] = useState("");

  function validateEtiv(text) {
    //range must be from 1106 to 2004
    if (parseInt(text.charAt(0)) === 1) {
      //first digit is 1
      if (parseInt(text.length) === 1) {
        setEtiv(text);
        props.etivValue(text);
      } else if (parseInt(text.length) === 2 &&
        (parseInt(text.charAt(1)) >= 1 && parseInt(text.charAt(1)) <= 9)) {
        setEtiv(text);
        props.etivValue(text);
      } else if (parseInt(text.length) === 3 &&
        (parseInt(text.charAt(2)) >= 0 && parseInt(text.charAt(2)) <= 9)) {
        setEtiv(text);
        props.etivValue(text);
      } else if (parseInt(text.length) === 4 &&
        (parseInt(text.charAt(2)) === 0) &&
        ((parseInt(text.charAt(3)) >= 6 && parseInt(text.charAt(3)) <= 9))) {
        setEtiv(text);
        props.etivValue(text);
      } else if (parseInt(text.length) === 4 &&
        (parseInt(text.charAt(2)) > 0) &&
        ((parseInt(text.charAt(3)) >= 0 && parseInt(text.charAt(3)) <= 9))) {
        setEtiv(text);
        props.etivValue(text);
      }
    } else if (parseInt(text.charAt(0)) === 2) {
      //first digit is 2
      if (parseInt(text.length) === 1) {
        setEtiv(text);
        props.etivValue(text);
      } else if (parseInt(text.length) <= 3) {
        if (text.slice(-1) == 0) {
          setEtiv(text);
          props.etivValue(text);
        }
      } else if (parseInt(text.length) === 4) {
        if (parseInt(text.charAt(3)) >= 0 && parseInt(text.charAt(3)) <= 4) {
          setEtiv(text);
          props.etivValue(text);
        }
      }
    }

    //edge case, user wrote the age and the deleted it
    //reset the view to its original
    if (text.length === 0) {
      setEtiv("");
      props.etivValue(null);
    }
  }

  return (
    <View>
      <Title>
        Please input your eTIV (Estimated Total Intracranial Volume).
      </Title>
      <TextInput
        mode="outlined"
        label="eTIV"
        value={etiv}
        onChangeText={(text) => validateEtiv(text)}
        keyboardType="numeric"
        onBlur={() => {
          if (parseInt(etiv.length) < 4) {
            setEtiv("");
            props.etivValue(null);
          }
        }} />
      <Text>
        eTIV must be from 1106 to 2004.
      </Text>
    </View>
  );
}

export default withTheme(Etiv);