import React, { useState } from 'react';
import { View } from "react-native";
import {
  Title,
  Text,
  withTheme,
  TextInput
} from "react-native-paper";

const Asf = props => {

  const [asf, setAsf] = useState("");

  function validateAsf(text) {
    //range must be from 0.88 to 1.59
    if (parseInt(text.charAt(0)) === 0 || parseInt(text.charAt(0)) === 1) {
      if (parseInt(text.length) === 1) {
        setAsf(text);
        props.asfValue(text);
      } else if (parseInt(text.length) === 2) {
        if (text.charAt(1) === ".") {
          setAsf(text);
          props.asfValue(text);
        }
      } else if (parseInt(text.length) === 3) {
        if ((parseInt(text.charAt(2)) >= 0 && parseInt(text.charAt(2)) <= 5) ||
          (parseInt(text.charAt(2)) >= 8 && parseInt(text.charAt(2)) <= 9)) {
          setAsf(text);
          props.asfValue(text);
        }
      } else if (parseInt(text.length) === 4) {
        if (parseInt(text.charAt(2)) === 8 &&
          (parseInt(text.charAt(3)) >= 8 && parseInt(text.charAt(3)) <= 9)) {
          setAsf(text);
          props.asfValue(text);
        } else if (parseInt(text.charAt(2)) === 9) {
          setAsf(text);
          props.asfValue(text);
        }
        else if (parseInt(text.charAt(2)) >= 0 && parseInt(text.charAt(2)) <= 5) {
          setAsf(text);
          props.asfValue(text);
        }
      }
    }
    //edge case, user wrote the age and the deleted it
    //reset the view to its original
    if (parseInt(text.length) === 0) {
      setAsf("");
      props.asfValue(null);
    }
  }

  return (
    <View>
      <Title>
        Please input your ASF.
      </Title>
      <TextInput
        mode="outlined"
        label="ASF"
        value={asf}
        onChangeText={(text) => validateAsf(text)}
        keyboardType="numeric"
        onBlur={() => {
          if ((parseInt(asf.charAt(0)) == 0 && parseInt(asf.length) <= 2) ||
            parseFloat(asf) < 0.88 ||
            (parseInt(asf.charAt(0)) == 1 && parseInt(asf.length) == 2)) {
            setAsf("");
            props.asfValue(null);
          }
        }} />
      <Text>
        ASF must be from 0.88 to 1.59.
      </Text>
    </View>
  );
}

export default withTheme(Asf);