import type { Vertical, ContactStatus } from '@/lib/supabase/database.types'

const VERTICAL_COLORS: Record<Vertical, string> = {
  business: '#C0C0C8',
  healthcare: '#00B4D8',
  it: '#7B5FFF',
}

const STATUS_COLORS: Record<ContactStatus, string> = {
  lead: '#8A8A8F',
  prospect: '#E040A0',
  customer: '#00D4AA',
}

export function VerticalBadge({ vertical }: { vertical: Vertical }) {
  const labels: Record<Vertical, string> = {
    business: 'Business',
    healthcare: 'Healthcare',
    it: 'IT',
  }
  const color = VERTICAL_COLORS[vertical]
  return (
    <span className={`badge ${vertical}`}>
      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {labels[vertical]}
    </span>
  )
}

export function StatusBadge({ status }: { status: ContactStatus }) {
  const labels: Record<ContactStatus, string> = {
    lead: 'Lead',
    prospect: 'Prospect',
    customer: 'Customer',
  }
  const color = STATUS_COLORS[status]
  return (
    <span className={`badge ${status}`}>
      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {labels[status]}
    </span>
  )
}

export function ContactAvatar({
  name,
  vertical,
  size = 32,
}: {
  name: string
  vertical?: Vertical
  size?: number
}) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const color = vertical ? VERTICAL_COLORS[vertical] : '#8A8A8F'
  return (
    <div
      className="avatar-cell"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, ${color}33 0%, ${color}11 100%)`,
        color,
        borderColor: `${color}44`,
      }}
    >
      {initials}
    </div>
  )
}

export { VERTICAL_COLORS, STATUS_COLORS }
