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
  emptyContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    margin: 5,
    padding: 5,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "gray",
    fontSize: 12,
  },
});
