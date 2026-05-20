import { View, Text, ScrollView, Pressable, TextInput, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react-native';
import { getGameState, startGame } from '@/lib/gameStore';

export default function WishScreen() {
  const router = useRouter();
  const [wish, setWish] = useState('');
  const [error, setError] = useState('');
  const state = getGameState();

  const handleProceed = () => {
    if (!wish.trim()) {
      setError('请输入你的愿望');
      return;
    }
    // 重新 startGame 带上愿望
    startGame(state.playerName, wish.trim(), [...state.secretGoals]);
    setError('');
    router.push('/round1' as any);
  };

  return (
    <KeyboardAvoidingView
      behavior={process.env.EXPO_OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: '#FDFBF7' }}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-center px-8"
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-8">
          <Sparkles size={32} color="#8B7355" />
        </View>

        <Text
          className="text-2xl text-center mb-4"
          style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
        >
          许一个愿望吧
        </Text>

        <Text
          className="text-sm text-center leading-relaxed mb-8"
          style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#888' }}
        >
          就像你刚来到大学，{"\n"}
          未谙世事，{"\n"}
          拥有所有梦想、期待与想象那样……{"\n\n"}
          <Text style={{ color: '#aaa', fontSize: 12 }}>
            （这个愿望将在结局时重新出现）
          </Text>
        </Text>

        <TextInput
          value={wish}
          onChangeText={setWish}
          placeholder="我想成为一个很厉害的人……"
          placeholderTextColor="#ccc"
          multiline
          className="p-4 rounded-2xl text-base leading-relaxed min-h-[120]"
          style={{
            fontFamily: 'YangRenDongZhuShiTi-Regular',
            color: '#333',
            backgroundColor: '#fff',
            borderColor: error ? '#cc6666' : '#e5e5e5',
            borderWidth: 1,
            borderCurve: 'continuous',
            textAlignVertical: 'top',
          }}
        />

        {error ? (
          <Text
            className="text-xs mt-2"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#cc6666' }}
          >
            {error}
          </Text>
        ) : null}

        <View className="h-8" />

        <Pressable
          onPress={handleProceed}
          className="py-4 rounded-2xl items-center flex-row justify-center gap-2"
          style={{ backgroundColor: '#333', borderCurve: 'continuous' }}
        >
          <Text
            className="text-base"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#FDFBF7' }}
          >
            踏入这场局
          </Text>
          <ArrowRight size={18} color="#FDFBF7" />
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
