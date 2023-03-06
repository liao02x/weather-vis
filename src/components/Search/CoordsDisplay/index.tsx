import "./CoordsDisplay.css";
export default function CoordsDisplay({ lat, lng }) {
  if (typeof lat !== "number" || typeof lng !== "number")
    return <div className="coords_display" />;

  return (
    <div className="coords_display">
      <div>
        <span className="fw-600">Lat:</span>
        <span className="d-b w-16">{lat.toFixed(4)}</span>
      </div>
      <div>
        <span className="fw-600">Long:</span>
        <span className="d-b w-16">{lng.toFixed(4)}</span>
      </div>
    </div>
  );
}
