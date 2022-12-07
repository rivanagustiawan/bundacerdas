import React,{useState} from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import { FormHelperText } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import axios from 'axios'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


import authConfig from 'src/configs/auth'
import configs from 'src/configs/configs'

function Change() {
const [error, setError] = useState([])  
  const [values, setValues] = useState({
    oldPassword: '',
    showOldPassword: false,
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  })
// Handle Old Password
const handleOldPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowOldPassword = () => {
    setValues({ ...values, showOldPassword: !values.showOldPassword })
  }

  const handleMouseDownOldPassword = event => {
    event.preventDefault()
  }
// End Handle old Password
 

// Handle New Password

  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }
// End Handle New Password

  // Handle Confirm Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }
// End Handle Confirm Password

async function postData() {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    try {
      const response = await axios({
          method: "post",
          url: `${configs.API_URL}/profile/change-password`,
          data: values,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`
          },
      });
      window.location.href='/profile/view'
      } catch(errors) {
        console.log(errors)
      setError(errors.response.data.errors)
      console.log(error)
      }
  }

  const handleForm = (e) =>{
    e.preventDefault()
    // console.log(values)
    postData()
  }

  return (
    <Grid>
    <Grid item xs={6}  >
        <Card >
          <CardHeader title='Change Password'/>
          <CardContent>
            <form onSubmit={handleForm}>
              <Grid container spacing={6}>

                <Grid item xs={12} sm={12}>
                  <FormControl error={error.oldPassword && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-new-password'>Password Lama</InputLabel>
                    <OutlinedInput
                      label='Password Lama'
                      value={values.oldPassword}
                      id='user-view-security-old-password'
                      onChange={handleOldPasswordChange('oldPassword')}
                      type={values.showOldPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowOldPassword}
                            aria-label='toggle password visibility'
                            onMouseDown={handleMouseDownOldPassword}
                          >
                            <Icon icon={values.showOldPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                      />
                      {error.oldPassword && (
                        <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                          {error.oldPassword}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl error={error.newPassword && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-new-password'>Password Baru</InputLabel>
                    <OutlinedInput
                      label='Password Baru'
                      value={values.newPassword}
                      minRows='6'
                      id='user-view-security-new-password'
                      onChange={handleNewPasswordChange('newPassword')}
                      type={values.showNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowNewPassword}
                            aria-label='toggle password visibility'
                            onMouseDown={handleMouseDownNewPassword}
                          >
                            <Icon icon={values.showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />

                    {error.newPassword && (
                        <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                          {error.newPassword}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl error={error.confirmNewPassword && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Konfirmasi Password Baru</InputLabel>
                    <OutlinedInput
                      label='Konfirmasi Password Baru'
                      value={values.confirmNewPassword}
                      id='user-view-security-confirm-new-password'
                      type={values.showConfirmNewPassword ? 'text' : 'password'}
                      onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownConfirmNewPassword}
                          >
                            <Icon icon={values.showConfirmNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {error.confirmNewPassword && (
                        <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                          {error.confirmNewPassword}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button type='submit' variant='contained'>
                    Ubah Password
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      </Grid>
  )
}


Change.acl = {
    action: 'read',
    subject: 'acl-page'
  }

export default Change