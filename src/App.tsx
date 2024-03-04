import { Button } from '@nextui-org/react'
import { useState } from 'react'
import Welcome from './components/Welcome'
import MainLayout from './layout/MainLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainLayout title="Home">
      <h1>Welcome to Your App!</h1>
      {/* Add your content here */}
    </MainLayout>
  )
}

export default App
