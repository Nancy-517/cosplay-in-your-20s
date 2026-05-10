import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-frame">
      <div className="app-shell home-page">
        <section className="home-hero">
          <div className="panel home-hero__copy home-hero__copy--restored">
            <div className="grid-noise" />
            <span className="eyebrow">Cosplay in Your 20s</span>
            <h1 className="page-title">The Game Begins Before You Admit It</h1>
            <p className="home-hero__concept">扮演二十多岁的自己</p>
            <p className="page-subtitle">
              你以为你在选择前途，其实你也在选择自己会变成什么样的人。这里没有被安全抽离的测评，只有一步步把你拖进现实关系、信息差与自我代价里的局。
            </p>
            <div className="home-hero__actions">
              <Link className="cta-button" href="/maps">
                开始体验
              </Link>
              <Link className="ghost-button" href="/character">
                先看角色卡
              </Link>
            </div>
          </div>

          <aside className="panel dossier-panel">
            <div className="grid-noise" />
            <p className="section-heading">现实剧本杀档案</p>
            <div className="dossier-panel__row">
              <span>主题</span>
              <strong>信息差 / 多方博弈 / 边界成本</strong>
            </div>
            <div className="dossier-panel__row">
              <span>第一张地图</span>
              <strong>保研 / 考研：信息差之战</strong>
            </div>
            <div className="dossier-panel__row">
              <span>体验方式</span>
              <strong>单人进入，多方动态推进</strong>
            </div>
            <div className="dossier-panel__signal">
              <p>你要处理的不是单一选择，而是别人会如何理解你的选择。</p>
            </div>
          </aside>
        </section>

        <section className="home-metrics">
          <article className="panel home-metrics__card">
            <p className="section-heading">你会看见什么</p>
            <ul>
              <li>五维状态如何在体面和压力之间摇摆</li>
              <li>盟友、竞争者、消息中枢、导师关系人如何改变判断</li>
              <li>结局不是奖励，而是一种自我结算</li>
            </ul>
          </article>
          <article className="panel home-metrics__card">
            <p className="section-heading">为什么像一场局</p>
            <ul>
              <li>每个节点都让你在效率、关系和边界之间做取舍</li>
              <li>每一次沉默都会被别人重新命名</li>
              <li>你赢得的东西，往往也会改变你之后成为谁</li>
            </ul>
          </article>
        </section>

        <section className="home-strip">
          <article className="panel home-strip__card">
            <div className="grid-noise" />
            <p className="section-heading">体验形态</p>
            <strong>人生剧本杀 / 校园信息战 / 关系博弈图谱</strong>
          </article>
          <article className="panel home-strip__card">
            <div className="grid-noise" />
            <p className="section-heading">第一张地图</p>
            <strong>保研 / 考研：信息差之战</strong>
          </article>
          <article className="panel home-strip__card">
            <div className="grid-noise" />
            <p className="section-heading">当前玩法</p>
            <strong>单人进入，但你永远不会只和自己对话</strong>
          </article>
        </section>
      </div>
    </main>
  );
}
