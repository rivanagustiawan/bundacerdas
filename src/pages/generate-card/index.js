import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Logo from './logo.png'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

// import Avatar from './foto.png'
import authConfig from 'src/configs/auth'
import axios from 'axios'
import configs from 'src/configs/configs'
import Button from '@mui/material/Button'
import html2canvas from 'html2canvas'
import downloadjs from 'downloadjs'

function Card() {
  const [dataUser, setDataUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleCaptureClick = async () => {
    const kartuAnggotaElements = document.querySelector('#kartu-anggota')

    const canvas = await html2canvas(kartuAnggotaElements, {
      allowTaint: true,
      useCORS: true,
      scale: 1
    })
    const dataURL = canvas.toDataURL('image/png')
    downloadjs(dataURL, 'Kartu Anggota.png', 'image/png')
  }

  async function getData() {
    setIsLoading(true)
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    try {
      const response = await axios({
        method: 'get',
        url: `${configs.API_URL}/profile/view`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`
        }
      })
      setDataUser(response.data.user)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  if (isLoading) return null

  return (
    <Box>
      <Box sx={{ flexGrow: 2 }} style={{ width: '500px' }} id='kartu-anggota'>
        <Grid
          container
          style={{
            backgroundColor: '#613E76',
            height: '140px'
          }}
        >
          <Grid
            xs={3}
            style={{
              marginTop: 20
            }}
            alignItems='center'
            justifyContent='center'
          >
            <Image
              src={Logo}
              alt='logo-wanita-islam'
              margin={0}
              style={{
                width: '140px',
                height: '100px'
              }}
            />
          </Grid>
          <Grid xs={9} direction='column' display='flex' justify='center' textAlign='center'>
            <Typography variant='h6' display='block' sx={{ mt: 3, ml: -8 }} style={{ fontSize: 16 }} color='#fff'>
              PIMPINAN PUSAT
            </Typography>
            <Grid
              justify='center'
              textAlign='center'
              style={{
                backgroundColor: '#E3A2FF',
                width: '300px',
                marginLeft: '25px',
                paddingTop: '2px',
                height: '50px',
                borderRadius: '100px'
              }}
            >
              <Typography variant='h4' display='block' style={{ fontSize: 36, fontWeight: 'bold' }} color='#613E76'>
                WANITA ISLAM
              </Typography>
              <Typography
                variant='h6'
                display='block'
                sx={{ mt: 2, letterSpacing: 4 }}
                style={{ fontSize: 12 }}
                color='#fff'
              >
                KARTU TANDA ANGGOTA
              </Typography>
              <Typography variant='h6' display='block' sx={{ letterSpacing: 4 }} style={{ fontSize: 11 }} color='#fff'>
                {dataUser.nomor_anggota}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          style={{
            backgroundImage: 'linear-gradient(#644179, #D094EC)',
            height: '10px'
          }}
        ></Grid>
        <Grid
          container
          direction='column'
          style={{
            backgroundImage: 'linear-gradient(#644179, #D094EC)',
            height: '200px'
          }}
        >
          <Grid
            xs={3}
            style={{
              marginTop: '35px',
              marginLeft: '40px'
            }}
          >
            <Box
              component='img'
              sx={{
                height: 130,
                width: 110
              }}
              src={`${configs.BASE_URL}${dataUser.avatar}`}
            />
          </Grid>
          <Grid
            xs={9}
            direction='row'
            style={{
              marginLeft: '20px'
            }}
          >
            <Grid
              style={{
                height: '100',
                marginTop: '35px'
              }}
            >
              <Typography
                variant='h6'
                display='block'
                sx={{ mt: 2, letterSpacing: 4 }}
                style={{ fontSize: 18, fontWeight: 'bold' }}
                color='#fff'
              >
                {dataUser.name}
              </Typography>
            </Grid>
            <Grid
              style={{
                height: '100',
                marginTop: '50px',
                width: '300px'
              }}
            >
              <Typography variant='h6' display='block' sx={{ mt: 2 }} style={{ fontSize: 14 }} color='#fff'>
                {dataUser.alamat_lengkap}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Grid
        style={{
          marginTop: '30px'
        }}
      >
        <Button onClick={handleCaptureClick} variant='contained'>
          Download Kartu
        </Button>
      </Grid>
    </Box>
  )
}

Card.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default Card
