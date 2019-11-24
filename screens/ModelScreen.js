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
import Ses from "../components/Model/Attributes/Ses";
import Mmse from "../components/Model/Attributes/Mmse";
import Etiv from "../components/Model/Attributes/Etiv";
import Nwbv from "../components/Model/Attributes/Nwbv";
import Asf from "../components/Model/Attributes/Asf";

import FromAge18To98 from "../components/Model/Trees/FromAge18To98";
import FromAge60To98 from "../components/Model/Trees/FromAge60To98";

const ModelScreen = props => {

  const [group, setGroup] = useState(null);
  const [mrdelay, setMrdelay] = useState(null);
  const [ses, setSes] = useState(null);
  const [mmse, setMmse] = useState(null);
  const [etiv, setEtiv] = useState(null);
  const [nwbv, setNwbv] = useState(null);
  const [asf, setAsf] = useState(null);

  const [groupAndMrdelayAreVisible, setGroupAndMrdelayVisibility] = useState(false)
  const [showResultsButtonIsDisabled, setShowResultsButtonIsDisabled] = useState(true);
  const [showResultsDialogIsVisible, setShowResultsDialogIsVisible] = useState(false);
  const [showResultsDialogText, setShowResultsDialogText] = useState("");

  useEffect(() => {

    if (groupAndMrdelayAreVisible) {
      if (group && mrdelay && ses && mmse) {
        setShowResultsButtonIsDisabled(false);
      } else {
        setShowResultsButtonIsDisabled(true);
      }
    } else {
      if (ses && mmse && etiv && nwbv && asf) {
        setShowResultsButtonIsDisabled(false);
      } else {
        setShowResultsButtonIsDisabled(true);
      }
    }

    //show the required fields based on age
    if (props.navigation.state.params >= 60) {
      setGroupAndMrdelayVisibility(true);
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

    let numberOfInstancesFromAge18To98 = 235;
    let result = "";

    // FromAge18To98(ses, mmse, etiv, nwbv, asf, props.navigation.state.params)
    // FromAge18To98(3, 6, 1106, 0.77, 1.4, props.navigation.state.params)
    let returnedValueFromAge18To98Tree =
      FromAge18To98(3, 6, 1106, 0.77, 1.4, props.navigation.state.params)
    console.log(returnedValueFromAge18To98Tree)
    result += (
      "Cross-sectional MRI Data in Young, Middle Aged, Nondemented and Demented Older Adults:" +
      "\n" +
      "\n" +
      "\t" + "Result = " + returnedValueFromAge18To98Tree.substring(0, 1)
    );

    returnedValueGrowingSet =
      returnedValueFromAge18To98Tree
        .slice(
          returnedValueFromAge18To98Tree.indexOf("(") + 1, returnedValueFromAge18To98Tree.indexOf(")")
        )
    returnedValueGrowingSetParts = returnedValueGrowingSet.split("/");
    result += (
      "\n" +
      "\t" + "Growing set:" +
      "\n" +
      "\t" + "\t" + "Coverage = " + (returnedValueGrowingSetParts[0] / numberOfInstancesFromAge18To98) +
      "\n" +
      "\t" + "\t" + "Accuracy = " + ((returnedValueGrowingSetParts[0] - returnedValueGrowingSetParts[1]) / returnedValueGrowingSetParts[0])
    );

    returnedValuePruningSet =
      returnedValueFromAge18To98Tree
        .slice(
          returnedValueFromAge18To98Tree.indexOf("[") + 1, -1
        )
    returnedValuePruningSetParts = returnedValuePruningSet.split("/");
    result += (
      "\n" +
      "\t" + "Pruning set:" +
      "\n" +
      "\t" + "\t" + "Coverage = " +
      (returnedValuePruningSetParts[0] / numberOfInstancesFromAge18To98) +
      "\n" +
      "\t" + "\t" + "Accuracy = " +
      ((returnedValuePruningSetParts[0] != 0) ?
        ((returnedValuePruningSetParts[0] - returnedValuePruningSetParts[1]) / returnedValuePruningSetParts[0]) :
        "not available")

    );

    if (groupAndMrdelayAreVisible) {

      let numberOfInstancesFromAge60To98 = 373;
      let returnedValueParts;

      // FromAge60To98("demented", 100, 4, 21, props.navigation.state.params)
      // FromAge60To98(group, mrdelay, ses, mmse, props.navigation.state.params)
      let returnedValueFromAge60To98Tree =
        FromAge60To98(group, mrdelay, ses, mmse, props.navigation.state.params);

      result += (
        "\n" +
        "\n" +
        "\n" +
        "Longitudinal MRI Data in Nondemented and Demented Older Adults:" +
        "\n" +
        "\n" +
        "\t" + "Result = " + returnedValueFromAge60To98Tree.substring(0, 1)
      );

      if (returnedValueFromAge60To98Tree.includes("/")) {
        returnedValueParts = returnedValueFromAge60To98Tree.slice(2, -1).split("/");

        result += (
          "\n" +
          "\t" + "Coverage = " + (returnedValueParts[0] / numberOfInstancesFromAge60To98) +
          "\n" +
          "\t" + "Accuracy = " + ((returnedValueParts[0] - returnedValueParts[1]) / returnedValueParts[0])
        );
      } else {
        let returnedValue = returnedValueFromAge60To98Tree.slice(2, -1);

        result += (
          "\n" +
          "\t" + "Coverage: " + (returnedValue / numberOfInstancesFromAge60To98) +
          "\n" +
          "\t" + "Accuracy: " + "not available"
        );
      }
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
          <Group
            groupValue={value => { setGroup(value) }}
            visible={groupAndMrdelayAreVisible} />
          {groupAndMrdelayAreVisible && <Spacer />}
          <Mrdelay
            mrdelayValue={value => { setMrdelay(value) }}
            visible={groupAndMrdelayAreVisible} />
          {groupAndMrdelayAreVisible && <Spacer />}
          <Ses
            sesValue={value => { setSes(value) }} />
          <Spacer />
          <Mmse
            mmseValue={value => { setMmse(value) }} />
          <Spacer />
          <Etiv
            etivValue={value => { setEtiv(value) }} />
          <Spacer />
          <Nwbv
            nwbvValue={value => { setNwbv(value) }} />
          <Spacer />
          <Asf
            asfValue={value => { setAsf(value) }} />
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

