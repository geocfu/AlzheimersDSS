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
    //range must be from 18 to 98
    if (parseInt(text.charAt(0)) === 1) {
      //first digit is 1
      if (parseInt(text.length) === 1) {
        setAge(text);
        props.ageValue(text);
      } else if (parseInt(text.length) === 2 &&
        (parseInt(text.charAt(1)) === 8 || parseInt(text.charAt(1)) === 9)) {
        setAge(text);
        props.ageValue(text);
      }
    } else if (parseInt(text.charAt(0)) >= 2 && parseInt(text.charAt(0)) <= 8) {
      //first digit is 2
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
        (parseInt(text.charAt(1)) >= 0 && parseInt(text.charAt(1)) <= 8)) {
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
        Age must be between 18 and 98.
      </Text>
    </View>
  );
}

export default withTheme(Age);