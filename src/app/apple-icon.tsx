import { ImageResponse } from 'next/og'

export const alt = 'EasyBuild Admin'
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00FF9D',
          borderRadius: '22%',
          fontWeight: 900,
          letterSpacing: '-4px',
        }}
      >
        EB
      </div>
    ),
    {
      ...size,
    }
  )
}

