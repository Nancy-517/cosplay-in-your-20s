import type { MapMeta } from "@/lib/types";

export const maps: MapMeta[] = [
  {
    id: "baoyan-kaoyan",
    title: "保研 / 考研：信息差之战",
    subtitle:
      "你以为自己只是在准备升学，直到你发现资料、导师、盟友和沉默，都可能成为资源的一部分。",
    description:
      "你是一名绩点稳定、排名靠前的学生，正在准备夏令营和导师联系。你一直相信努力和体面能换来确定的结果，直到一份往届面试资料、一句模糊的导师名额暗示、一个开始沉默的盟友，把你推入一张由信息差、关系压力和机会竞争构成的资源网。",
    status: "playable",
    intensity: "可体验",
  },
  {
    id: "internship-battle",
    title: "实习争夺",
    subtitle: "履历、资源与位置感",
    description: "当所有人都说只是去试试时，真正的竞争已经提前开始。",
    status: "coming-soon",
    intensity: "即将开放",
  },
  {
    id: "first-job",
    title: "入职适应",
    subtitle: "规训、表达与站位",
    description: "你以为自己只是在适应环境，其实也在学习如何被塑造。",
    status: "coming-soon",
    intensity: "即将开放",
  },
  {
    id: "intimacy",
    title: "亲密关系",
    subtitle: "边界、期待与消耗",
    description: "当理解与控制越来越难区分，亲密也会变成一场消耗战。",
    status: "coming-soon",
    intensity: "即将开放",
  },
  {
    id: "return-home",
    title: "返乡创业",
    subtitle: "归属、现实与名义上的自由",
    description: "你想要的是重新开始，但故乡从来不会只给你一个身份。",
    status: "coming-soon",
    intensity: "即将开放",
  },
];

export const playableMap = maps.find((item) => item.status === "playable")!;
