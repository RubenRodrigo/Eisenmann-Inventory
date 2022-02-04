import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (session) {
      console.log(session);
    }

  }, [session])
  return (
    <Typography>
      HOLA MUNDO
    </Typography>
  )
}

export default Home
