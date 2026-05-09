# 01 Coding Agent Task

## 任务目标

请创建 Cosplay in Your 20s 第一版网页 MVP。

这是一个前端网页 + 轻量后端接口项目。

第一版不做账号登录、不做真实多人在线、不做复杂数据库。

## 第一版地图

只做一张完整地图：

- 保研 / 考研：信息差之战

其他地图只作为“即将开放”展示：

- 实习争夺
- 入职适应
- 亲密关系
- 返乡创业

## 页面要求

请实现以下页面：

1. 首页 `/`
2. 地图选择页 `/maps`
3. 游玩页 `/play`
4. 结局页 `/result`

## 首页要求

首页展示：

- 产品名：Cosplay in Your 20s
- 中文概念：扮演二十多岁的自己
- 主文案：你以为你在选择前途，其实你也在选择自己会变成什么样的人。
- 开始体验按钮

## 地图选择页要求

展示 5 张地图卡：

1. 保研 / 考研：信息差之战，可体验
2. 实习争夺，即将开放
3. 入职适应，即将开放
4. 亲密关系，即将开放
5. 返乡创业，即将开放

## 游玩页要求

游玩页需要包含：

- 当前剧情标题
- 当前剧情正文
- 三个选择按钮
- 玩家五维状态
- 多方动态面板
- 选择反馈
- 继续按钮

玩家五维状态包括：

```ts
type PlayerState = {
  resource: number;
  trust: number;
  reputation: number;
  anxiety: number;
  boundary: number;
};
```



## NPC / PvP Lite 要求
第一版不做真实多人在线，但要实现 PvP Lite，也就是由脚本或 AI 模拟其他玩家角色。
NPC 包括：

allyA：盟友 A
rivalB：竞争者 B
brokerC：消息中枢 C
seniorD：导师关系人 D

NPC 数据结构：
```ts
type NPCState = {
  id: string;
  name: string;
  role: string;
  motivation: string;
  attitudeToPlayer: number;
  currentMove: string;
};
```

玩家每次做选择后：

1. 更新玩家五维状态。
2. 更新 NPC 状态。
3. 显示 NPC 行动。
4. 显示选择反馈。
5. 点击继续进入下一个剧情节点。

## 结局页要求

结局页根据玩家最终状态生成结果卡。

结果卡包含：

- 结局名称
- 人格标签
- 关系结算
- 隐藏代价
- 平行人生一句话

## 文件结构要求

请尽量按以下结构创建：
src/
├─ app/
│  ├─ page.tsx
│  ├─ maps/
│  │  └─ page.tsx
│  ├─ play/
│  │  └─ page.tsx
│  ├─ result/
│  │  └─ page.tsx
│  └─ api/
│     ├─ ai-result/
│     │  └─ route.ts
│     └─ npc-action/
│        └─ route.ts
├─ components/
│  ├─ MapCard.tsx
│  ├─ CharacterCard.tsx
│  ├─ ChoiceButton.tsx
│  ├─ StatusBar.tsx
│  ├─ RelationshipPanel.tsx
│  └─ ResultCard.tsx
├─ data/
│  ├─ maps.ts
│  ├─ baoyanStory.ts
│  ├─ characters.ts
│  └─ endings.ts
├─ lib/
│  ├─ gameEngine.ts
│  ├─ npcEngine.ts
│  └─ resultEngine.ts
└─ styles/
   └─ globals.css

   
## AI 接口要求

请预留两个轻量后端接口：

1. `/api/ai-result`
2. `/api/npc-action`

第一版可以先返回 mock 数据，不需要接真实 AI。

后续再接真实 AI 接口。

## 视觉风格

整体风格：

- 档案感
- 克制
- 真实
- 青年成长
- 多方博弈
- 选择代价

不要做成可爱风、廉价小游戏风、过度花哨的测试风。

## 输出要求

请输出：

1. 完整项目代码。
2. 文件结构说明。
3. 本地运行方法。
4. 如何修改剧情数据。
5. 如何接入真实 AI。
6. 如何部署前检查。

## 注意事项

请不要一次性做过度复杂的工程架构。第一版以简单、可运行、可维护为优先。






