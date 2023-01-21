import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    marginVertical: "5%",
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
