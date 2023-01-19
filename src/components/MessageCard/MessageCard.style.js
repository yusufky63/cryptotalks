import {StyleSheet} from "react-native";
import {colors} from "../../utils/style/colors";
import {Dimensions} from "react-native";
const base_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    maxWidth: Dimensions.get("window").width * 0.8,
  },
  title: {
    fontSize: 12,
    color: "green",
  },
  text: {
    fontSize: 18,
    margin: 5,
  },
  date: {
    fontSize: 12,
  },
});

export default {
  ...base_styles,
  primary: StyleSheet.create({
    ...base_styles,
    container: {
      ...base_styles.container,

      alignSelf: "flex-end",
    },
    title: {
      ...base_styles.title,
    },
    text: {...base_styles.text},
    date: {
      ...base_styles.date,
      alignSelf: "flex-end",
      fontSize: 12,
    },
  }),
  secondary: StyleSheet.create({
    ...base_styles,
    container: {
      ...base_styles.container,

      alignSelf: "flex-start",
    },
    title: {
      ...base_styles.title,
      color: "red",
    },
    text: {...base_styles.text},
    date: {
      ...base_styles.date,
      fontSize: 12,
      alignSelf: "flex-end",
    },
  }),
};
