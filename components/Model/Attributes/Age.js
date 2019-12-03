import React, { useState } from 'react';
import { View } from "react-native";
import {
  Title,
  Text,
  withTheme,
  TextInput
} from "react-native-paper";

const Age = props => {

  const [age, setAge] = useState("");

  function validateAge(text) {
    //range must be from 60 to 96
    if (parseInt(text.charAt(0)) >= 6 && parseInt(text.charAt(0)) <= 8) {
      if (parseInt(text.length) === 1) {
        setAge(text);
        props.ageValue(text);
      } else if (parseInt(text.length) === 2 &&
        (parseInt(text.charAt(1)) >= 0 && parseInt(text.charAt(1)) <= 9)) {
        setAge(text);
        props.ageValue(text);
      }
    } else if (parseInt(text.charAt(0)) === 9) {
      if (parseInt(text.length) === 1) {
        setAge(text);
        props.ageValue(text);
      } else if (parseInt(text.length) === 2 &&
        (parseInt(text.charAt(1)) >= 0 && parseInt(text.charAt(1)) <= 6)) {
        setAge(text);
        props.ageValue(text);
      }
    }
    //edge case, user wrote the age and the deleted it
    //reset the view to its original
    if (text.length === 0) {
      setAge("");
      props.ageValue(null);
    }
  }

  return (
    <View>
      <Title>
        Please input your age.
      </Title>
      <TextInput
        mode="outlined"
        label="Age"
        value={age}
        onChangeText={(text) => validateAge(text)}
        keyboardType="numeric"
        onBlur={() => {
          if (parseInt(age.length) === 1) {
            setAge("");
            props.ageValue(null);
          }
        }} />
      <Text>
        Age must be between 60 and 96.
      </Text>
    </View>
  );
}

export default withTheme(Age);