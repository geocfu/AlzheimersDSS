import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import {
  Button,
  Appbar,
  TextInput,
  Title,
  Text,
} from 'react-native-paper';
import { withTheme } from 'react-native-paper';

const HomeScreen = props => {

  //debugging, to be removed
  useEffect(() => {
    //props.navigation.navigate("Model", 60)
  });

  const [ageNumber, setAgeNumber] = useState("");

  const [continueButtonIsDisabled, setContinueButtonIsDisabled] = useState(true);

  const { colors } = props.theme;

  const halfDimension = '50%';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      marginTop: halfDimension,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    },
  });

  return (
    <SafeAreaView
      style={styles.container}>
      <StatusBar
        backgroundColor="#6979D1"
        barStyle="light-content"/>
      <Appbar.Header>
        <Appbar.Content
          title="Alzheimer's DSS"
          subtitle="All about your health"/>
      </Appbar.Header>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View
          style={styles.content}>
  
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

export default withTheme(HomeScreen);

