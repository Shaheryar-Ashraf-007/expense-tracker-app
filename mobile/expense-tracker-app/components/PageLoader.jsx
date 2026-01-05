import { ActivityIndicator, View } from "react-native";
import { styles } from "../assets/styles/home.style.js";
import { COLORS } from "../constants/color.js";

const PageLoader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};
export default PageLoader;