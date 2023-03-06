export default function CoordsDisplay({ lat, lng }) {
  if (typeof lat !== 'number' || typeof lng !== 'number') return <div />;

  return (
    <div className="d-f j-s">
      <div className="d-f">
        <span className="fw-600">Lat:</span>
        <span className="d-b w-16">{lat.toFixed(4)}</span>
      </div>
      <div className="d-f">
        <span className="fw-600">Long:</span>
        <span className="d-b w-16">{lng.toFixed(4)}</span>
      </div>
    </div>
  )
}