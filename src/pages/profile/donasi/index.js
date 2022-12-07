import React, { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'
import authConfig from 'src/configs/auth'
import CardDonasi from 'src/components/card/CardDonasi'
import CardTotalDonasi from 'src/components/card/CardTotalDonasi'

function Donasi() {
  const user = window.localStorage.getItem(authConfig.UserData)
  const userData = JSON.parse(user)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <CardDonasi email={userData.email} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardTotalDonasi totalDonasi={userData.jumlah_donasi} />
      </Grid>
    </Grid>
  )
}

Donasi.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default Donasi
