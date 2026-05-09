# 任务：设计《保研 / 考研：信息差之战》第一版剧情

## 产品背景

这是一个面向大学生的 AI 人生剧本杀 / 多元成长平台。

第一版地图是：

《保研 / 考研：信息差之战》

用户扮演一名绩点靠前、正在准备夏令营和导师联系的学生。

## 地图气质

真实、克制、有刺痛感，不要狗血，不要鸡汤，不要悬浮。

核心主题：

- 信息差
- 资源竞争
- 关系压力
- 体面与算计
- 自我边界
- 平行人生

## 输出格式

请输出 6 个剧情节点。

每个节点包含：

1. id
2. title
3. sceneText
4. 三个 choices

每个 choice 包含：

- id
- text
- feedback
- effects:
  - resource
  - trust
  - reputation
  - anxiety
  - boundary
- npcImpact:
  - allyA
  - rivalB
  - brokerC
  - seniorD

## 角色设定

NPC 包含：

1. 盟友 A：原本说好互相共享信息，但开始犹豫。
2. 竞争者 B：低调但行动很快，已经悄悄联系导师。
3. 消息中枢 C：掌握学长学姐资源，喜欢用信息交换关系。
4. 导师关系人 D：释放模糊信号，但从不明确承诺。

## 结局要求

请设计 6 个结局：

1. 体面胜利者
2. 高压合作型
3. 信息差操盘手
4. 沉默旁观者
5. 边界未丢的人
6. 精算型体面派

每个结局包含：

- endingName
- personalityTag
- relationshipSummary
- hiddenCost
- parallelLifeLine





#把剧情 AI 生成的结果，再整理给写代码 agent，让它放进 src/data/baoyanStory.ts 
