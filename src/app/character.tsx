import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Users, ChevronRight, Eye, EyeOff } from 'lucide-react-native';
import { NPCS, SECRET_GOALS, INITIAL_RESOURCES } from '@/lib/gameData';
import { startGame } from '@/lib/gameStore';

export default function CharacterScreen() {
  const router = useRouter();
  const [showSecrets, setShowSecrets] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const playerName = '你自己';

  const goals = SECRET_GOALS.slice(0, 4);

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else if (selectedGoals.length < 2) {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleStart = () => {
    if (selectedGoals.length === 0) {
      // 随机选两个
      const randomGoals = [goals[0], goals[1]];
      startGame(playerName, '', randomGoals);
    } else {
      startGame(playerName, '', selectedGoals);
    }
    router.push('/wish');
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: '#FDFBF7' }}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Header */}
      <View className="px-6 pt-16 pb-4">
        <Text
          className="text-2xl"
          style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
        >
          进入角色
        </Text>
        <Text
          className="text-sm mt-2 leading-relaxed"
          style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#888' }}
        >
          保研之争，2个名额，4个人。{"\n"}
          每个人都有自己的公开目标，和不愿被他人看见的私心。
        </Text>
      </View>

      {/* Relationship Graph */}
      <View className="px-6 py-4">
        <View
          className="p-5 rounded-2xl bg-white"
          style={{ borderCurve: 'continuous' }}
        >
          <View className="flex-row items-center gap-2 mb-4">
            <Users size={18} color="#666" />
            <Text
              className="text-base"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
            >
              局势概览
            </Text>
          </View>

          {/* Player */}
          <View className="flex-row items-start gap-3 mb-4">
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: '#e8e4dc', borderCurve: 'continuous' }}
            >
              <Text style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}>
                你
              </Text>
            </View>
            <View className="flex-1">
              <Text
                className="text-sm"
                style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
              >
                {playerName}
              </Text>
              <Text
                className="text-xs mt-0.5 leading-relaxed"
                style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#888' }}
              >
                公开目标：顺利保研上岸，维持体面关系{"\n"}
                隐藏目标：待抽取
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View className="h-px bg-gray-200 my-3" />

          {/* NPCs */}
          {NPCS.map((npc) => (
            <View key={npc.id} className="flex-row items-start gap-3 mb-3">
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: npc.avatarColor + '20', borderCurve: 'continuous' }}
              >
                <Text
                  className="text-xs"
                  style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: npc.avatarColor }}
                >
                  {npc.name[0]}
                </Text>
              </View>
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <Text
                    className="text-sm"
                    style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
                  >
                    {npc.name}
                  </Text>
                  <Text
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      fontFamily: 'YangRenDongZhuShiTi-Regular',
                      color: npc.avatarColor,
                      backgroundColor: npc.avatarColor + '15'}}
                  >
                    {npc.role}
                  </Text>
                </View>
                <Text
                  className="text-xs mt-0.5 leading-relaxed"
                  style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#888' }}
                >
                  {npc.publicInfo}
                </Text>
                {showSecrets && (
                  <Text
                    className="text-xs mt-1 leading-relaxed"
                    style={{
                      fontFamily: 'YangRenDongZhuShiTi-Regular',
                      color: '#a08060',
                      fontStyle: 'italic'}}
                  >
                    隐藏特质：{npc.hiddenTrait}
                  </Text>
                )}
              </View>
            </View>
          ))}

          {/* Toggle Secrets */}
          <Pressable
            onPress={() => setShowSecrets(!showSecrets)}
            className="flex-row items-center gap-2 mt-2 pt-2 border-t border-gray-100"
          >
            {showSecrets ? (
              <EyeOff size={14} color="#999" />
            ) : (
              <Eye size={14} color="#999" />
            )}
            <Text
              className="text-xs"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#999' }}
            >
              {showSecrets ? '隐藏隐藏特质' : '查看隐藏特质'}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Resources */}
      <View className="px-6 py-2">
        <View
          className="p-5 rounded-2xl bg-white"
          style={{ borderCurve: 'continuous' }}
        >
          <Text
            className="text-base mb-4"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
          >
            你的初始资源
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {[
              { label: '信息卡', value: INITIAL_RESOURCES.infoCards, color: '#5B8C5A' },
              { label: '信任标记', value: INITIAL_RESOURCES.trustMarks, color: '#7A6A8A' },
              { label: '机会点', value: INITIAL_RESOURCES.opportunityPoints, color: '#4A6E8A' },
              { label: '压力值', value: INITIAL_RESOURCES.pressure, color: '#8B7355' },
              { label: '声誉值', value: INITIAL_RESOURCES.reputation, color: '#A0522D' },
            ].map((res) => (
              <View
                key={res.label}
                className="px-4 py-3 rounded-xl items-center"
                style={{ backgroundColor: res.color + '10', minWidth: 80 }}
              >
                <Text
                  className="text-lg"
                  style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: res.color }}
                >
                  {res.value}
                </Text>
                <Text
                  className="text-xs mt-0.5"
                  style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: res.color + 'cc' }}
                >
                  {res.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Secret Goals Selection */}
      <View className="px-6 py-4">
        <Text
          className="text-base mb-3"
          style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
        >
          抽取私密目标（选2个）
        </Text>
        <View className="gap-2">
          {goals.map((goal) => {
            const selected = selectedGoals.includes(goal);
            return (
              <Pressable
                key={goal}
                onPress={() => toggleGoal(goal)}
                className="p-4 rounded-xl border"
                style={{
                  borderCurve: 'continuous',
                  borderColor: selected ? '#333' : '#e5e5e5',
                  backgroundColor: selected ? '#f0eeea' : '#fff'}}
              >
                <Text
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: 'YangRenDongZhuShiTi-Regular',
                    color: selected ? '#333' : '#666'}}
                >
                  {selected ? '✓ ' : '○ '}{goal}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Start Button */}
      <View className="px-6 pb-10 pt-4">
        <Pressable
          onPress={handleStart}
          className="py-4 rounded-2xl items-center flex-row justify-center gap-2"
          style={{ backgroundColor: '#333', borderCurve: 'continuous' }}
        >
          <Text
            className="text-base"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#FDFBF7' }}
          >
            开始游戏
          </Text>
          <ChevronRight size={18} color="#FDFBF7" />
        </Pressable>
      </View>
    </ScrollView>
  );
}
