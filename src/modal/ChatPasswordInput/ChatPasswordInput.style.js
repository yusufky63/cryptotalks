import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
   
    backgroundColor: "#fff",
 
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  title: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 900,
    textAlign: "center",
    color: "#000",
  },
  container_inner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 5,
  },
});
