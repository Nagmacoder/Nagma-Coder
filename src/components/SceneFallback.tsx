/**
 * Static illustration of the workspace. Server-rendered, always present under the canvas,
 * and the final picture on devices without WebGL, with data saver or with reduced motion before load.
 */
export function SceneFallback() {
  return (
    <svg className="scene-fallback" viewBox="0 0 600 500" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="fb-glow" cx="50%" cy="45%" r="50%">
          <stop offset="0" stopColor="#8F7BFF" stopOpacity=".28" />
          <stop offset="1" stopColor="#8F7BFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fb-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262a3d" />
          <stop offset="1" stopColor="#151724" />
        </linearGradient>
        <linearGradient id="fb-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b1e31" />
          <stop offset="1" stopColor="#11131f" />
        </linearGradient>
      </defs>
      <ellipse cx="300" cy="230" rx="300" ry="230" fill="url(#fb-glow)" />

      {/* node graph */}
      <g stroke="#7CD6BC" strokeOpacity=".35" strokeWidth="1">
        <path d="M110 120 L190 70 L290 95 L380 52 L470 110 L520 70" fill="none" />
        <path d="M190 70 L230 150 M380 52 L420 140" fill="none" />
      </g>
      <g fill="#7CD6BC">
        {[[110,120],[190,70],[290,95],[380,52],[470,110],[520,70],[230,150],[420,140]].map(([x,y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
        ))}
      </g>

      {/* desk slab */}
      <ellipse cx="300" cy="430" rx="250" ry="34" fill="#000" opacity=".45" />
      <path d="M70 360 L530 360 L580 405 L20 405 Z" fill="url(#fb-desk)" stroke="#33384f" />
      <path d="M20 405 L580 405 L580 416 L20 416 Z" fill="#0f111b" />

      {/* laptop */}
      <path d="M190 365 L410 365 L430 385 L170 385 Z" fill="#2c3047" stroke="#3d4360" />
      <path d="M205 362 L395 362 L382 225 L218 225 Z" fill="url(#fb-screen)" stroke="#3d4360" strokeWidth="2" />
      <g strokeLinecap="round" strokeWidth="5">
        <line x1="232" y1="248" x2="282" y2="248" stroke="#8F7BFF" />
        <line x1="290" y1="248" x2="330" y2="248" stroke="#F1EADB" strokeOpacity=".5" />
        <line x1="246" y1="266" x2="300" y2="266" stroke="#7CD6BC" />
        <line x1="246" y1="284" x2="350" y2="284" stroke="#F1EADB" strokeOpacity=".4" />
        <line x1="260" y1="302" x2="318" y2="302" stroke="#5B7BFF" />
        <line x1="246" y1="320" x2="290" y2="320" stroke="#F1EADB" strokeOpacity=".4" />
        <line x1="232" y1="338" x2="262" y2="338" stroke="#8F7BFF" />
      </g>

      {/* orbital symbol */}
      <g transform="translate(118 225)" fill="none" stroke="#8F7BFF" strokeWidth="2.5">
        <ellipse rx="62" ry="22" />
        <ellipse rx="62" ry="22" transform="rotate(60)" />
        <ellipse rx="62" ry="22" transform="rotate(-60)" />
        <circle r="8" fill="#8F7BFF" stroke="none" />
      </g>

      {/* server stack */}
      <g transform="translate(450 250)">
        {[0, 36, 72].map((y) => (
          <g key={y} transform={`translate(0 ${y})`}>
            <rect width="92" height="30" rx="4" fill="#20243a" stroke="#3a4060" />
            <circle cx="14" cy="15" r="3.5" fill="#7CD6BC" />
            <rect x="26" y="12" width="44" height="6" rx="3" fill="#353b58" />
          </g>
        ))}
      </g>

      {/* database cylinders */}
      <g transform="translate(70 300)" stroke="#3a4060">
        {[0, 22].map((y) => (
          <g key={y} transform={`translate(0 ${y})`}>
            <path d="M0 0 v14 a38 10 0 0 0 76 0 v-14" fill="#1d2135" />
            <ellipse cx="38" cy="0" rx="38" ry="10" fill="#2a2f48" />
          </g>
        ))}
      </g>

      {/* floating terminal */}
      <g transform="translate(395 150)">
        <rect width="150" height="70" rx="8" fill="#151826" stroke="#3a4060" />
        <circle cx="14" cy="13" r="3" fill="#8F7BFF" />
        <circle cx="25" cy="13" r="3" fill="#5B7BFF" />
        <circle cx="36" cy="13" r="3" fill="#7CD6BC" />
        <rect x="14" y="30" width="70" height="5" rx="2.5" fill="#7CD6BC" opacity=".8" />
        <rect x="14" y="44" width="100" height="5" rx="2.5" fill="#F1EADB" opacity=".35" />
      </g>
    </svg>
  );
}
