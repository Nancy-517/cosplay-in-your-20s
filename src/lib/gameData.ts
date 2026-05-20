// 游戏静态数据定义

export interface NPC {
  id: string;
  name: string;
  avatarColor: string;
  publicInfo: string;
  hiddenTrait: string;
  role: string;
}

export interface ActionCard {
  id: string;
  name: string;
  desc: string;
  icon: string;
  resourceEffects: Partial<ResourceState>;
}

export interface Expression {
  id: string;
  name: string;
  desc: string;
}

export interface Target {
  id: string;
  name: string;
}

export interface RoundData {
  id: number;
  title: string;
  publicEvent: string;
  privateInfo: string;
  narrative?: string;
  isDark?: boolean;
  dreamNarrative?: string;
}

export interface ResourceState {
  infoCards: number;
  trustMarks: number;
  opportunityPoints: number;
  pressure: number;
  reputation: number;
}

export interface GameDecision {
  round: number;
  actionId: string;
  actionName: string;
  targetId: string;
  targetName: string;
  expressionId: string;
  expressionName: string;
  resourcesAfter: ResourceState;
  npcReaction: string;
}

export const INITIAL_RESOURCES: ResourceState = {
  infoCards: 3,
  trustMarks: 2,
  opportunityPoints: 1,
  pressure: 30,
  reputation: 60,
};

export const NPCS: NPC[] = [
  {
    id: 'lin-yiran',
    name: '林亦然',
    avatarColor: '#5B8C5A',
    publicInfo: '同一导师组的竞争者，绩点排名与你相邻，表面友善，实则竞争激烈。',
    hiddenTrait: '极度在意排名，擅长用"信息差"制造优势。',
    role: '竞争者',
  },
  {
    id: 'xu-zhixia',
    name: '许知夏',
    avatarColor: '#7A6A8A',
    publicInfo: '信息灵通的学姐，掌握核心资源和导师人脉。',
    hiddenTrait: '对"等价交换"有执念，不轻易付出。',
    role: '资源掌控者',
  },
  {
    id: 'shen-yan',
    name: '沈砚',
    avatarColor: '#4A6E8A',
    publicInfo: '低调但实力强的"暗马"，行动难以预测。',
    hiddenTrait: '内心渴望被理解，但从不主动开口。',
    role: '暗马',
  },
  {
    id: 'mentor',
    name: '导师',
    avatarColor: '#8B7355',
    publicInfo: '关键裁判，决定最终机会点分配。',
    hiddenTrait: '更看重"团队协作精神"而非单纯成绩。',
    role: '裁判',
  },
];

export const ROUNDS: RoundData[] = [
  {
    id: 1,
    title: '第1轮：资料共享危机',
    publicEvent: '导师组即将公布夏令营名额，名额只有2个，共4人竞争。',
    privateInfo: '你偶然获得了一份关键复试资料，内容涵盖往年真题和评分细则。',
  },
  {
    id: 2,
    title: '第2轮：导师信息互通',
    publicEvent: '导师约谈时间表公布，某人被优先约谈——沈砚出现在第一批名单中。',
    privateInfo: '沈砚在群聊中发了一句意味深长的话："有些信息，知道得太晚就没用了。"',
  },
  {
    id: 3,
    title: '第3轮：囚徒困境',
    publicEvent: '夏令营材料审核截止前夜，所有人都面临同一个选择。',
    privateInfo: '你手里握有一份所有人都能受益的共享资料。',
    isDark: true,
    dreamNarrative: '这一天晚上，你做了一个梦……每个人都被关在一个透明的立方体里。所有人手里都有一部分资料。如果大家都共享，每个人都能得到完整的信息。如果只有一个人隐瞒，他短期收益最高。如果大家都隐瞒，所有人都会错过关键信息，最终收益都下降。',
  },
  {
    id: 4,
    title: '第4轮：盟友失误救援',
    publicEvent: '林亦然的申请材料中出现了明显的数据漏洞。',
    privateInfo: '你恰好有办法帮他补救这个漏洞，但代价是你自己的准备时间会被压缩。',
  },
  {
    id: 5,
    title: '第5轮：最后入口争夺',
    publicEvent: '推荐信名额突然从2个减少为1个。',
    privateInfo: '你的声誉值将成为这场博弈的关键变量——前面的信任积累，此刻显露出分量。',
  },
  {
    id: 6,
    title: '第6轮：摊牌',
    publicEvent: '一切到此为止。所有人的隐藏信息将在此刻公开。',
    privateInfo: '这是你最后的机会，选择如何面对所有人——坦诚，还是继续伪装。',
  },
];

