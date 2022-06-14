import { Dimensions, Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  queueListBox: {
    width: (Dimensions.get("window").width * 9) / 10,
    height:
      Platform.OS === "ios"
        ? (Dimensions.get("window").height * 8) / 10 + 25
        : (Dimensions.get("window").height * 8) / 10,
    paddingTop: 0,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 16,
    borderRadius: 20,
  },
  queuePageDetails: {
    width: (Dimensions.get("window").width * 9) / 10,
    height:
      Platform.OS === "ios"
        ? (Dimensions.get("window").height * 8) / 10 + 25
        : (Dimensions.get("window").height * 8) / 10,
    paddingTop: 0,

    padding: 16,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  queueListContainerHeader: {
    top: 0,
    backgroundColor: "gainsboro",
    padding: 20,
    marginLeft: -15,
    marginRight: -15,
  },
  queueTextTag: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    padding: 5,
    textAlign: "left",
  },
  noteTag: {
    color: "red",
    fontWeight: "bold",
    fontSize: 25,
    padding: 5,
    textAlign: "left",
  },
  noteText: { color: "red", fontSize: 25, padding: 5, textAlign: "left" },
  queueText: {
    color: "white",
    fontSize: 25,
    padding: 5,
    textAlign: "left",
  },
});
export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    width: (Dimensions.get("window").width * 8) / 10,
    height:
      Platform.OS === "ios"
        ? (Dimensions.get("window").height * 5) / 12 + 25
        : (Dimensions.get("window").height * 5) / 12,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 20,
    padding: 16,
  },
  registerBox: {
    width: (Dimensions.get("window").width * 8) / 10,
    height:
      Platform.OS === "ios"
        ? (Dimensions.get("window").height * 2) / 3 + 25
        : (Dimensions.get("window").height * 2) / 3,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 20,
    padding: 16,
  },
  formHeader: {
    color: "rgb(67, 89, 110)",
    textAlign: "center",
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "400",
  },
  formBox: {
    borderColor: "rgb(206, 212, 218)",
    borderStyle: "solid",
    borderRadius: 4,
    backgroundColor: "#FFF",
    color: "rgb(33,37,41)",
    padding: 10,
    textAlign: "left",
    marginBottom: 15,
    marginTop: 10,
  },
  formRedirectionText: {
    color: "rgb(46,49,146)",
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  formSubmitButton: {
    elevation: 8,
    backgroundColor: "rgb(32, 36, 81)",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  formSubmitButtonDisabled: {
    elevation: 8,
    backgroundColor: "rgba(32, 36, 81,0.5)",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  formSubmitButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
