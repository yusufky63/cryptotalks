import {StyleSheet} from "react-native";
import {colors} from "../../utils/style/colors";

const base_styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 10,
    margin: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
  },
  IconName: {
    flex: 1,
    flexDirection: "row",
  },
});

export default {
  primary: StyleSheet.create({
    ...base_styles,
    container: {
      ...base_styles.container,
      backgroundColor: colors.primary,
    },
    title: {
      ...base_styles.title,
      color: colors.secondary,
    },
  }),
  ...base_styles,
  secondary: StyleSheet.create({
    container: {
      ...base_styles.container,
      backgroundColor: colors.secondary,
    },
    title: {
      ...base_styles.title,
      color: colors.primary,
    },
  }),
};
