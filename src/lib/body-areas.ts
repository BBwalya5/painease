/** Body-map areas used by check-ins and heatmaps. Coordinates are on a 200x440 front-view figure. */
export interface BodyArea {
  id: string;
  label: string;
  cx: number;
  cy: number;
  r: number;
}

export const BODY_AREAS: BodyArea[] = [
  { id: "head", label: "Head", cx: 100, cy: 36, r: 22 },
  { id: "neck", label: "Neck", cx: 100, cy: 72, r: 11 },
  { id: "shoulder_left", label: "Left shoulder", cx: 62, cy: 96, r: 14 },
  { id: "shoulder_right", label: "Right shoulder", cx: 138, cy: 96, r: 14 },
  { id: "upper_back", label: "Upper back / chest", cx: 100, cy: 118, r: 20 },
  { id: "abdomen", label: "Abdomen", cx: 100, cy: 168, r: 20 },
  { id: "lower_back", label: "Lower back", cx: 100, cy: 200, r: 16 },
  { id: "pelvis", label: "Pelvis / lower belly", cx: 100, cy: 230, r: 18 },
  { id: "hip_left", label: "Left hip", cx: 74, cy: 236, r: 12 },
  { id: "hip_right", label: "Right hip", cx: 126, cy: 236, r: 12 },
  { id: "elbow_left", label: "Left arm / elbow", cx: 46, cy: 160, r: 12 },
  { id: "elbow_right", label: "Right arm / elbow", cx: 154, cy: 160, r: 12 },
  { id: "wrist_left", label: "Left wrist / hand", cx: 36, cy: 222, r: 11 },
  { id: "wrist_right", label: "Right wrist / hand", cx: 164, cy: 222, r: 11 },
  { id: "thigh_left", label: "Left thigh", cx: 82, cy: 286, r: 14 },
  { id: "thigh_right", label: "Right thigh", cx: 118, cy: 286, r: 14 },
  { id: "knee_left", label: "Left knee", cx: 82, cy: 334, r: 12 },
  { id: "knee_right", label: "Right knee", cx: 118, cy: 334, r: 12 },
  { id: "ankle_left", label: "Left ankle / foot", cx: 82, cy: 410, r: 12 },
  { id: "ankle_right", label: "Right ankle / foot", cx: 118, cy: 410, r: 12 },
];

export const bodyAreaLabel = (id: string) => BODY_AREAS.find((a) => a.id === id)?.label ?? id;
