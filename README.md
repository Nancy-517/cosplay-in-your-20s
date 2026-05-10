# Cosplay in Your 20s

一个面向大学生和二十多岁青年的 AI 人生剧本杀 / 多元成长平台 MVP。

用户进入产品后，可以选择一张与自身成长处境高度相关的“人生地图”，例如保研考研、实习争夺、入职适应、亲密关系、返乡创业等，在一系列高压选择、多方博弈和关系变化中体验不同决策带来的结果。系统根据用户选择路径生成关系结算、人格标签、隐藏代价与平行人生结局，帮助青年在低风险的互动体验中理解成长选择的复杂性。

第一版主题地图是《保研 / 考研：信息差之战》。用户会在 6 个节点中做出选择，看到五维状态变化、多方 NPC 动态、关系图谱与最终结局结算。

## 项目目标

- 做一个可独立体验的网页端 MVP
- 验证青年成长剧本杀是否有真实吸引力
- 验证《保研 / 考研：信息差之战》这张地图是否能击中目标用户
- 用 PvP Lite 的方式让单人体验产生多方博弈感
- 建立适合非技术主创协作的文档先行工作流

当前第一版只做一张完整地图：

- 保研 / 考研：信息差之战

其他地图目前只作为“即将开放”展示：

- 实习争夺
- 入职适应
- 亲密关系
- 返乡创业

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

## 当前目录结构

```txt
cosplay-in-your-20s/
├─ README.md
├─ package.json
├─ package-lock.json
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
│  │  ├─ play/
│  │  │  ├─ page.tsx
│  │  │  └─ PlayClient.tsx
│  │  ├─ result/
│  │  │  ├─ page.tsx
│  │  │  └─ ResultClient.tsx
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

如果遇到 `Cannot find module './447.js'` 这类 Next 开发缓存错误，先清理再重启：

```bash
pkill -f "next dev" || true
rm -rf .next
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

## 产品边界

当前默认假设：

- 第一版不做登录
- 第一版不做数据库
- 第一版不做真实多人在线
- 第一版不做支付
- 第一版反馈入口使用飞书表单外链

## 文档说明

当前项目文档统一整理在 `docs/`：

- `docs/00-project-brief.md`：项目背景与总目标
- `docs/01-coding-agent-task.md`：代码侧职责边界
- `docs/02-product-spec.md`：产品结构与体验设计
- `docs/03-story-spec.md`：剧情系统说明
- `docs/05-deployment.md`：部署说明
