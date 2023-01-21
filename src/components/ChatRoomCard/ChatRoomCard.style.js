import {StyleSheet} from "react-native";
import {colors} from "../../utils/style/colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: colors.primary,
  },
  container_main: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  container_body: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.secondary,
  },
  password: {
    color: "#fff",
    backgroundColor: "red",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 1,
    paddingHorizontal: 5,
    fontSize: 15,
  },
  nopassword: {
    color: "#fff",
    backgroundColor: "green",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 1,
    paddingHorizontal: 5,
    fontSize: 15,
  },
  createdName: {
    fontSize: 10,
    color: colors.secondary,
  },

  userCount: {
    alignContent: "flex-end",
    fontSize: 10,
    color: colors.secondary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
