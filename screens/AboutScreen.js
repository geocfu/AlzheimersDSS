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
  List,
  withTheme,
} from 'react-native-paper';

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

  return (
    <SafeAreaView
      style={styles.container}>
      <StatusBar
        backgroundColor="#6979D1"
        barStyle="light-content"/>
      <Appbar.Header>
        <Appbar.Content
          title="Alzheimer's DSS"/>
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

AboutScreen.navigationOptions = {
  header: null,
};

export default withTheme(AboutScreen);

