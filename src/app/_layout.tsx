import { Stack } from 'expo-router';
import { PortalHost } from '@rn-primitives/portal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'YangRenDongZhuShiTi-Semibold': {
      uri: 'https://resource-static.bj.bcebos.com/fonts/YangRenDongZhuShiTi-Semibold.ttf',
    },
    'YangRenDongZhuShiTi-Regular': {
      uri: 'https://resource-static.bj.bcebos.com/fonts/YangRenDongZhuShiTi-Regular.ttf',
    },
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="character" />
        <Stack.Screen name="wish" />
        <Stack.Screen name="round1" />
        <Stack.Screen name="round2" />
        <Stack.Screen name="round3" />
        <Stack.Screen name="round4" />
        <Stack.Screen name="round5" />
        <Stack.Screen name="round6" />
        <Stack.Screen name="result" />
      </Stack>
      <PortalHost />
    </GestureHandlerRootView>
  );
}
