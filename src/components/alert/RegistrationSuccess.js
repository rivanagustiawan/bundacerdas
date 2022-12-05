import { Button, Grid, TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { copyToClipboard } from 'src/helpers/common'

export default function RegistrationSuccess({ email }) {
  return (
    <>
      <Typography align='center' variant='subtitle1' mb={3}>
        Data anda telah disimpan. Silahkan cek email anda untuk mendapatkan detail informasi yang telah kami kirimkan
        berupa password untuk anda login. Selanjutnya anda akan diarahkan ke halaman saweria untuk mengirimkan donasi.
        Pastikan anda menggunakan email dibawah ini. Silahkan klik salin untuk memudahkan anda.
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
