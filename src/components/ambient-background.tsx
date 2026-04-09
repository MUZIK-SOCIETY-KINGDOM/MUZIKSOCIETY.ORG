export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Primary blob — top right */}
      <div
        className="blob-1 absolute rounded-full"
        style={{
          width: '800px',
          height: '800px',
          top: '-200px',
          right: '-200px',
          background:
            'radial-gradient(circle at center, rgba(0,212,255,0.13) 0%, transparent 65%)',
          filter: 'blur(72px)',
        }}
      />
      {/* Secondary blob — bottom left */}
      <div
        className="blob-2 absolute rounded-full"
        style={{
          width: '600px',
          height: '600px',
          bottom: '5%',
          left: '-150px',
          background:
            'radial-gradient(circle at center, rgba(0,212,255,0.08) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
      />
      {/* Tertiary accent — center */}
      <div
        className="blob-3 absolute rounded-full"
        style={{
          width: '400px',
          height: '400px',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle at center, rgba(0,212,255,0.04) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  )
}
