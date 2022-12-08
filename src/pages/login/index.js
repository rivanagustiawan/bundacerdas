// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Fab, Fade } from '@mui/material'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
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

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@materialize.com'
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = e => {
    e.preventDefault()

    auth.login({ email: enteredEmail, password: enteredPassword, rememberMe }, error => {
      const errors = error.response.data

      if (errors.type === 'validation') {
        const errorField = errors.message

        if (errorField.email) {
          setError('email', {
            type: 'manual',
            message: errorField.email
          })
        }

        if (errorField.password) {
          setError('password', {
            type: 'manual',
            message: errorField.password
          })
        }
      } else if (errors.type === 'attempt') {
        setError('loginAttempt', {
          type: 'manual',
          message: 'Email atau password salah!'
        })
      } else if (errors.type === 'unactivated') {
        setError('unactivated', {
          type: 'manual',
          message: 'Oopss! Email anda belum diaktivasi. Silahkan check email anda untuk melakukan aktivasi'
        })
      }
    })
  }

  const onChangeEmail = e => {
    setEnteredEmail(e.target.value)
    clearErrors('loginAttempt')
  }

  const onChangePassword = e => {
    setEnteredPassword(e.target.value)
    clearErrors('loginAttempt')
  }

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <LoginIllustrationWrapper>
            <LoginIllustration
              style={{ borderRadius: '30px' }}
              alt='login-illustration'
              src={`https://wanitaislam.or.id/wp-content/uploads/2022/08/215cae94-36d7-424d-92ee-143d2e7b0e81.jpg`}
            />
          </LoginIllustrationWrapper>
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
              <TypographyStyled variant='h5'>{`Selamat datang di ${themeConfig.templateName}! 👋🏻`}</TypographyStyled>
              <Typography variant='body2'>Silahkan login</Typography>
            </Box>

            {/* Alert unauthenticated */}
            {errors.loginAttempt && (
              <Fade in={errors.loginAttempt}>
                <Alert
                  severity='error'
                  action={
                    <IconButton
                      size='small'
                      color='inherit'
                      aria-label='close'
                      onClick={() => clearErrors('loginAttempt')}
                    >
                      <Icon icon='mdi:close' fontSize='inherit' />
                    </IconButton>
                  }
                >
                  {errors.loginAttempt.message}
                </Alert>
              </Fade>
            )}

            {/* Alert unactivated */}
            {errors.unactivated && (
              <Fade in={errors.unactivated}>
                <Alert
                  severity='error'
                  action={
                    <IconButton
                      size='small'
                      color='inherit'
                      aria-label='close'
                      onClick={() => clearErrors('unactivated')}
                    >
                      <Icon icon='mdi:close' fontSize='inherit' />
                    </IconButton>
                  }
                >
                  {errors.unactivated.message}
                </Alert>
              </Fade>
            )}
            <br />

            <form noValidate autoComplete='off' onSubmit={onSubmit}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={enteredEmail}
                      onBlur={onBlur}
                      onChange={onChangeEmail}
                      error={Boolean(errors.email)}
                      placeholder='admin@materialize.com'
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Kata sandi
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={enteredPassword}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChangePassword}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <FormControlLabel
                  label='Ingat saya'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
              </Box>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                Masuk
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography href='/forgot-password' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                  Lupa Kata Sandi?
                </Typography>
              </Box>
              <Box sx={{ mt:2,display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Belum punya akun?</Typography>
                <Typography href='/register' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                  Daftar
                </Typography>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
      <Fab
        color='#075e54'
        aria-label='add'
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: '#128c7e',
          ':hover': { backgroundColor: '#075e54' }
        }}
        onClick={() =>
          window.open(
            'https://api.whatsapp.com/send/?phone=6285640680815&text=Halo+SCHVerse%0A&type=phone_number&app_absent=0',
            '_blank'
          )
        }
      >
        <WhatsAppIcon sx={{ color: 'white' }} />
      </Fab>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
