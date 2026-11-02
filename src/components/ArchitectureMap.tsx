"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

const LAYERS = [
  {
    id: "interface",
    name: "Interface",
    tech: ["React", "Next.js", "TypeScript"],
    detail:
      "What people actually touch. Rendered on the server where it helps speed and search, interactive in the browser where it helps people.",
    exploring: false,
  },
  {
    id: "api",
    name: "API",
    tech: ["Node.js", "NestJS", "Express", "GraphQL", "REST"],
    detail:
      "The contracts between the interface and everything else: validation, auth boundaries and shapes that other teams can depend on.",
    exploring: false,
  },
  {
    id: "data",
    name: "Services and data",
    tech: ["Microservices", "Redis", "Kafka", "AWS", "Docker"],
    detail:
      "Where state lives and moves: services split along clear boundaries, hot reads cached, events streamed between systems.",
    exploring: false,
  },
  {
    id: "ai",
    name: "AI layer",
    tech: ["LLMs", "RAG", "Vector databases", "LangGraph", "MCP"],
    detail:
      "The layer I'm currently building into. Treated like any other dependency: typed inputs, structured outputs, and a plan for when the model is wrong.",
    exploring: true,
  },
] as const;

/** An accessible tablist: click, tap or use the arrow keys to inspect each layer of the stack. */
export function ArchitectureMap() {
  const [active, setActive] = useState(1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % LAYERS.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + LAYERS.length) % LAYERS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = LAYERS.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const layer = LAYERS[active] ?? LAYERS[0];

  return (
    <div className="archmap">
      <div className="archmap__stack" role="tablist" aria-label="Layers of a full stack system" aria-orientation="vertical">
        {LAYERS.map((l, i) => (
          <button
            key={l.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${l.id}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel`}
            tabIndex={i === active ? 0 : -1}
            className={`archmap__layer archmap__layer--${l.id} ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="archmap__name">{l.name}</span>
            {l.exploring && <span className="pill pill--violet">Exploring</span>}
          </button>
        ))}
        <span className="archmap__spine" aria-hidden="true" />
      </div>
      <div
        className="archmap__panel"
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${layer.id}`}
        tabIndex={0}
      >
        <h3>{layer.name}</h3>
        <p>{layer.detail}</p>
        <ul className="tags" aria-label={`${layer.name} technologies`}>
          {layer.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
