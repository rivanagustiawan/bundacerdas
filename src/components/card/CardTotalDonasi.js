// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { formatNumber } from 'src/helpers/common'

const CardTotalDonasi = ({ totalDonasi = 0 }) => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <CustomAvatar skin='light' sx={{ width: 56, height: 56, mb: 2 }}>
          <Icon icon='uil:money-insert' fontSize='2rem' />
        </CustomAvatar>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Total Donasi
        </Typography>
        <Typography variant='h3' sx={{ mb: 6.5 }}>
          Rp{formatNumber(totalDonasi)},-
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardTotalDonasi
