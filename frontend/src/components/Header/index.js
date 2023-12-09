import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from '@react-navigation/native';

const StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header({ name, showValue, setShowValue, id, email }) {
  const navigation = useNavigation();

  const handleProfile = () => {
    navigation.navigate('Profile', { name, id, email });
  };

  const firstName = name.split(' ')[0];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.userNme}>Hello, {firstName}</Text>

        <View style={styles.icons}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => setShowValue(!showValue)}>
            <FontAwesomeIcon
              icon={showValue ? faEye : faEyeSlash}
              size={24}
              style={styles.passwordIcon} color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser} onPress={handleProfile}>
            <FontAwesomeIcon icon={faUser} size={27} color="#fff" />
          </TouchableOpacity>
        </View>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(233, 113, 121)",
    paddingTop: StatusBarHeight,
    flexDirection: "row",
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 44,
  },
  content: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30
  },
  userNme: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonUser: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  },
});