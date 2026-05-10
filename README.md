# Cosplay in Your 20s

一个面向大学生和二十多岁青年的 AI 人生剧本杀 / 多元成长平台 MVP。

第一版主题地图是《保研 / 考研：信息差之战》。用户会在 6 个节点中做出选择，看到五维状态变化、多方 NPC 动态、关系图谱与最终结局结算。

## 当前版本包含

- 首页 `/`
- 地图选择页 `/maps`
- 角色卡页 `/character`
- 游玩页 `/play`
- 结局页 `/result`
- 6 个正式剧情节点数据
- 4 个正式 NPC 角色状态与脚本化反应
- 本地结局规则引擎
- 场景化节点 UI、行动卡、后果浮层
- 关系图谱与结算动画
- 2 个 mock API：
  - `/api/npc-action`
  - `/api/ai-result`

## 技术栈

- Next.js App Router
- TypeScript
- React
- 纯前端会话状态 `sessionStorage`

## 目录结构

```txt
cosplay-in-your-20s/
├─ README.md
├─ package.json
├─ tsconfig.json
├─ next.config.ts
├─ .env.example
├─ docs/
│  ├─ 00-project-brief.md
│  ├─ 01-coding-agent-task.md
│  ├─ 02-product-spec.md
│  ├─ 03-story-spec.md
│  └─ 05-deployment.md
├─ src/
│  ├─ app/
│  │  ├─ page.tsx
│  │  ├─ maps/page.tsx
│  │  ├─ character/page.tsx
│  │  ├─ play/page.tsx
│  │  ├─ result/page.tsx
│  │  └─ api/
│  │     ├─ ai-result/route.ts
│  │     └─ npc-action/route.ts
│  ├─ components/
│  ├─ data/
│  ├─ lib/
│  └─ styles/
└─ public/
   └─ images/
```

## 本地运行

先安装依赖：

```bash
npm install
```

再启动开发环境：

```bash
npm run dev
```

构建检查：

```bash
npm run build
```

## 如何修改剧情数据

第一版剧情数据集中在这些文件：

- `src/data/baoyanStory.ts`
  - 改 6 个节点文案
  - 改每个节点的 3 个选择
  - 改每个选择的数值效果和 `npcImpact`
- `src/data/endings.ts`
  - 改 6 个结局文案
- `src/data/characters.ts`
  - 改玩家角色说明和 4 个 NPC 信息
- `src/data/maps.ts`
  - 改地图卡展示内容

## 如何接入真实 AI

当前两个接口先返回 mock 数据：

- `src/app/api/npc-action/route.ts`
- `src/app/api/ai-result/route.ts`

后续接真实 AI 时：

1. 在 `.env.local` 中配置：

```txt
AI_API_KEY=your_real_key
AI_BASE_URL=your_real_base_url
NEXT_PUBLIC_FEEDBACK_URL=https://ucnaluyl2vsy.feishu.cn/share/base/form/shrcnw4PaYkf8SliYDpnM34XCuf
```

2. 在上述两个 route 文件中替换 mock 返回逻辑。
3. 保持前端请求体结构不变，这样页面层不需要重写。

## 当前默认假设

- 第一版不做登录
- 第一版不做数据库
- 第一版不做真实多人在线
- 第一版反馈入口使用飞书表单外链
