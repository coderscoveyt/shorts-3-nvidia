import { useState, useEffect } from "react";

const Circle = ({ percentage } : { percentage: number }) => {
  const [offset, setOffset] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const radiusX = 120; // Width of the ellipse
  const radiusY = 30; // Height of the ellipse
  const centerX = radiusX + 10; // X-coordinate of the center
  const centerY = radiusY + 10; // Y-coordinate of the center

  useEffect(() => {
    const progress = (percentage / 100) * circumference;
    setOffset(circumference - progress);
  }, [percentage, circumference]);

  return (
    <svg width={2 * (radiusX + 10)} height={2 * (radiusY + 10)}>
      <ellipse
        cx={centerX}
        cy={centerY}
        rx={radiusX}
        ry={radiusY}
        fill="transparent"
        stroke="blue"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
};

export default Circle;