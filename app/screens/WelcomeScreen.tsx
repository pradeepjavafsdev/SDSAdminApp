import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import AppButton from "../components/Button";

const WelcomeScreen: React.FC = () => {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/welcome_background.png")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/sds_logo_1.png")}
        />
        <Text style={styles.tagline}>
          Improving Agriculture, Improving Lives.
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title="LogIn"
          onPress={() => console.log("pressed button")}
        ></AppButton>
        <AppButton
          title="Sign Up"
          onPress={() => console.log("pressed button reg")}
          color="secondary"
        ></AppButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 130,
    height: 130,
  },
  logoContainer: {
    position: "absolute",
    top: 150,
    alignItems: "center",
  },
  tagline: {
    fontSize: 17,
    fontWeight: "600",
    paddingVertical: 20,
  },
});
export default WelcomeScreen;