export const ACTION_CARDS: ActionCard[] = [
  {
    id: 'share',
    name: '共享',
    desc: '公开一条信息，增加群体信任，但减少个人信息差',
    icon: 'share',
    resourceEffects: { trustMarks: 1, infoCards: -1, reputation: 5 },
  },
  {
    id: 'probe',
    name: '试探',
    desc: '向某人询问关键信息，可能获得线索，也可能引发警惕',
    icon: 'search',
    resourceEffects: { infoCards: 1, reputation: -5, pressure: 5 },
  },
  {
    id: 'ally',
    name: '结盟',
    desc: '与某人达成私下互助，获得短期保护，但会被他人怀疑',
    icon: 'users',
    resourceEffects: { trustMarks: 2, reputation: -10, opportunityPoints: 0 },
  },
  {
    id: 'reserve',
    name: '保留',
    desc: '暂不共享信息，保住优势，但信任下降',
    icon: 'lock',
    resourceEffects: { trustMarks: -1, reputation: -5 },
  },
  {
    id: 'seize',
    name: '抢占',
    desc: '优先申请某个机会，资源上升，但声誉可能受损',
    icon: 'flag',
    resourceEffects: { opportunityPoints: 1, reputation: -15, pressure: 10 },
  },
  {
    id: 'clarify',
    name: '澄清',
    desc: '公开解释自己的行为，降低误会，但暴露部分策略',
    icon: 'message-circle',
    resourceEffects: { reputation: 10, infoCards: -1 },
  },
  {
    id: 'support',
    name: '托举',
    desc: '帮助他人获得机会，自己短期吃亏，但长期信任上升',
    icon: 'heart',
    resourceEffects: { trustMarks: 2, opportunityPoints: -1, reputation: 15 },
  },
  {
    id: 'rumor',
    name: '谣言',
    desc: '散布模糊信息，制造混乱，短期获利但风险极高',
    icon: 'zap',
    resourceEffects: { infoCards: 1, pressure: 10, reputation: -20, trustMarks: -1 },
  },
];

export const EXPRESSIONS: Expression[] = [
  { id: 'direct', name: '直接', desc: '毫不掩饰，直指核心' },
  { id: 'tactful', name: '委婉', desc: '绕个弯子，留有余地' },
  { id: 'vague', name: '模糊', desc: '似是而非，让人捉摸不透' },
  { id: 'assertive', name: '强势', desc: '态度鲜明，不容置疑' },
  { id: 'silent', name: '沉默', desc: '什么都不说，也是一种态度' },
];

export const TARGETS: Target[] = [
  { id: 'lin-yiran', name: '林亦然' },
  { id: 'xu-zhixia', name: '许知夏' },
  { id: 'shen-yan', name: '沈砚' },
  { id: 'all', name: '全体群聊' },
  { id: 'mentor', name: '导师窗口' },
];

export const SECRET_GOALS = [
  '在不暴露自己信息优势的前提下完成保研',
  '与沈砚建立真实友谊',
  '让林亦然对你产生依赖',
  '从许知夏手中获取核心资源而不欠人情',
  '在保研过程中维持对所有NPC的正面形象',
  '证明自己的独立能力，不借助任何人',
];

export const PERSONALITY_LABELS: Record<string, { label: string; desc: string }> = {
  controller: { label: '信息控制者', desc: '你擅长掌握信息的分发权，在博弈中始终保持主动权。你明白信息就是力量，但有时会因此错过真诚的连接。' },
  pretender: { label: '表面合作者', desc: '你懂得在人群中维持和谐的面具，即便内心有自己的盘算。合作是你的策略，而非本能。' },
  ally: { label: '真实同行者', desc: '你相信人与人之间存在真实的信任，愿意为此承担风险。在零和博弈中，你的选择显得尤为珍贵。' },
  loneWolf: { label: '孤狼策略家', desc: '你习惯独立作战，不依赖他人的善意。你的自我保护能力极强，但或许也错过了一些温暖的瞬间。' },
  altruist: { label: '利他主义者', desc: '你倾向于先考虑他人的利益，即便这意味着自己的损失。你的善意是真实的，但代价也不容忽视。' },
  opportunist: { label: '机会主义者', desc: '你对机会的嗅觉异常敏锐，善于在混乱中寻找突破口。短期来看你总能获利，但长期信任需要重建。' },
};

