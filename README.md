# cosplay-in-your-20s-
用户进入产品后，可以选择一张与自身成长处境高度相关的“人生地图”，例如保研考研、实习争夺、入职适应、亲密关系、返乡创业等，在一系列高压选择、多方博弈和关系变化中体验不同决策带来的结果。系统根据用户选择路径生成关系结算、人格标签、隐藏代价与平行人生结局，帮助青年在低风险的互动体验中理解成长选择的复杂性。



# Cosplay in Your 20s 项目说明

## 1. 项目目标

我要做一个面向大学生和二十多岁青年的 AI 人生剧本杀 / 多元成长平台。

第一版目标是在 15 天内完成一个可独立体验的网页端 MVP。

第一版只做一张完整地图：

- 保研 / 考研：信息差之战
- 用户将在保研、考研和升学竞争场景中做出关键选择，系统根据选择路径生成资源变化、关系变化、人格标签、隐藏代价和平行人生结局。

第一版重点验证：
1. 用户是否愿意体验青年成长剧本杀。
2. 用户是否会被“保研 / 考研：信息差之战”的剧情击中。
3. PvP Lite 是否能让单人体验产生多方博弈感。
4. AI-OPC 工作流是否能支持非技术主创完成产品闭环。

其他地图只作为“即将开放”展示：

- 实习争夺
- 入职适应
- 亲密关系
- 返乡创业

## 2. 产品定位

这不是普通职业测评，也不是普通文字游戏，而是一个青年成长决策体验产品。

用户在真实成长场景中做选择，系统根据选择路径生成：

- 资源变化
- 信任变化
- 声望变化
- 焦虑变化
- 边界变化
- NPC / AI 对手行动
- 人格标签
- 关系结算
- 平行人生结局

## 3. 第一版必须实现的功能

### 必须有

- 首页
- 地图选择页
- 角色卡页
- 剧情游玩页
- 状态变量展示
- 多方动态面板
- 结局页
- 反馈入口
- 保研 / 考研完整剧情数据
- PvP Lite：AI/脚本模拟其他玩家
- 轻量后端接口预留 AI 结局生成

### 不做

- 不做账号登录
- 不做真实多人实时在线
- 不做复杂数据库
- 不做支付
- 不做完整 App
- 不做所有地图的完整剧情

## 4. 技术要求

请采用前端网页 + 轻量后端接口的结构。

要求：

- 代码结构清晰
- 剧情数据单独放在 data 文件夹
- 页面和组件分开
- 游戏逻辑单独放在 lib 文件夹
- AI 接口放在 api 文件夹
- 可以本地运行
- 可以部署成别人能打开的网页链接

## 5. 视觉风格

整体风格：暗色档案感、青年成长剧本杀、克制、真实、有压迫感。

不要做成可爱风、廉价游戏风、花哨测试风。

关键词：

- 档案
- 关系网
- 信息差
- 选择代价
- 多方博弈
- 平行人生
- 结算卡


主要目录：

