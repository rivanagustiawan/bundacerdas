// ** Next Import
import { useState,useEffect } from 'react'
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Swal from 'sweetalert2'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

import configs from 'src/configs/configs'
import axios from 'axios'


// Styled Components
const ForgotIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const ForgotIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  '& svg': { mr: 1.5 },
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const ResetPassword = ({token}) => {
  const [error, setError] = useState([])
  const [input, setInput] = useState([])
  const [values, setValues] = useState({
    showNewPassword: false,
    showConfirmNewPassword: false
  })

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  async function postData() {
    try {
      const response = await axios({
        method: 'post',
        url: `${configs.API_URL}/auth/reset-password`,
        data: {
          'token' : token,
          'newPassword' : input.newPassword,
          'confirmNewPassword' : input.confirmNewPassword,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      Swal.fire({
        title: 'Success!',
        text: 'Silahkan Login !',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
      window.location.href = '/login'
      })
    } catch (error) {
      setError(error.response.data.errors)
    }
  }

  const handleChangeInput = e =>{
    const {name, value} = e.target
    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }))
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // console.log(input)
    postData()
  }

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.post(`${configs.API_URL}/auth/check-reset-password`,{
          'token': token,
        },{
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if(response.data == 'invalid'){
          Swal.fire({
            title: 'Expired!',
            text: 'Silahkan Ulangi Kembali',
            icon: 'error',
            confirmButtonText: 'Kebali'
          }).then(() => {
           window.location.href = '/login'
          })

        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  const imageSource =
    skin === 'bordered' ? 'auth-v2-forgot-password-illustration-bordered' : 'auth-v2-forgot-password-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        <ForgotIllustrationWrapper>
          <ForgotIllustration
            style={{ borderRadius: '30px' }}
            alt='login-illustration'
            src={`https://wanitaislam.or.id/wp-content/uploads/2022/08/215cae94-36d7-424d-92ee-143d2e7b0e81.jpg`}
          />
        </ForgotIllustrationWrapper>
        <FooterIllustrationsV2 />
      </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
          <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img src='/images/logo-wanita-islam.png' alt='Logo Wanita Islam' width={50} />
              <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>Reset Password? 🔒</TypographyStyled>
              <Typography variant='body2'>
                Silahkan masukan password baru anda.
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <FormControl error={error.newPassword && 'true'} fullWidth>
                <InputLabel htmlFor='newPassword'>Password Baru</InputLabel>
                <OutlinedInput
                  label='Password Baru'
                  value={input.newPassword}
                  minRows='6'
                  name='newPassword'
                  onChange={handleChangeInput}
                  type={values.showNewPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowNewPassword}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={values.showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {error.newPassword && (
                  <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>{error.newPassword}</FormHelperText>
                )}
              </FormControl>
              <FormControl error={error.confirmNewPassword && 'true'} fullWidth sx={{ mt:5 }}>
                <InputLabel htmlFor='confirmNewPassword'>Konfirmasi Password Baru</InputLabel>
                <OutlinedInput
                  label='Konfirmasi Password Baru'
                  value={input.confirmNewPassword}
                  minRows='6'
                  name='confirmNewPassword'
                  onChange={handleChangeInput}
                  type={values.showConfirmNewPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowConfirmNewPassword}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={values.showConfirmNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {error.confirmNewPassword && (
                  <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>{error.confirmNewPassword}</FormHelperText>
                )}
              </FormControl>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mt:3,mb: 5.25 }}>
                Reset
              </Button>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
ResetPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ResetPassword.guestGuard = true

ResetPassword.getInitialProps = async ({ query }) => {
  const { token } = query

  return { token }
}

export default ResetPassword
