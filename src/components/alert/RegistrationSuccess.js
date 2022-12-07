import { Button, Grid, TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { copyToClipboard } from 'src/helpers/common'

export default function RegistrationSuccess({ email }) {
  return (
    <>
      <Typography align='center' variant='subtitle1' mb={3}>
        Data Anda telah disimpan. Silakan cek email Anda kemudian login dengan memasukkan password sesuai dengan data
        yang dikirimkan melalui email. Selanjutnya, Anda akan darahkan ke halaman Saweria untuk mengirimkan donasi.
        Pastikan Anda memasukkan email di bawah ini ketika melakukan donasi. Klik salin untuk memudahkan Anda.
      </Typography>
      <Grid container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={8} mr={1}>
          <TextField
            fullWidth
            hiddenLabel
            id='filled-hidden-label-small'
            defaultValue={email}
            variant='filled'
            size='small'
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant='contained'
            size='sm'
            onClick={() => {
              copyToClipboard(email, 'top-right')
            }}
          >
            Salin
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
