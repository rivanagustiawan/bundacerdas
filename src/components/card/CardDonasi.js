// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Grid, TextField } from '@mui/material'
import { copyToClipboard } from 'src/helpers/common'

const CardDonasi = ({ email }) => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <CustomAvatar skin='light' sx={{ width: 56, height: 56, mb: 2 }}>
          <Icon icon='material-symbols:attach-money' fontSize='2rem' />
        </CustomAvatar>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Donasi
        </Typography>
        <Typography variant='body2' sx={{ mb: 6.5 }}>
          Anda akan darahkan ke halaman Saweria untuk mengirimkan donasi. Pastikan Anda memasukkan email di bawah ini
          ketika melakukan donasi. Klik salin untuk memudahkan Anda.
        </Typography>
        <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} mb={5}>
          <Grid item xs={8} mr={1}>
            <TextField
              fullWidth
              hiddenLabel
              id='filled-hidden-label-small'
              defaultValue={email}
              value={email}
              variant='filled'
              size='small'
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant='outlined'
              size='sm'
              onClick={() => {
                copyToClipboard(email, 'top-right')
              }}
            >
              Salin
            </Button>
          </Grid>
        </Grid>
        <Button
          variant='contained'
          sx={{ p: theme => theme.spacing(1.75, 5.5) }}
          onClick={() => window.open('https://saweria.co/fikrialfik', '_blank')}
        >
          Klik disini untuk Donasi
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardDonasi
