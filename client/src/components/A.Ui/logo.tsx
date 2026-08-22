export const Logo = ({ size = 64 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className='logo'
    >
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="beardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="120" fill="url(#bgGradient)" />
      <ellipse cx="256" cy="180" rx="140" ry="100" fill="none" stroke="#1E293B" strokeWidth="20" />
      <circle cx="136" cy="220" r="50" fill="#1E293B" />
      <circle cx="376" cy="220" r="50" fill="#1E293B" />
      <circle cx="136" cy="220" r="30" fill="#3B82F6" />
      <circle cx="376" cy="220" r="30" fill="#3B82F6" />
      <circle cx="256" cy="240" r="90" fill="#FDBA74" />
      <path d="M 166 220 Q 256 80 346 220 Q 346 240 320 240 Q 256 200 192 240 Q 166 240 166 220" fill="#8B5CF6" />
      <circle cx="256" cy="160" r="8" fill="#FBBF24" />
      <circle cx="230" cy="140" r="6" fill="#FBBF24" />
      <circle cx="282" cy="145" r="7" fill="#FBBF24" />
      <ellipse cx="226" cy="250" rx="12" ry="15" fill="#1E293B" />
      <ellipse cx="286" cy="250" rx="12" ry="15" fill="#1E293B" />
      <circle cx="230" cy="247" r="5" fill="white" />
      <circle cx="290" cy="247" r="5" fill="white" />
      <circle cx="256" cy="275" r="15" fill="#F97316" />
      <path d="M 210 295 Q 230 285 256 295 Q 282 285 302 295 Q 282 310 256 305 Q 230 310 210 295" fill="#F59E0B" />
      <path d="M 180 280 Q 170 350 200 400 Q 256 450 312 400 Q 342 350 332 280 Q 300 300 256 310 Q 212 300 180 280" fill="url(#beardGradient)" />
      <rect x="186" y="380" width="140" height="80" rx="10" fill="#1E40AF" />
      <circle cx="160" cy="360" r="25" fill="#FDBA74" />
      <circle cx="352" cy="360" r="25" fill="#FDBA74" />
      <text x="256" y="490" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="white" textAnchor="middle">perepihoticWatch</text>
    </svg>
  );
};