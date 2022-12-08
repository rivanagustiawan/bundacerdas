// ** Next Import
import { useEffect, useState } from 'react'
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { LoadingButton } from '@mui/lab'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Swal from 'sweetalert2'

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


import authConfig from 'src/configs/auth'
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

const ForgotPassword = () => {
  const [error, setError] = useState([])
  const [email, setEmail] = useState([])
  const [loading, setLoading] = useState(false)
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  async function postData() {
    try {
      setLoading(true)
      const response = await axios({
        method: 'post',
        url: `${configs.API_URL}/auth/forgot-password`,
        data: email,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setLoading(false)
        Swal.fire({
          title: 'Success!',
          text: 'Silahkan Check Email !',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
        window.location.href = '/login'
        })
    } catch (error) {
      setLoading(false)
      console.log(error)
      setError(error.response.data.errors)
    }
  }

  const handleChangeEmail = (e) =>{
    setEmail(prevInput => ({
      ...prevInput,
      email: e.target.value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    postData()
  }

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
              <TypographyStyled variant='h5'>Forgot Password? 🔒</TypographyStyled>
              <Typography variant='body2'>
                Enter your email and we&prime;ll send you instructions to reset your password
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <TextField autoFocus type='email' error={error.email && 'true'} label='Email' sx={{ display: 'flex', mb: 1 }} onChange={(e) => handleChangeEmail(e)} />
              {error.email && (
                <FormHelperText sx={{ color: 'error.main' }}>{error.email}</FormHelperText>
              )}
              <LoadingButton
                fullWidth
                type='submit'
                size='large'
                loading={loading}
                variant='contained'
                sx={{ mt: 5, mb:3 }}
              >
                 Send reset link
              </LoadingButton>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LinkStyled href='/login'>
                  <Icon icon='mdi:chevron-left' fontSize='2rem' />
                  <span>Back to login</span>
                </LinkStyled>
              </Typography>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword
