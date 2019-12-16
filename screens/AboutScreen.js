import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import {
  Appbar,
  List,
  withTheme,
} from 'react-native-paper';

import { Linking } from 'expo';

const AboutScreen = props => {

  const { colors } = props.theme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    },
  });

  function openInAppBrowser() {
    console.log("hello")
  }

  return (
    <SafeAreaView
      style={styles.container}>
      <StatusBar
        backgroundColor="#6979D1"
        barStyle="light-content" />
      <Appbar.Header>
        <Appbar.Content
          title="Alzheimer's DSS" />
      </Appbar.Header>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View
          style={styles.content}>
          <List.Item
            title="Version"
            description="2.0.1"
            left={props => <List.Icon {...props} icon="history" />}
          />
          <List.Item
            title="Report an issue"
            description="Having an issue? Report it here"
            left={props => <List.Icon {...props} icon="bug" />}
            onPress={() => {Linking.openURL("https://github.com/geocfu/AlzheimersDSS/issues/")}}
          />
          <List.Subheader>About</List.Subheader>
          <List.Item
            title="Source code"
            description="The source code of the app"
            left={props => <List.Icon {...props} icon="github-circle" />}
            onPress={() => {Linking.openURL("https://github.com/geocfu/AlzheimersDSS/")}}
          />
          <List.Subheader>The Team</List.Subheader>
          <List.Item
            title="Themis Exarchos"
            description="Supervisor"
            left={props => <List.Icon {...props} icon="account-supervisor" />}
          />
          <List.Item
            title="George Mantellos"
            description="Developer"
            left={props => <List.Icon {...props} icon="account" />}
          />
          <List.Item
            title="John Lavdos"
            description="Data Analyst"
            left={props => <List.Icon {...props} icon="account" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

AboutScreen.navigationOptions = {
  header: null,
};

export default withTheme(AboutScreen);

