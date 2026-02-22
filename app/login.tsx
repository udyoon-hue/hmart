import { Redirect } from "expo-router";
import { Text, View } from "react-native";


export default function Login() {
  //const insets = useSafeAreaInsets();
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />; //강제적으로 경로를 설정합니다
  }
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}
