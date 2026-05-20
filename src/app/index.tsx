import { View, Text, ScrollView, Pressable } from 'react-native';

import { useRouter } from 'expo-router';
import { Map, Lock, Compass } from 'lucide-react-native';
import { resetGame } from '@/lib/gameStore';
import { cn } from '@/lib/utils';

const MAPS = [
  { id: 'baoyan', title: '保研之争', desc: '4人争2个名额，信息、信任与机会的多方博弈', active: true },
  { id: 'intern', title: '实习争夺', desc: '名企offer的暗战与资源置换', active: false },
  { id: 'job', title: '入职适应', desc: '新环境中的站队、信任与边界选择', active: false },
  { id: 'relationship', title: '亲密关系', desc: '付出与保留、坦诚与伪装的微妙平衡', active: false },
  { id: 'startup', title: '创业团队', desc: '股权、信任与理想之间的博弈', active: false },
  { id: 'family', title: '家庭沟通', desc: '代际期望与自我实现的冲突', active: false },
  { id: 'competition', title: '科研竞赛', desc: '学术圈的署名之争与合作困境', active: false },
  { id: 'club', title: '社团竞选', desc: '人脉、承诺与背叛的微型政治', active: false },
  { id: 'roommate', title: '合租室友', desc: '边界、妥协与长期关系的成本', active: false },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleMapPress = (map: typeof MAPS[0]) => {
    if (!map.active) return;
    resetGame();
    router.push('/character');
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: '#FDFBF7' }}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Header */}
      <View className="px-6 pt-16 pb-8">
        <View className="flex-row items-center gap-3 mb-2">
          <Compass size={28} className="text-graphite" color="#333" />
          <Text
            className="text-3xl text-graphite"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
          >
            人生地图
          </Text>
        </View>
        <Text
          className="text-sm mt-2 leading-relaxed"
          style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#666' }}
        >
          在低风险的互动体验中，理解成长选择的复杂性。
        </Text>
        <Text
          className="text-xs mt-1"
          style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#999' }}
        >
          这不是游戏，也不是测评。这是一场社会场景预演。
        </Text>
      </View>

      {/* Map Grid */}
      <View className="px-6 pb-10 gap-4">
        <Text
          className="text-xl mb-2"
          style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
        >
          选择你的地图
        </Text>

        {MAPS.map((map) => (
          <Pressable
            key={map.id}
            onPress={() => handleMapPress(map)}
            className={cn(
              'p-5 rounded-2xl border',
              map.active
                ? 'bg-white border-graphite/20'
                : 'bg-gray-100/50 border-gray-200'
            )}
            style={{
              borderCurve: 'continuous',
              boxShadow: map.active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              opacity: map.active ? 1 : 0.6,
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center"
                  style={{
                    backgroundColor: map.active ? '#f0eeea' : '#e5e5e5',
                    borderCurve: 'continuous',
                  }}
                >
                  {map.active ? (
                    <Map size={20} color="#333" />
                  ) : (
                    <Lock size={18} color="#999" />
                  )}
                </View>
                <View>
                  <Text
                    className="text-lg"
                    style={{
                      fontFamily: 'YangRenDongZhuShiTi-Semibold',
                      color: map.active ? '#333' : '#999',
                    }}
                  >
                    {map.title}
                  </Text>
                  <Text
                    className="text-xs mt-0.5"
                    style={{
                      fontFamily: 'YangRenDongZhuShiTi-Regular',
                      color: map.active ? '#888' : '#bbb',
                    }}
                  >
                    {map.desc}
                  </Text>
                </View>
              </View>
              {!map.active && (
                <Text
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    fontFamily: 'YangRenDongZhuShiTi-Regular',
                    color: '#aaa',
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  即将开放
                </Text>
              )}
            </View>
          </Pressable>
        ))}
      </View>

      {/* Footer Note */}
      <View className="px-6 pb-20 items-center">
        <Text
          className="text-xs text-center leading-relaxed"
          style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#bbb' }}
        >
          每次体验大约需要 15 分钟{"\n"}
          请准备好面对真实的自己
        </Text>
      </View>
    </ScrollView>
  );
}
