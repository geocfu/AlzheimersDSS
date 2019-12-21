import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  View
} from "react-native";
import { Button, Appbar, withTheme } from "react-native-paper";

import Age from "../components/Model/Attributes/Age";

const HomeScreen = props => {
  const [age, setAge] = useState(null);
  const [continueButtonIsDisabled, setContinueButtonIsDisabled] = useState(
    true
  );

  useEffect(() => {
    if (age && parseInt(age.length) > 1) {
      setContinueButtonIsDisabled(false);
    } else {
      setContinueButtonIsDisabled(true);
    }
  });

  const { colors } = props.theme;

  const halfHeight = "50%";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    content: {
      marginTop: halfHeight,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10
    },
    button: {
      marginTop: 20
    }
  });

  function navigateToNextScreen() {
    //set the age as route param so we can pass it to the ModelScreen
    //navigate to next screen
    props.navigation.navigate("Model", age);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6979D1" barStyle="light-content" />
      <Appbar.Header>
        <Appbar.Content
          title="Alzheimer's DSS"
          subtitle="All about your health"
        />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Age
            ageValue={value => {
              setAge(value);
            }}
          />
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigateToNextScreen()}
            disabled={continueButtonIsDisabled}
          >
            Continue
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = {
  header: null
};

export default withTheme(HomeScreen);
