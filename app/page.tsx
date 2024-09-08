import { World1Render } from "game/render/WorldRender";

export default function Home() {
  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#666',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <World1Render />
    </main>
  )
}
