import {StyleSheet} from "react-native";
import {colors} from "../../utils/style/colors";
import {Dimensions} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
  },
  title: {
    marginVertical: 150,
    fontSize: 40,
    fontWeight: "bold",
    color: colors.secondary,
    alignSelf: "center",
  },
  btn: {
    height: Dimensions.get("window").height * 0.09,
    marginVertical: 5,
  },
});