export const NPC_REACTIONS: Record<string, Record<string, string>> = {
  'lin-yiran': {
    share: '林亦然回复了一个微笑表情，"谢谢分享，这对大家都有帮助。"但你注意到她没有透露她自己的信息。',
    probe: '林亦然支支吾吾："呃……这个我也不太清楚……"她的眼神闪烁了一下。',
    ally: '林亦然犹豫片刻后答应了，但附加了一个条件："不过你要先帮我确认一个数据。"',
    reserve: '林亦然在群里发了一个"？"，但很快撤回了。',
    seize: '林亦然私下给你发了一条消息："动作挺快的啊。"语气不太对劲。',
    clarify: '林亦然回复："原来是这样……"但你不知道她是否真的相信。',
    support: '林亦然发来一条语音，声音有些哽咽："谢谢你，我记住了。"',
    rumor: '林亦然在群里@你："你从哪里听说的？我怎么不知道？"',
  },
  'xu-zhixia': {
    share: '许知夏回复："不错的信息。作为交换，我这边也有一个消息……"她确实给出了等价的信息。',
    probe: '许知夏微微一笑："你想知道？那你得先告诉我你知道什么。"',
    ally: '许知夏直接发来一份内部文件："拿着吧，算我押注在你身上。"',
    reserve: '许知夏在群里没有说话，但你注意到她把群昵称改成了"观望中"。',
    seize: '许知夏发来一条简短的消息："年轻人，别太贪心。"',
    clarify: '许知夏回复："解释就是掩饰，掩饰就是事实。"',
    support: '许知夏难得发了一个真心的感谢："你这个举动，我记下了。以后有事找我。"',
    rumor: '许知夏在群里冷笑道："没有来源的消息，我不信，也不传。"',
  },
  'shen-yan': {
    share: '沈砚沉默了很久，最后回复了一句："你比我想象中坦率。"',
    probe: '沈砚发了一个文件，没有任何说明。你打开后，发现正是你需要的信息。',
    ally: '沈砚回复："盟友？可以。但你要记住，我最讨厌背叛。"',
    reserve: '沈砚没有任何反应，仿佛你没有在群里出现过。',
    seize: '沈砚发来一条消息："你觉得抢跑有用吗？真正的机会，从来不在起跑线上。"',
    clarify: '沈砚回复了一个"……"，你知道这意味着他不相信。',
    support: '沈砚发来一条很长的消息："第一次有人愿意帮我，不是为了交换什么。"',
    rumor: '沈砚在群里只发了一个字："假。"然后下线了。',
  },
  all: {
    share: '群里沉默了几秒，然后有人回复了"谢谢"。气氛微妙地缓和了一些。',
    probe: '群里没有人接话，你的问题悬在半空，显得格外尴尬。',
    ally: '群里有人发了一个"？"——结盟这种事，在群里说出来本身就不太合适。',
    reserve: '群里有人发现了异样，有人问："你怎么什么都没说？"',
    seize: '群里炸开了锅，有人质疑你的动机，有人选择跟风抢占。',
    clarify: '群里有人回复"理解"，但也有人私下说"解释太多了"。',
    support: '群里有人发了一个"好人卡"的表情，但也有人默默退出了群聊。',
    rumor: '群里一片混乱，各种猜测满天飞，局面完全失控。',
  },
  mentor: {
    share: '导师回复："愿意分享的同学，我记下了。团队意识也是考核标准之一。"',
    probe: '导师回复："有问题直接问，不要拐弯抹角。"',
    ally: '导师没有回复，但你注意到她的头像从在线变成了忙碌。',
    reserve: '导师在群里发了一句意味深长的话："机会总是留给有准备的人，但准备不只是信息。"',
    seize: '导师回复："积极性值得肯定，但建议你先完善自己的材料。"',
    clarify: '导师回复："解释清楚了就好，我更看重你的实际行动。"',
    support: '导师发来一条消息："愿意帮助他人的学生，我很欣赏。推荐信的事，我会考虑的。"',
    rumor: '导师在群里发了群公告："请大家不要传播未经核实的消息，以官方通知为准。"',
  },
};

export const EVIDENCE_TEMPLATES = [
  '你在第1轮选择了{action}，{target}对你的态度从此发生了变化。',
  '你在第2轮没有追问沈砚的暗示，导致你错过了提前沟通窗口。',
  '你在第3轮选择{action}，{target}从那一刻开始不再主动给你信息。',
  '你在第4轮对林亦然的选择，决定了她在最终摊牌时对你的态度。',
  '你在第5轮选择{action}，虽然{effect}，但也{tradeoff}。',
  '你在第6轮的选择，是你整场博弈中最真实的自我。',
];

export const REFLECTION_QUESTIONS = [
  '你是否曾经动摇过——',
  '我当时为什么那么选？',
  '如果是你，你会怎么选？',
  '我们现实中是不是也经常这样？',
  '如果我全程合作，会不会被利用？',
  '如果我全程自保，会不会赢但失去信任？',
  '如果我精算平衡，会不会最后没有人真正相信我？',
  '如果我短期让利，会不会换来长期联盟？',
];

export const ENDING_TEXTS: Record<string, { title: string; desc: string; lines: string[] }> = {
  'win-trust': {
    title: '成功保研 · 众心所向',
    desc: '你不仅获得了保研名额，还收获了真实的信任。在这场博弈中，你证明了合作不是天真，而是一种高级策略。',
    lines: ['机会点：达标', '信任标记：充盈', '声誉值：完好', '隐藏代价：无'],
  },
  'win-alone': {
    title: '成功保研 · 孤军深入',
    desc: '你凭借自己的能力和计算获得了名额，但你也发现，身边的关系比想象中更脆弱。',
    lines: ['机会点：达标', '信任标记：匮乏', '声誉值：受损', '隐藏代价：关系破裂'],
  },
  'lose-trust': {
    title: '保研失利 · 问心无愧',
    desc: '你没有获得名额，但你守住了自己在乎的东西——也许是友情，也许是原则。这不是终点。',
    lines: ['机会点：不足', '信任标记：充盈', '声誉值：完好', '隐藏代价：机会'],
  },
  'lose-alone': {
    title: '保研失利 · 四面楚歌',
    desc: '名额没有拿到，信任也失去了。但这未必是坏事——至少你清晰地看到了自己的盲区。',
    lines: ['机会点：不足', '信任标记：匮乏', '声誉值：受损', '隐藏代价：自我认知'],
  },
};
