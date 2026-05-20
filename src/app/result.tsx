import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { getGameState, getPersonalityLabel, getEndingType } from '@/lib/gameStore';
import { ENDING_TEXTS } from '@/lib/gameData';
import { supabase } from '@/client/supabase';
import { ChevronRight, Gavel, List, Archive, TreePine, Send } from 'lucide-react-native';

type ResultTab = 'trial' | 'cost' | 'archive' | 'notes';

export default function ResultScreen() {
  const router = useRouter();
  const state = getGameState();
  const [activeTab, setActiveTab] = useState<ResultTab>('trial');
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState<{ id: string; content: string }[]>([]);
  const [noteError, setNoteError] = useState('');
  const [noteSubmitted, setNoteSubmitted] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState(false);

  const finalResources = state.decisions.length > 0
    ? state.decisions[state.decisions.length - 1].resourcesAfter
    : state.resources;

  const personality = getPersonalityLabel(finalResources, state.decisions);
  const endingKey = getEndingType(finalResources, state.decisions);
  const ending = ENDING_TEXTS[endingKey];

  // 证据线索
  const evidenceLines = [
    state.decisions[1]
      ? `你在第2轮对${state.decisions[1].targetName}使用了「${state.decisions[1].actionName}」（${state.decisions[1].expressionName}），对方的态度从那一刻起悄然改变。`
      : '你在第2轮的选择影响了此后所有人对你的信任。',
    state.decisions[2]
      ? `你在第3轮选择了「${state.decisions[2].actionName}」——${state.decisions[2].actionName === '共享' ? '你选择了共赢，这在重复博弈中是明智的。' : '你选择了自保，这在短期内也许有用。'}`
      : '你在第3轮面对囚徒困境时做出了选择。',
    state.decisions[4]
      ? `你在第5轮${state.decisions[4].actionId === 'clarify' ? '选择公开澄清，虽然失去了部分效率，但保住了群体信任。' : `使用了「${state.decisions[4].actionName}」，这在最终评判中留下了印迹。`}`
      : '你在第5轮的选择，决定了最终声誉的走向。',
    `你最终的压力值是 ${finalResources.pressure}，声誉值是 ${finalResources.reputation}，信任标记剩余 ${finalResources.trustMarks}。`,
  ];

  // Cost list
  const costList = state.decisions.map((d, i) => {
    const effectStr = Object.entries(ENDING_TEXTS).length > 0
      ? `${d.actionName} → 信任${d.resourcesAfter.trustMarks > (i > 0 ? state.decisions[i - 1].resourcesAfter.trustMarks : state.resources.trustMarks) ? '+' : ''}${d.resourcesAfter.trustMarks - (i > 0 ? state.decisions[i - 1].resourcesAfter.trustMarks : state.resources.trustMarks)}`
      : `${d.actionName}`;
    return {
      round: d.round,
      action: `${d.actionName}·${d.targetName}·${d.expressionName}`,
      effect: effectStr,
      reaction: d.npcReaction.slice(0, 36) + (d.npcReaction.length > 36 ? '…' : '')};
  });

  const fetchNotes = async () => {
    setLoadingNotes(true);
    const { data } = await supabase.from('notes').select('id, content').order('created_at', { ascending: false }).limit(20);
    if (data) setNotes(data);
    setLoadingNotes(false);
  };

  useEffect(() => {
    if (activeTab === 'notes') fetchNotes();
  }, [activeTab]);

  const submitNote = async () => {
    if (!noteInput.trim()) { setNoteError('请输入你的感悟'); return; }
    if (noteInput.trim().length > 200) { setNoteError('最多200字'); return; }
    const { error } = await supabase.from('notes').insert({ content: noteInput.trim() });
    if (!error) {
      setNoteSubmitted(true);
      setNoteInput('');
      setNoteError('');
      fetchNotes();
    } else {
      setNoteError('提交失败，请重试');
    }
  };

  const TABS: { key: ResultTab; label: string; icon: React.ReactNode }[] = [
    { key: 'trial', label: '庭审', icon: <Gavel size={16} /> },
    { key: 'cost', label: '代价', icon: <List size={16} /> },
    { key: 'archive', label: '档案', icon: <Archive size={16} /> },
    { key: 'notes', label: '留言', icon: <TreePine size={16} /> },
  ];

  const isCourt = activeTab === 'trial';

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: isCourt ? '#3E2723' : '#FDFBF7' }}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Tab Bar */}
      <View
        className="flex-row mt-16 mx-6 rounded-2xl p-1"
        style={{ backgroundColor: isCourt ? '#4A3728' : '#f0eeea' }}
      >
        {TABS.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            className="flex-1 py-2 rounded-xl items-center flex-row justify-center gap-1"
            style={{
              backgroundColor: activeTab === tab.key
                ? (isCourt || tab.key === 'trial' ? (tab.key === 'trial' ? '#6D4C41' : '#fff') : '#fff')
                : 'transparent',
              borderCurve: 'continuous'}}
          >
            <Text
              className="text-xs"
              style={{
                fontFamily: 'YangRenDongZhuShiTi-Regular',
                color: activeTab === tab.key
                  ? (isCourt ? '#e0ddd8' : '#333')
                  : '#999'}}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* TAB: Courtroom */}
      {activeTab === 'trial' && (
        <View className="px-6 py-6 gap-5">
          <Text
            className="text-center text-xl mt-2"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#F5F0E8' }}
          >
            {ending.title}
          </Text>
          <Text
            className="text-center text-sm leading-relaxed"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#c5b9a8' }}
          >
            {ending.desc}
          </Text>

          {/* Players Row */}
          <View className="flex-row justify-around py-4">
            {['你', '林亦然', '许知夏', '沈砚'].map((name) => (
              <View key={name} className="items-center gap-2">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{ backgroundColor: '#6D4C41' }}
                >
                  <Text
                    className="text-sm"
                    style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#F5F0E8' }}
                  >
                    {name[0]}
                  </Text>
                </View>
                <Text
                  className="text-xs"
                  style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#a08070' }}
                >
                  {name}
                </Text>
              </View>
            ))}
          </View>

          {/* Verdict */}
          <View
            className="p-5 rounded-2xl"
            style={{ backgroundColor: '#4A3728', borderCurve: 'continuous' }}
          >
            <Text
              className="text-xs mb-3"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#a08070' }}
            >
              法官宣读判决书
            </Text>
            {ending.lines.map((line, i) => (
              <Text
                key={i}
                className="text-sm mb-2"
                style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#e0ddd8' }}
              >
                · {line}
              </Text>
            ))}
          </View>

          {/* Evidence */}
          <View
            className="p-5 rounded-2xl"
            style={{ backgroundColor: '#4A3728', borderCurve: 'continuous' }}
          >
            <Text
              className="text-xs mb-3"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#a08070' }}
            >
              关键证据
            </Text>
            {evidenceLines.map((line, i) => (
              <Text
                key={i}
                className="text-sm mb-3 leading-relaxed"
                style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#c5b9a8' }}
              >
                {i + 1}. {line}
              </Text>
            ))}
          </View>

          <Pressable
            onPress={() => setActiveTab('cost')}
            className="py-4 rounded-2xl items-center flex-row justify-center gap-2"
            style={{ backgroundColor: '#8D6E63', borderCurve: 'continuous' }}
          >
            <Text
              className="text-base"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#FDFBF7' }}
            >
              查看代价清单
            </Text>
            <ChevronRight size={18} color="#FDFBF7" />
          </Pressable>
        </View>
      )}

      {/* TAB: Cost List */}
      {activeTab === 'cost' && (
        <View className="px-6 py-6 gap-4">
          <Text
            className="text-xl"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
          >
            代价清单
          </Text>
          <Text
            className="text-xs leading-relaxed"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#888' }}
          >
            每一次选择，都有它的代价。
          </Text>

          {costList.map((item) => (
            <View
              key={item.round}
              className="p-4 rounded-xl bg-white"
              style={{ borderCurve: 'continuous' }}
            >
              <View className="flex-row items-center gap-2 mb-2">
                <View
                  className="w-6 h-6 rounded-full items-center justify-center"
                  style={{ backgroundColor: '#f0eeea' }}
                >
                  <Text
                    className="text-xs"
                    style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#666' }}
                  >
                    {item.round}
                  </Text>
                </View>
                <Text
                  className="text-sm"
                  style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
                >
                  {item.action}
                </Text>
              </View>
              <Text
                className="text-xs leading-relaxed"
                style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#888' }}
              >
                {item.reaction}
              </Text>
            </View>
          ))}

          {costList.length === 0 && (
            <Text style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#aaa' }}>
              还没有决策记录
            </Text>
          )}

          <Pressable
            onPress={() => setActiveTab('archive')}
            className="py-4 rounded-2xl items-center flex-row justify-center gap-2 mt-2"
            style={{ backgroundColor: '#333', borderCurve: 'continuous' }}
          >
            <Text
              className="text-base"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#FDFBF7' }}
            >
              查看命运档案
            </Text>
            <ChevronRight size={18} color="#FDFBF7" />
          </Pressable>
        </View>
      )}

      {/* TAB: Fate Archive */}
      {activeTab === 'archive' && (
        <View className="px-6 py-6 gap-5">
          <Text
            className="text-xl"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
          >
            命运档案
          </Text>

          {/* Personality Label */}
          <View
            className="p-6 rounded-2xl items-center"
            style={{ backgroundColor: '#f0eeea', borderCurve: 'continuous' }}
          >
            <Text
              className="text-xs mb-3"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#888' }}
            >
              你的人格标签
            </Text>
            <Text
              className="text-2xl mb-4"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
            >
              {personality.label}
            </Text>
            <Text
              className="text-sm text-center leading-relaxed"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#666' }}
            >
              {personality.desc}
            </Text>
          </View>

          {/* Stats */}
          <View
            className="p-5 rounded-2xl bg-white"
            style={{ borderCurve: 'continuous' }}
          >
            <Text
              className="text-sm mb-3"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
            >
              最终资源
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {[
                { k: '信息卡', v: finalResources.infoCards },
                { k: '信任标记', v: finalResources.trustMarks },
                { k: '机会点', v: finalResources.opportunityPoints },
                { k: '压力值', v: finalResources.pressure },
                { k: '声誉值', v: finalResources.reputation },
              ].map((r) => (
                <View key={r.k} className="px-3 py-2 rounded-lg" style={{ backgroundColor: '#f5f3ef' }}>
                  <Text
                    className="text-base"
                    style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
                  >
                    {r.v}
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#888' }}
                  >
                    {r.k}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Original Wish */}
          <View
            className="p-5 rounded-2xl"
            style={{ backgroundColor: '#fff9f0', borderCurve: 'continuous', borderWidth: 1, borderColor: '#ede8df' }}
          >
            <Text
              className="text-xs mb-2"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#8B7355' }}
            >
              你当初的愿望
            </Text>
            <Text
              className="text-sm leading-relaxed italic"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#555' }}
            >
              "{state.wish || '（未许愿）'}"
            </Text>
            <Text
              className="text-xs mt-3"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#aaa' }}
            >
              现在的你，和那时的你，有什么不一样？
            </Text>
          </View>

          <Pressable
            onPress={() => setActiveTab('notes')}
            className="py-4 rounded-2xl items-center flex-row justify-center gap-2"
            style={{ backgroundColor: '#333', borderCurve: 'continuous' }}
          >
            <Text
              className="text-base"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#FDFBF7' }}
            >
              去留言墙
            </Text>
            <ChevronRight size={18} color="#FDFBF7" />
          </Pressable>
        </View>
      )}

      {/* TAB: Notes Wall */}
      {activeTab === 'notes' && (
        <View className="px-6 py-6 gap-5">
          <View className="items-center mb-2">
            <TreePine size={32} color="#5B8C5A" />
          </View>
          <Text
            className="text-xl text-center"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
          >
            许愿树
          </Text>
          <Text
            className="text-sm text-center leading-relaxed"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#888' }}
          >
            仰望着这棵参天大树，{"\n"}
            你发现树叶上挂满了千千万万的便利贴。{"\n"}
            每一张，都是曾经路过这里的人留下的。
          </Text>

          {/* Reflection Questions */}
          <View
            className="p-5 rounded-2xl"
            style={{ backgroundColor: '#f5f3ef', borderCurve: 'continuous' }}
          >
            <Text
              className="text-xs mb-3"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#888' }}
            >
              此刻，你有一些问题……
            </Text>
            {[
              '如果我全程合作，会不会被利用？',
              '如果我全程自保，会不会赢但失去信任？',
              '如果我精算平衡，会不会最后没有人真正相信我？',
              '那我当时，到底为什么那么选？',
            ].map((q, i) => (
              <Text
                key={i}
                className="text-sm leading-relaxed mb-2"
                style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#666' }}
              >
                · {q}
              </Text>
            ))}
          </View>

          {/* Submit Note */}
          {!noteSubmitted && (
            <View
              className="p-5 rounded-2xl bg-white"
              style={{ borderCurve: 'continuous' }}
            >
              <Text
                className="text-sm mb-3"
                style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#333' }}
              >
                留下你的骄傲与遗憾
              </Text>
              <TextInput
                value={noteInput}
                onChangeText={setNoteInput}
                placeholder="在此刻，你想说些什么……"
                placeholderTextColor="#ccc"
                multiline
                className="p-3 rounded-xl text-sm"
                style={{
                  fontFamily: 'YangRenDongZhuShiTi-Regular',
                  color: '#333',
                  backgroundColor: '#fafaf8',
                  borderColor: noteError ? '#cc6666' : '#e5e5e5',
                  borderWidth: 1,
                  borderCurve: 'continuous',
                  textAlignVertical: 'top',
                  minHeight: 80}}
              />
              {noteError ? (
                <Text
                  className="text-xs mt-1"
                  style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#cc6666' }}
                >
                  {noteError}
                </Text>
              ) : null}
              <Pressable
                onPress={submitNote}
                className="flex-row items-center justify-center gap-2 py-3 rounded-xl mt-3"
                style={{ backgroundColor: '#5B8C5A' }}
              >
                <Send size={14} color="#fff" />
                <Text
                  className="text-sm"
                  style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#fff' }}
                >
                  挂到树上
                </Text>
              </Pressable>
            </View>
          )}
          {noteSubmitted && (
            <View className="items-center py-3">
              <Text
                className="text-sm"
                style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#5B8C5A' }}
              >
                ✓ 你的便利贴已挂上去了
              </Text>
            </View>
          )}

          {/* Other Notes */}
          {loadingNotes ? (
            <Text style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#aaa', textAlign: 'center' }}>
              加载中……
            </Text>
          ) : (
            <View className="gap-3">
              <Text
                className="text-xs"
                style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#aaa' }}
              >
                树叶上的便利贴——
              </Text>
              {notes.map((note) => (
                <View
                  key={note.id}
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: '#fffde7',
                    borderCurve: 'continuous',
                    borderWidth: 1,
                    borderColor: '#ede8cf',
                    transform: [{ rotate: `${Math.random() * 2 - 1}deg` }]}}
                >
                  <Text
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#555' }}
                  >
                    {note.content}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Closing */}
          <Text
            className="text-center text-sm leading-relaxed mt-4 mb-2"
            style={{ fontFamily: 'YangRenDongZhuShiTi-Regular', color: '#aaa' }}
          >
            不管怎么样，不管得失如何，{"\n"}
            你都在二十岁，又成长了一点。
          </Text>

          <Pressable
            onPress={() => router.replace('/')}
            className="py-4 rounded-2xl items-center"
            style={{ backgroundColor: '#f0eeea', borderCurve: 'continuous' }}
          >
            <Text
              className="text-base"
              style={{ fontFamily: 'YangRenDongZhuShiTi-Semibold', color: '#666' }}
            >
              返回首页
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
