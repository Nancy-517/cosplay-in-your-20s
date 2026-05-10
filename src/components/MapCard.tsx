import Link from "next/link";
import type { MapMeta } from "@/lib/types";

type MapCardProps = {
  map: MapMeta;
};

export function MapCard({ map }: MapCardProps) {
  const playable = map.status === "playable";

  return (
    <article
      className="panel map-card"
      aria-label={map.title}
      data-playable={playable ? "true" : "false"}
    >
      <div className="grid-noise" />
      <div className="map-card__status">{map.intensity}</div>
      <h3>{map.title}</h3>
      <p className="map-card__subtitle">{map.subtitle}</p>
      <p className="map-card__description">{map.description}</p>
      {playable ? (
        <Link className="cta-button map-card__action" href="/character">
          进入这一张局
        </Link>
      ) : (
        <div className="ghost-button map-card__action map-card__action--locked" aria-disabled="true">
          即将开放
        </div>
      )}
    </article>
  );
}
