/**
 * The Aviant plane mark, traced from Media/aviant.png.
 * Shared by the 2D <Logo> and the extruded 3D hero mark.
 * Coordinate space: 232 × 145.
 */
export const PLANE_VIEWBOX = { width: 232, height: 145 };

export const PLANE_POINTS: [number, number][] = [
  [2, 96], // nose / leading tip
  [214, 2], // top edge
  [222, 1],
  [229, 5],
  [230, 12], // rounded-ui upper-right corner
  [177, 143], // trailing tail point
  [104, 129], // bottom edge
  [109, 116], // notch step
  [67, 114],
  [66, 110],
  [61, 111],
  [60, 109],
  [53, 110],
];

export const PLANE_D =
  `M ${PLANE_POINTS[0].join(" ")} ` +
  PLANE_POINTS.slice(1)
    .map((p) => `L ${p.join(" ")}`)
    .join(" ") +
  " Z";
