import type { NPCState, PlayerState } from "@/lib/types";

export const playerInitialState: PlayerState = {
  resource: 50,
  trust: 50,
  reputation: 50,
  anxiety: 40,
  boundary: 60,
};

export const playerRole = {
  title: "你",
  identity: "绩点稳定、排名靠前、正在准备保研 / 考研关键节点的学生。",
  publicGoal: "拿到目标导师的认可，争取夏令营或复试中的关键机会。",
  hiddenPressure:
    "你害怕自己一直以来相信的“努力和体面”，在真正的资源竞争面前并不够用。",
  initialResources: [
    "一份尚未公开的往届面试资料线索",
    "一个能联系到学长学姐的信息渠道",
    "稳定但并非绝对领先的绩点排名",
    "一个原本约定互相共享信息的盟友",
  ],
  description:
    "你一直是那种“看起来不会出错”的人。绩点稳定，材料完整，说话得体，和同学关系也过得去。你相信只要准备充分，结果就不会太差。直到夏令营前一个月，你开始发现，真正让人焦虑的不是考试本身，而是那些没有写在通知里的信息、没有说出口的关系，以及每个人都装作正常竞争时的细微动作。",
};

export const initialNpcStates: NPCState[] = [
  {
    id: "allyA",
    name: "林亦然",
    role: "原本说好互相共享信息的同学",
    relationLabel: "你的备考盟友",
    motivation: "她想维持你们之间的互相信任，但也害怕在关键机会面前被你甩开。",
    actionStyle: "摇摆型。她会合作，但越到后期越容易保留信息。",
    attitudeToPlayer: 50,
    currentMove: "林亦然还像往常一样和你互相提醒 ddl，只是最近她回复消息的速度慢了一点。",
  },
  {
    id: "rivalB",
    name: "周启明",
    role: "平时低调但排名靠前的竞争者",
    relationLabel: "普通同学",
    motivation: "他已经开始悄悄联系目标导师，希望在正式竞争前抢占位置。",
    actionStyle: "结果优先型。很少正面冲突，但行动很快。",
    attitudeToPlayer: 35,
    currentMove: "周启明依旧不怎么说话，但你听说他最近频繁出现在导师办公室附近。",
  },
  {
    id: "brokerC",
    name: "许知夏",
    role: "掌握学长学姐资源和往年信息的人",
    relationLabel: "消息灵通的同学",
    motivation: "她喜欢用信息交换关系，也会观察谁更值得投资。",
    actionStyle: "交易型。她不轻易免费给出信息。",
    attitudeToPlayer: 45,
    currentMove: "许知夏在群里很少直接说结论，但总能在关键时刻抛出半句话。",
  },
  {
    id: "seniorD",
    name: "沈砚",
    role: "目标导师组的学长 / 学姐",
    relationLabel: "可以咨询的前辈",
    motivation: "不会明确承诺任何结果，但他的模糊暗示会影响你对机会的判断。",
    actionStyle: "模糊权力型。给信息，但不负责解释信息。",
    attitudeToPlayer: 40,
    currentMove: "沈砚回复你的消息很礼貌，但每一句都留有余地。",
  },
];
