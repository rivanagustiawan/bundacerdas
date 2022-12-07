import { useEffect, useState } from 'react'
import axios from 'axios'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardStatisticsHorizontal from 'src/components/card-stats-horizontal'
import Icon from 'src/@core/components/icon'

import configs from 'src/configs/configs'
import authConfig from 'src/configs/auth'

const Home = () => {
  const [totalMember, setTotalMember] = useState(0)
  const [totalRegister, setTotalRegister] = useState(0)

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    ;(async () => {
      try {
        const response = await axios.get(`${configs.API_URL}/statistics/total-members`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        })

        setTotalMember(response.data.data.total_member)
      } catch (error) {
        console.log(error)
      }
    })()
    ;(async () => {
      try {
        const response = await axios.get(`${configs.API_URL}/statistics/total-register`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        })

        setTotalRegister(response.data.data.total_register)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <Grid container spacing={6}>
      {/* Total member */}
      <Grid item xs={12} md={6}>
        <CardStatisticsHorizontal
          stats={totalMember}
          title='Total Member'
          sxAvatar={{ fontSize: '3rem', width: '4rem', height: '4rem' }}
          icon={<Icon icon='mdi:account-outline' />}
        />
      </Grid>
      {/* Total Registrasi kemarin */}
      <Grid item xs={12} md={6}>
        <CardStatisticsHorizontal
          sxAvatar={{ fontSize: '3rem', width: '4rem', height: '4rem' }}
          stats={totalRegister}
          title='Total Registrasi kemarin'
          icon={<Icon icon='mdi:account-details' />}
        />
      </Grid>
    </Grid>
  )
}

export default Home
