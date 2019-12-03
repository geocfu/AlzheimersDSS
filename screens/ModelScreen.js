import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import {
  Button,
  Appbar,
  Paragraph,
  Dialog,
  Portal,
  withTheme,
} from "react-native-paper";

import Spacer from "../components/Spacer";

import Group from "../components/Model/Attributes/Group";
import Mrdelay from "../components/Model/Attributes/Mrdelay";
import Mmse from "../components/Model/Attributes/Mmse";
import Etiv from "../components/Model/Attributes/Etiv";
import Nwbv from "../components/Model/Attributes/Nwbv";
import Sex from "../components/Model/Attributes/Sex";

import FromAge60To96 from "../components/Model/Trees/FromAge60To96";

const ModelScreen = props => {

  const [group, setGroup] = useState(null);
  const [mrdelay, setMrdelay] = useState(null);
  const [mmse, setMmse] = useState(null);
  const [etiv, setEtiv] = useState(null);
  const [nwbv, setNwbv] = useState(null);
  const [sex, setSex] = useState(null);

  const [showResultsButtonIsDisabled, setShowResultsButtonIsDisabled] = useState(true);
  const [showResultsDialogIsVisible, setShowResultsDialogIsVisible] = useState(false);
  const [showResultsDialogText, setShowResultsDialogText] = useState("");

  useEffect(() => {
    if (group && mrdelay && mmse && etiv && nwbv && sex) {
      setShowResultsButtonIsDisabled(false);
    } else {
      setShowResultsButtonIsDisabled(true);
    }
  });

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
    spacer: {
      marginTop: 50,
    },
    activity: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    button: {
      marginTop: 20,
    }
  });

  function showResults() {

    let result = "";
    let resultLetterToText = "";
    let numberOfInstancesFromAge60To96 = 373;
    let returnedValueParts;

    // FromAge60To98("demented", 100, 4, 21, props.navigation.state.params)
    // FromAge60To98(group, mrdelay, ses, mmse, props.navigation.state.params)
    let returnedValueFromAge60To96Tree =
      FromAge60To96(group, nwbv, etiv, mrdelay, sex, mmse, props.navigation.state.params);

    if (returnedValueFromAge60To96Tree.substring(0, 1) == "a") {
      resultLetterToText = "Normal";
    } else if (returnedValueFromAge60To96Tree.substring(0, 1) == "b") {
      resultLetterToText = "Very Mild Dementia";
    } else if (returnedValueFromAge60To96Tree.substring(0, 1) == "c") {
      resultLetterToText = "Mild Dementia";
    }

    result += (
      "Longitudinal MRI Data in Nondemented and Demented Older Adults:" +
      "\n" +
      "\n" +
      "\t" + "Result = " + resultLetterToText
    );

    if (returnedValueFromAge60To96Tree.includes("/")) {
      returnedValueParts = returnedValueFromAge60To96Tree.slice(2, -1).split("/");

      result += (
        "\n" +
        "\t" + "Coverage = " + (returnedValueParts[0] / numberOfInstancesFromAge60To96) +
        "\n" +
        "\t" + "Accuracy = " + ((returnedValueParts[0] - returnedValueParts[1]) / returnedValueParts[0])
      );
    } else {
      let returnedValue = returnedValueFromAge60To96Tree.slice(2, -1);

      result += (
        "\n" +
        "\t" + "Coverage: " + (returnedValue / numberOfInstancesFromAge60To96) +
        "\n" +
        "\t" + "Accuracy: " + "not available"
      );
    }

    setShowResultsDialogText(result);
    setShowResultsDialogIsVisible(true);
  }

  return (
    <SafeAreaView
      style={styles.container}>
      <StatusBar
        backgroundColor="#6979D1"
        barStyle="light-content" />
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => props.navigation.goBack()}
        />
        <Appbar.Content
          title="Alzheimer's DSS"
          subtitle="All about your health" />
      </Appbar.Header>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View
          style={styles.content}>
          <Group groupValue={value => { setGroup(value) }} />
          <Spacer />
          <Mrdelay mrdelayValue={value => { setMrdelay(value) }} />
          <Spacer />
          <Sex sexValue={value => { setSex(value) }} />
          <Spacer />
          <Mmse mmseValue={value => { setMmse(value) }} />
          <Spacer />
          <Etiv etivValue={value => { setEtiv(value) }} />
          <Spacer />
          <Nwbv nwbvValue={value => { setNwbv(value) }} />
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => showResults()}
            disabled={showResultsButtonIsDisabled}>
            Show results
          </Button>
        </View>
        <View>
          <Portal>
            <Dialog
              visible={showResultsDialogIsVisible}
              onDismiss={() => { setShowResultsDialogIsVisible(false) }}>
              <Dialog.Title>Results</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  {showResultsDialogText}
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => {
                  setShowResultsDialogIsVisible(false);
                  setShowResultsDialogText("");
                  showResultsDialogText
                }}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

ModelScreen.navigationOptions = {
  header: null,
};

export default withTheme(ModelScreen);

