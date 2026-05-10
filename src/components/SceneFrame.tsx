import type { StoryNode } from "@/lib/types";

type SceneFrameProps = {
  node: StoryNode;
};

export function SceneFrame({ node }: SceneFrameProps) {
  return (
    <section className={`panel scene-frame scene-frame--${node.id}`}>
      <div className="grid-noise" />

      {node.id === "node-1" ? (
        <div className="scene-frame__document">
          <div className="scene-frame__desktop-bar">
            <span>Finder</span>
            <span>资料目录 / 往届面试</span>
            <span>22:16</span>
          </div>
          <div className="scene-frame__document-layout">
            <div className="scene-frame__finder-list">
              <div className="scene-frame__finder-item scene-frame__finder-item--active">
                往届面试资料_未公开.pdf
              </div>
              <div className="scene-frame__finder-item">导师组研究方向汇总</div>
              <div className="scene-frame__finder-item">面试提醒（内部）.txt</div>
            </div>
            <div className="scene-frame__file-card">
              <div className="scene-frame__window-bar">
                <span />
                <span />
                <span />
              </div>
              <p>往届面试资料_未公开.pdf</p>
              <div className="scene-frame__tags">
                <span>高频问题</span>
                <span>导师偏好</span>
                <span>非公开提醒</span>
              </div>
              <div className="scene-frame__pdf-lines">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {node.id === "node-2" ? (
        <div className="scene-frame__mail">
          <div className="scene-frame__mail-sidebar">
            <div className="scene-frame__mail-chip scene-frame__mail-chip--active">收件箱</div>
            <div className="scene-frame__mail-chip">草稿</div>
            <div className="scene-frame__mail-chip">星标</div>
          </div>
          <div className="scene-frame__mail-window">
            <div className="scene-frame__window-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="scene-frame__sender">发件人：沈砚</div>
            <div className="scene-frame__mail-subject">Re: 导师方向咨询</div>
            <div className="scene-frame__bubble">
              今年组里<span>名额可能会比较紧</span>，老师会更看重提前沟通过、方向比较贴的人。
            </div>
            <div className="scene-frame__mail-footer">键入中...</div>
          </div>
        </div>
      ) : null}

      {node.id === "node-3" ? (
        <div className="scene-frame__chat-app">
          <div className="scene-frame__chat-sidebar">
            <div className="scene-frame__chat-contact scene-frame__chat-contact--active">林亦然</div>
            <div className="scene-frame__chat-contact">备考小群</div>
            <div className="scene-frame__chat-contact">夏令营通知群</div>
          </div>
          <div className="scene-frame__chat-window">
            <div className="scene-frame__chat-header">林亦然</div>
            <div className="scene-frame__chat">
              <div className="scene-frame__chat-row scene-frame__chat-row--you">最近有新的信息吗？</div>
              <div className="scene-frame__chat-row">我也还没怎么看……最近有点忙。</div>
              <div className="scene-frame__chat-row">前一天刚和学姐聊了挺久。</div>
              <div className="scene-frame__typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {node.id === "node-4" ? (
        <div className="scene-frame__doc-review">
          <div className="scene-frame__window-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="scene-frame__doc-surface">
            <div className="scene-frame__doc-title">个人陈述.docx</div>
            <div className="scene-frame__word-lines">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="scene-frame__markup-line" />
            <div className="scene-frame__markup-line scene-frame__markup-line--short" />
            <div className="scene-frame__comment">批注：研究方向与你高度重合，且已出现导师相关经历。</div>
          </div>
        </div>
      ) : null}

      {node.id === "node-5" ? (
        <div className="scene-frame__schedule">
          <div className="scene-frame__schedule-window">
            <div className="scene-frame__window-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="scene-frame__countdown">导师空闲窗口：明日 15:30</div>
            <div className="scene-frame__gate">剩余名额 / 剩余窗口不确定</div>
            <div className="scene-frame__schedule-grid">
              <span>14:30</span>
              <span>15:00</span>
              <span className="scene-frame__schedule-slot scene-frame__schedule-slot--active">15:30</span>
              <span>16:00</span>
            </div>
          </div>
        </div>
      ) : null}

      {node.id === "node-6" ? (
        <div className="scene-frame__rumor-board">
          <div className="scene-frame__rumor-header">群聊传言流 / 信息噪声</div>
          <div className="scene-frame__noise-flow">
            <span>倾向人选</span>
            <span>名额更少</span>
            <span>早就联系过</span>
            <span>今晚就能看出风向</span>
            <span>你真的还来得及吗</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
