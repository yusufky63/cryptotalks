import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {flex: 1},
  title: {},
  container_inner: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  createdRoom: {
    flex: 1,
    flexDirection: "row",
    padding: 10,

    borderRadius: 10,
    margin: 5,
  },
  flatList: {
    width: "100%",
    height: "85%",
  },
  header: {
justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "gray",
  },
  headerText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
});
