"use client";
export default function Loading() {
  return (
    <div className="dots-root" role="status" aria-live="polite">
      <div className="dots">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}
