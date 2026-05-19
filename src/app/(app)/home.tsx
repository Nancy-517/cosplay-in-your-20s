import { Text, TouchableOpacity, View } from 'react-native';

import { supabase } from '@/client/supabase';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white gap-4">
      <Text className="text-base text-gray-800">Open up app/index.tsx to start working on your app!</Text>
      <TouchableOpacity
        className="bg-black rounded-lg px-6 py-3"
        onPress={() => supabase.auth.signOut()}
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
