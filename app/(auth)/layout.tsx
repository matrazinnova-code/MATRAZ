export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg)' }}>
      <div className="hex-bg" />
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
