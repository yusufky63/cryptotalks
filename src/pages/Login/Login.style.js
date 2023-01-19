import {StyleSheet} from "react-native";
import {colors} from "../../utils/style/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
  title: {
    color: colors.secondary,
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  container_body: {
    marginVertical: 25,
    justifyContent: "center",
  },
});
