import {StyleSheet} from "react-native";
import {colors} from "../../utils/style/colors";
import {Dimensions} from "react-native";
const base_styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    maxWidth: Dimensions.get("window").width * 0.8,
    alignItems: "center",
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default {
  ...base_styles,
  primary: StyleSheet.create({
    ...base_styles,
    container: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
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
    avatar: {
      ...base_styles.avatar,
      justifyContent: "center",
      alignItems: "center",
    },
  }),
  secondary: StyleSheet.create({
    ...base_styles,
    container: {
      flexDirection: "row",

      justifyContent: "space-between",
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
    avatar: {
      ...base_styles.avatar,
      justifyContent: "center",
      alignItems: "center",
    },
  }),
};
