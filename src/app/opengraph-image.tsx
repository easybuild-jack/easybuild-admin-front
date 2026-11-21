import { ImageResponse } from 'next/og'

export const alt = 'EasyBuild Admin（易构）- 现代化中后台前端脚手架'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const stackTags = ['Next.js 16', 'React 19', 'TypeScript 6', 'Tailwind CSS 4', 'Shadcn/ui']

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #09090b 0%, #11131a 60%, #0b1412 100%)',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: '#000000',
                border: '1px solid rgba(0, 255, 157, 0.35)',
                color: '#00FF9D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: '-1px',
              }}
            >
              EB
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#e4e4e7' }}>
              EasyBuild Admin
            </div>
          </div>

          <div
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              border: '1px solid rgba(0, 255, 157, 0.3)',
              background: 'rgba(0, 255, 157, 0.08)',
              color: '#00FF9D',
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: '0.12em',
            }}
          >
            MODERN ADMIN SCAFFOLD
          </div>
        </div>

        {/* Center Title & Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span>EasyBuild Admin</span>
            <span style={{ color: '#52525b', fontWeight: 300 }}>—</span>
            <span style={{ color: '#00FF9D' }}>易构</span>
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.5,
              color: '#a1a1aa',
              maxWidth: 920,
            }}
          >
            现代化中后台前端框架与脚手架 · 动态路由菜单 · 声明式表单 · 配置化表格 · 多主题引擎
          </div>
        </div>

        {/* Bottom Tech Stack Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          {stackTags.map((tag) => (
            <div
              key={tag}
              style={{
                padding: '10px 20px',
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#e4e4e7',
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

