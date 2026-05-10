import Link from "next/link";
import { MapCard } from "@/components/MapCard";
import { maps } from "@/data/maps";

export default function MapsPage() {
  return (
    <main className="page-frame">
      <div className="app-shell maps-page">
        <div className="maps-page__header">
          <span className="eyebrow">Map Selection</span>
          <h1 className="page-title">Choose A Pressure Zone</h1>
          <p className="page-subtitle">
            第一版只开放一张完整地图，其他地图仍以剪影形式留在场外。你能看见它们，也会知道这只是你二十多岁的一部分。
          </p>
          <Link className="ghost-button" href="/">
            返回首页
          </Link>
        </div>
        <section className="maps-grid">
          {maps.map((map) => (
            <MapCard key={map.id} map={map} />
          ))}
        </section>
      </div>
    </main>
  );
}
