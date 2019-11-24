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
    let numberOfInstancesFromAge60To98 = 373;

    if (groupAndMrdelayAreVisible) {

      let firstPartFromAge18To98 = FromAge18To98(2, 24, 2003, 0.65, 0.89, props.navigation.state.params)

      let firstPartFromAge60To98 =
        FromAge60To98("demented", 100, 4, 30, props.navigation.state.params)
          .slice(2, -1)
          .split("/");
      let coverageFromAge60To98 = firstPartFromAge60To98[0] / numberOfInstancesFromAge60To98;
      let accuracyFromAge60To98 = (firstPartFromAge60To98[0] - firstPartFromAge60To98[1]) / firstPartFromAge60To98[0];
      setShowResultsDialogText(
        "Coverage: " + coverageFromAge60To98 +
        "\n" +
        "Accuracy: " + accuracyFromAge60To98
      )

      setShowResultsDialogIsVisible(true);

      // FromAge18To98(ses, mmse, etiv, nwbv, asf, props.navigation.state.params)

    } else {
      //console.log(FromAge18To98(ses, mmse, etiv, nwbv, asf));
    }
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
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => showResults()}>
            Show results
          </Button>
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
                <Button onPress={() => { setShowResultsDialogIsVisible(false) }}>Done</Button>
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