```txt
src/app        页面与 API
src/components 组件
src/data       剧情、地图、角色和结局数据
src/lib        游戏逻辑、NPC逻辑、结局逻辑
src/styles     全局样式
docs           项目文档



cosplay-in-your-20s/
├─ README.md
├─ package.json
├─ .env.example
├─ docs/
│  ├─ 00-project-brief.md
│  ├─ 01-product-spec.md
│  ├─ 02-tech-spec.md
│  ├─ 03-story-spec.md
│  ├─ 04-ai-agent-workflow.md
│  ├─ 05-deployment.md
│  └─ 06-changelog.md
├─ src/
│  ├─ app/
│  │  ├─ page.tsx
│  │  ├─ maps/
│  │  │  └─ page.tsx
│  │  ├─ play/
│  │  │  └─ page.tsx
│  │  ├─ result/
│  │  │  └─ page.tsx
│  │  └─ api/
│  │     ├─ ai-result/
│  │     │  └─ route.ts
│  │     └─ npc-action/
│  │        └─ route.ts
│  ├─ components/
│  │  ├─ MapCard.tsx
│  │  ├─ CharacterCard.tsx
│  │  ├─ ChoiceButton.tsx
│  │  ├─ StatusBar.tsx
│  │  ├─ RelationshipPanel.tsx
│  │  └─ ResultCard.tsx
│  ├─ data/
│  │  ├─ maps.ts
│  │  ├─ baoyanStory.ts
│  │  ├─ characters.ts
│  │  └─ endings.ts
│  ├─ lib/
│  │  ├─ gameEngine.ts
│  │  ├─ npcEngine.ts
│  │  └─ resultEngine.ts
│  └─ styles/
│     └─ globals.css
└─ public/
   └─ images/





   | 你想改什么 | 去哪里找 |
| --- | --- |
| 首页文案 | src/app/page.tsx |
| 地图选择页 | src/app/maps/page.tsx |
| 正式游玩页面 | src/app/play/page.tsx |
| 结果页 | src/app/result/page.tsx |
| 地图列表 | src/data/maps.ts |
| 保研考研剧情 | src/data/baoyanStory.ts |
| 人物角色 | src/data/characters.ts |
| 结局文案 | src/data/endings.ts |
| 玩家数值变化逻辑 | src/lib/gameEngine.ts |
| AI/脚本对手逻辑 | src/lib/npcEngine.ts |
| 最终结局判断 | src/lib/resultEngine.ts |
| 全局视觉风格 | src/styles/globals.css |
| AI生成结局接口 | src/app/api/ai-result/route.ts |
| AI/脚本模拟对手接口 | src/app/api/npc-action/route.ts |



文档

docs/00-project-brief.md：项目总说明
docs/01-product-spec.md：产品需求
docs/02-tech-spec.md：技术方案
docs/03-story-spec.md：剧情设计
docs/04-ai-agent-workflow.md：AI协作流程
docs/05-deployment.md：部署说明
docs/06-changelog.md：版本记录



版本计划
v0.1
完成网页骨架、地图选择页和基础剧情流程。
v0.2
完成保研 / 考研地图完整剧情和结局页。
v0.3
加入 PvP Lite：NPC / AI 对手动态。
v0.4
加入 AI 结局接口和部署版本。


协作说明
主创负责产品定位、剧情设计、用户测试和 AI 工作流整理。
写代码 agent 负责前端、轻量后端和接口代码生成。
技术协作者负责技术栈建议、部署、接口安全和关键问题排查。（或许更多哈哈哈）











#PvP Lite 多方博弈模式
技术上单人，体验上多人。
当前版本中，系统将由 AI 或脚本模拟其他玩家角色，包括盟友、竞争者、消息中枢和导师关系人。每个角色拥有不同目标、资源和行动倾向。用户的每次选择都会改变其他角色的态度与下一步行动，使单人体验具备多人博弈感。

至少需要 4 个非玩家角色：
| 角色 | 表面身份 | 隐藏动机 | 行动风格 |
| --- | --- | --- | --- |
| 盟友 A | 原本说好一起共享资料的同学 | 想保住关系，但也怕被你超过 | 摇摆型 |
| 竞争者 B | 平时低调的年级前排 | 已经偷偷联系导师 | 结果优先型 |
| 消息中枢 C | 掌握学长学姐资源的人 | 通过信息交换维持存在感 | 交易型 |
| 导师关系人 D | 释放模糊信号的学长/学姐 | 不直接承诺，但影响机会流向 | 模糊权力型 |


第一版可以做两个层次。
第一层是脚本模拟，不接 AI。比如玩家做出选择后，系统根据规则生成其他角色反应。

如果玩家选择“延迟共享资料”：
- 盟友 A 信任 -10
- 竞争者 B 资源 +5
- 消息中枢 C 对玩家评价变为“谨慎但不透明”
- 下一节点中，盟友 A 会减少主动分享


第二层是轻量 AI 接口。玩家做完选择后，把当前状态发给后端接口，让 AI 生成一段“其他玩家行动”。
例如：
玩家选择：只把资料给盟友 A
当前变量：资源 70，信任 45，声望 60，焦虑 50，边界 40
请生成其他三名角色的下一步行动：
1. 盟友 A 的反应
2. 竞争者 B 的行动
3. 消息中枢 C 的判断


## PvP Lite 机制要求

第一版不做真正多人实时在线，但必须让用户感受到“多方博弈”。

请实现一个 NPC / AI Opponent 系统：

1. 玩家每次做选择后，系统更新五个变量：
   - resource
   - trust
   - reputation
   - anxiety
   - boundary

2. 系统同时更新 4 个 NPC 的状态：
   - allyA：盟友
   - rivalB：竞争者
   - brokerC：消息中枢
   - seniorD：导师关系人

3. 每个 NPC 至少有：
   - name
   - role
   - motivation
   - attitudeToPlayer
   - currentMove

4. 第一阶段可以先用脚本规则生成 NPC 行动。
5. 后续预留 `/api/npc-action` 接口，用于接入 AI 生成 NPC 行动。
6. 前端需要展示一个“多方动态”面板，让用户看到其他角色正在行动。
7. 产品文案上称为 “PvP Lite：AI/脚本模拟多方博弈”。

