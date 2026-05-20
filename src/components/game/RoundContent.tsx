import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Share2,
  Search,
  Users,
  Lock,
  Flag,
  MessageCircle,
  Heart,
  Zap,
} from 'lucide-react-native';
import {
  ROUNDS,
  ACTION_CARDS,
  EXPRESSIONS,
  TARGETS,
  NPC_REACTIONS,
  type ActionCard,
  type Expression,
  type Target,
} from '@/lib/gameData';
import { getGameState, advanceRound } from '@/lib/gameStore';
import { cn } from '@/lib/utils';

const ACTION_ICON_COLORS: Record<string, string> = {
  share: '#5B8C5A',
  probe: '#4A6E8A',
  ally: '#7A6A8A',
  reserve: '#8B7355',
  seize: '#A0522D',
  clarify: '#6B8E23',
  support: '#CD853F',
  rumor: '#8B4513',
};

interface RoundContentProps {
  roundNum: number;
}

export default function RoundContent({ roundNum }: RoundContentProps) {
  const router = useRouter();
  const state = getGameState();

  const round = ROUNDS.find((r) => r.id === roundNum);
  if (!round) {
    router.replace('/');
    return null;
  }

  const [step, setStep] = useState<'event' | 'action' | 'target' | 'expression' | 'result'>('event');
  const [selectedAction, setSelectedAction] = useState<ActionCard | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [selectedExpression, setSelectedExpression] = useState<Expression | null>(null);
  const [npcReaction, setNpcReaction] = useState('');
  const [showDream, setShowDream] = useState(false);

  const currentResources = state.decisions.length > 0
    ? state.decisions[state.decisions.length - 1].resourcesAfter
    : state.resources;

  const applyAction = (action: ActionCard, target: Target, expression: Expression) => {
    const effects = action.resourceEffects;
    const newResources = {
      infoCards: Math.max(0, currentResources.infoCards + (effects.infoCards || 0)),
      trustMarks: Math.max(0, currentResources.trustMarks + (effects.trustMarks || 0)),
      opportunityPoints: Math.max(0, currentResources.opportunityPoints + (effects.opportunityPoints || 0)),
      pressure: Math.min(100, Math.max(0, currentResources.pressure + (effects.pressure || 0))),
      reputation: Math.min(100, Math.max(0, currentResources.reputation + (effects.reputation || 0))),
    };

    const reaction = NPC_REACTIONS[target.id]?.[action.id]
      || NPC_REACTIONS.all[action.id]
      || '对方沉默了很久，没有回复。';

    setNpcReaction(reaction);

    const decision = {
      round: roundNum,
      actionId: action.id,
      actionName: action.name,
      targetId: target.id,
      targetName: target.name,
      expressionId: expression.id,
      expressionName: expression.name,
      resourcesAfter: newResources,
      npcReaction: reaction,
    };

    advanceRound(decision);
    setStep('result');
  };

  const handleNextRound = () => {
    if (roundNum >= 6) {
      router.push('/result');
    } else {
      const next = `/round${roundNum + 1}` as any;
      router.push(next);
    }
  };

  const bgColor = round.isDark ? '#1a1a2e' : '#FDFBF7';
  const textColor = round.isDark ? '#e0ddd8' : '#333';
  const subTextColor = round.isDark ? '#a0a0a0' : '#888';
  const cardBg = round.isDark ? '#16213e' : '#fff';
  const accentBg = round.isDark ? '#0f3460' : '#f0eeea';

  const renderActionIcon = (iconName: string) => {
    const props = { size: 18, color: ACTION_ICON_COLORS[iconName] || '#666' };
    switch (iconName) {
      case 'share': return <Share2 {...props} />;
      case 'probe': return <Search {...props} />;
      case 'ally': return <Users {...props} />;
      case 'reserve': return <Lock {...props} />;
      case 'seize': return <Flag {...props} />;
      case 'clarify': return <MessageCircle {...props} />;
      case 'support': return <Heart {...props} />;
      case 'rumor': return <Zap {...props} />;
      default: return <MessageCircle {...props} />;
    }
  };

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: bgColor }} contentInsetAdjustmentBehavior="automatic">
      {/* Round Header */}
      <View className="px-6 pt-16 pb-4">
        <Text className="text-xs mb-2" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: subTextColor }}>
          第 {roundNum} / 6 轮
        </Text>
        <Text className="text-xl" style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: textColor }}>
          {round.title}
        </Text>
      </View>

      {/* Resources Bar */}
      <View className="px-6 mb-4">
        <View className="flex-row justify-between p-3 rounded-xl" style={{ backgroundColor: accentBg }}>
          {[
            { k: '信息卡', v: currentResources.infoCards },
            { k: '信任', v: currentResources.trustMarks },
            { k: '机会', v: currentResources.opportunityPoints },
            { k: '压力', v: currentResources.pressure },
            { k: '声誉', v: currentResources.reputation },
          ].map((r) => (
            <View key={r.k} className="items-center">
              <Text className="text-xs" style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: textColor }}>
                {r.v}
              </Text>
              <Text className="text-[10px]" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: subTextColor }}>
                {r.k}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* STEP 1: Event & Private Info */}
      {step === 'event' && (
        <View className="px-6 gap-4 pb-10">
          {/* Public Event */}
          <View className="p-5 rounded-2xl" style={{ backgroundColor: cardBg, borderCurve: 'continuous' }}>
            <Text className="text-xs mb-2" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#999' }}>
              公开事件
            </Text>
            <Text className="text-sm leading-relaxed" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: textColor }}>
              {round.publicEvent}
            </Text>
          </View>

          {/* Dream narrative for round 3 */}
          {round.dreamNarrative && (
            <Pressable
              onPress={() => setShowDream(!showDream)}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: '#0f0f1a', borderCurve: 'continuous', borderWidth: 1, borderColor: '#333' }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#888' }}>
                  梦境提示（点击展开）
                </Text>
                <ChevronDown size={14} color="#888" />
              </View>
              {showDream && (
                <Text className="text-sm leading-relaxed" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#ccc' }}>
                  {round.dreamNarrative}
                </Text>
              )}
            </Pressable>
          )}

          {/* Private Info */}
          <View
            className="p-5 rounded-2xl"
            style={{ backgroundColor: cardBg, borderCurve: 'continuous', borderWidth: 1, borderColor: round.isDark ? '#333' : '#e5e5e5' }}
          >
            <View className="flex-row items-center gap-2 mb-2">
              <Lock size={14} color="#8B7355" />
              <Text className="text-xs" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#8B7355' }}>
                私密信息
              </Text>
            </View>
            <Text className="text-sm leading-relaxed" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: textColor }}>
              {round.privateInfo}
            </Text>
          </View>

          {/* Continue Button */}
          <Pressable
            onPress={() => setStep('action')}
            className="py-4 rounded-2xl items-center flex-row justify-center gap-2"
            style={{ backgroundColor: round.isDark ? '#e0ddd8' : '#333', borderCurve: 'continuous' }}
          >
            <Text className="text-base" style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: round.isDark ? '#1a1a2e' : '#FDFBF7' }}>
              选择行动
            </Text>
            <ChevronRight size={18} color={round.isDark ? '#1a1a2e' : '#FDFBF7'} />
          </Pressable>
        </View>
      )}

      {/* STEP 2: Choose Action Card */}
      {step === 'action' && (
        <View className="px-6 gap-3 pb-10">
          <Text className="text-base mb-2" style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: textColor }}>
            选择行动卡
          </Text>
          {ACTION_CARDS.map((action) => {
            const disabled = currentResources.pressure > 70 && (action.id === 'support' || action.id === 'clarify');
            return (
              <Pressable
                key={action.id}
                onPress={() => { if (disabled) return; setSelectedAction(action); setStep('target'); }}
                className={cn('p-4 rounded-xl border flex-row items-center gap-3', disabled ? 'opacity-40' : '')}
                style={{
                  borderCurve: 'continuous',
                  borderColor: selectedAction?.id === action.id ? '#333' : '#e5e5e5',
                  backgroundColor: selectedAction?.id === action.id ? '#f0eeea' : cardBg,
                }}
              >
                <View className="w-9 h-9 rounded-lg items-center justify-center" style={{ backgroundColor: accentBg }}>
                  {renderActionIcon(action.icon)}
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm" style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: textColor }}>
                      {action.name}
                    </Text>
                    {disabled && (
                      <Text className="text-[10px] px-1.5 py-0.5 rounded" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#cc6666', backgroundColor: '#ffeeee' }}>
                        压力过高不可用
                      </Text>
                    )}
                  </View>
                  <Text className="text-xs mt-0.5" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: subTextColor }}>
                    {action.desc}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}

      {/* STEP 3: Choose Target */}
      {step === 'target' && selectedAction && (
        <View className="px-6 gap-3 pb-10">
          <Pressable onPress={() => setStep('action')} className="mb-2">
            <Text style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#999' }}>← 返回</Text>
          </Pressable>
          <Text className="text-base mb-2" style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: textColor }}>
            对 谁 使 用「{selectedAction.name}」？
          </Text>
          {TARGETS.map((target) => (
            <Pressable
              key={target.id}
              onPress={() => { setSelectedTarget(target); setStep('expression'); }}
              className="p-4 rounded-xl border"
              style={{
                borderCurve: 'continuous',
                borderColor: selectedTarget?.id === target.id ? '#333' : '#e5e5e5',
                backgroundColor: selectedTarget?.id === target.id ? '#f0eeea' : cardBg,
              }}
            >
              <Text className="text-sm" style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: textColor }}>
                {target.name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* STEP 4: Choose Expression */}
      {step === 'expression' && selectedAction && selectedTarget && (
        <View className="px-6 gap-3 pb-10">
          <Pressable onPress={() => setStep('target')} className="mb-2">
            <Text style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#999' }}>← 返回</Text>
          </Pressable>
          <Text className="text-base mb-2" style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: textColor }}>
            用 什 么 方 式？
          </Text>
          {EXPRESSIONS.map((expr) => (
            <Pressable
              key={expr.id}
              onPress={() => {
                setSelectedExpression(expr);
                applyAction(selectedAction, selectedTarget, expr);
              }}
              className="p-4 rounded-xl border"
              style={{ borderCurve: 'continuous', borderColor: '#e5e5e5', backgroundColor: cardBg }}
            >
              <Text className="text-sm" style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: textColor }}>
                {expr.name}
              </Text>
              <Text className="text-xs mt-0.5" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: subTextColor }}>
                {expr.desc}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* STEP 5: Result */}
      {step === 'result' && (
        <View className="px-6 gap-4 pb-10">
          {/* Action Summary */}
          <View className="p-5 rounded-2xl" style={{ backgroundColor: cardBg, borderCurve: 'continuous' }}>
            <Text className="text-xs mb-3" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#999' }}>
              你的行动
            </Text>
            <Text className="text-sm leading-relaxed" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: textColor }}>
              你对 <Text style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold' }}>{selectedTarget?.name}</Text>{' '}
              使用了「{selectedAction?.name}」，表达方式：{selectedExpression?.name}。
            </Text>
          </View>

          {/* NPC Reaction */}
          <View
            className="p-5 rounded-2xl"
            style={{ backgroundColor: cardBg, borderCurve: 'continuous', borderWidth: 1, borderColor: round.isDark ? '#333' : '#e5e5e5' }}
          >
            <Text className="text-xs mb-2" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#8B7355' }}>
              对方反应
            </Text>
            <Text className="text-sm leading-relaxed" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: textColor }}>
              {npcReaction}
            </Text>
          </View>

          {/* Resource Change */}
          <View className="p-5 rounded-2xl" style={{ backgroundColor: accentBg, borderCurve: 'continuous' }}>
            <Text className="text-xs mb-3" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: subTextColor }}>
              资源变化
            </Text>
            <View className="flex-row justify-between">
              {[
                { k: '信息卡', v: state.decisions[state.decisions.length - 1]?.resourcesAfter.infoCards ?? currentResources.infoCards },
                { k: '信任', v: state.decisions[state.decisions.length - 1]?.resourcesAfter.trustMarks ?? currentResources.trustMarks },
                { k: '机会', v: state.decisions[state.decisions.length - 1]?.resourcesAfter.opportunityPoints ?? currentResources.opportunityPoints },
                { k: '压力', v: state.decisions[state.decisions.length - 1]?.resourcesAfter.pressure ?? currentResources.pressure },
                { k: '声誉', v: state.decisions[state.decisions.length - 1]?.resourcesAfter.reputation ?? currentResources.reputation },
              ].map((r) => (
                <View key={r.k} className="items-center">
                  <Text className="text-sm" style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: textColor }}>
                    {r.v}
                  </Text>
                  <Text className="text-[10px]" style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: subTextColor }}>
                    {r.k}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Next Button */}
          <Pressable
            onPress={handleNextRound}
            className="py-4 rounded-2xl items-center flex-row justify-center gap-2"
            style={{ backgroundColor: round.isDark ? '#e0ddd8' : '#333', borderCurve: 'continuous' }}
          >
            <Text className="text-base" style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: round.isDark ? '#1a1a2e' : '#FDFBF7' }}>
              {roundNum >= 6 ? '进入结局' : '下一轮'}
            </Text>
            <ChevronRight size={18} color={round.isDark ? '#1a1a2e' : '#FDFBF7'} />
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
