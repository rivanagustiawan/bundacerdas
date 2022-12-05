// ** React Imports
import { useState, Fragment, forwardRef, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { FormHelperText, FormLabel, Grid, ListItemText, MenuItem, Radio, RadioGroup, Select } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useAuth } from 'src/hooks/useAuth'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { onlyNumber } from 'src/helpers/input'
import { LoadingButton } from '@mui/lab'
import { MySwal, MySwalConfirm } from 'src/helpers/sweetAlert'
import { useRouter } from 'next/router'
import ConfirmRegisData from 'src/components/alert/ConfirmRegistration'
import RegistrationSuccess from 'src/components/alert/RegistrationSuccess'
import axios from 'axios'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('md')]: { width: '46rem' }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const Register = () => {
  // ** States
  const defaultInputs = {
    jenis_pengurus: '',
    name: '',
    email: '',
    nik: '',
    jabatan: '',
    role: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    pendidikan_terakhir: '',
    no_hp: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    alamat_lengkap: '',
    memiliki_anak_sekolah: '',
    jenis_hp: '',
    type_hp: '',
    dompet_digital: ''
  }

  const [input, setInput] = useState(defaultInputs)
  const [walletName, setWalletName] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [regencies, setRegencies] = useState([])
  const [districts, setDistricts] = useState([])
  const [villages, setVillages] = useState([])

  // ** Hook
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    getProvinces()
  }, [])

  // ** Definitions
  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      }
    }
  }

  const wallets = ['Tidak ada', 'OVO', 'Gopay', 'DANA', 'LinkAja', 'Lainnya']

  const defaultValues = {
    radio: '',
    dob: null
  }

  const {
    control,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Functions
  const handleChangePerson = event => {
    setWalletName(event.target.value)
    const dompetDigital = event.target.value.sort().toString()

    setInput(prevInput => ({
      ...prevInput,
      dompet_digital: dompetDigital
    }))

    clearErrors('dompet_digital')
  }

  const onChangeInput = e => {
    const { name, value } = e.target

    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }))

    if (name === 'provinsi' && name !== '') {
      setRegencies([])
      getRegencies(value)
      setInput(prevInput => {
        return {
          ...prevInput,
          kota: '',
          kecamatan: '',
          kelurahan: ''
        }
      })
      setDistricts([])
      setVillages([])
    }

    if (name === 'kota' && name !== '') {
      setDistricts([])
      getDistricts(value)
      setInput(prevInput => {
        return {
          ...prevInput,
          kecamatan: '',
          kelurahan: ''
        }
      })
      setVillages([])
    }

    if (name == 'kecamatan' && name !== '') {
      setVillages([])
      getVillages(value)
      setInput(prevInput => {
        return {
          ...prevInput,
          kelurahan: ''
        }
      })
    }

    clearErrors(name)
  }

  const getProvinces = async () => {
    await axios
      .get('https://api-wi.schverse.my.id/api/get/provinces')
      .then(async response => {
        setProvinces(response.data.data.provinces)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getRegencies = async provinceId => {
    await axios
      .get(`https://api-wi.schverse.my.id/api/get/regencies/${provinceId}`)
      .then(async response => {
        setRegencies(response.data.data.regencies)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getDistricts = async regencyId => {
    await axios
      .get(`https://api-wi.schverse.my.id/api/get/districts/${regencyId}`)
      .then(async response => {
        setDistricts(response.data.data.districts)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getVillages = async districtId => {
    await axios
      .get(`https://api-wi.schverse.my.id/api/get/villages/${districtId}`)
      .then(async response => {
        setVillages(response.data.data.villages)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onSubmitRegister = e => {
    e.preventDefault()

    if (isChecked === false) {
      setError('checked', {
        type: 'manual',
        message: 'Anda harus menyetujui persyaratan dan ketentuan yang berlaku'
      })

      return
    }

    const confirmInput = [
      { key: 'Nama', value: input.name },
      {
        key: 'NIK',
        value: input.nik
      },
      {
        key: 'Email',
        value: input.email
      },
      {
        key: 'No. Telp',
        value: input.no_hp
      }
    ]

    MySwalConfirm('', <ConfirmRegisData inputData={confirmInput} />, 'warning', 'Yakin', 'Belum', () => {
      auth.register(
        input,
        success => {
          setInput(defaultInputs)

          MySwal(
            'Registrasi Berhasil',
            <RegistrationSuccess email='dzulfikrialfik@gmail.com' />,
            'success',
            true,
            false,
            () => {
              window.open('https://saweria.co/fikrialfik', '_blank')
              router.replace('/login')
            }
          )
        },
        error => {
          const errors = error.response.data.errors

          for (const index in errors) {
            setError(index, {
              type: 'manual',
              message: errors[index]
            })
          }
        }
      )
    })
  }

  return (
    <DatePickerWrapper>
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 6.5)} !important` }}>
            <Box sx={{ mt: -5, mb: 5, display: 'flex', justifyContent: 'center' }}>
              <img src='/images/logo-wanita-islam.png' alt='Logo Wanita Islam' width={100} />
            </Box>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant='h6'
                sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}
                style={{ textAlign: 'center' }}
              >
                Formulir Pendataan keanggotaan Wanita Islam
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}></Box>

            <form onSubmit={onSubmitRegister}>
              {/* Jenis Pengurus */}
              <FormControl error={Boolean(errors.jenis_pengurus)}>
                <FormLabel>Jenis Pengurus</FormLabel>
                <Controller
                  name='radio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      {...field}
                      aria-label='jenis_pengurus'
                      name='jenis_pengurus'
                      value={input.jenis_pengurus}
                      onChange={onChangeInput}
                    >
                      <Grid container>
                        <Grid item xs={4}>
                          <FormControlLabel
                            value='pusat'
                            label='Pusat'
                            sx={errors.jenis_pengurus ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.jenis_pengurus ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControlLabel
                            value='wilayah'
                            label='Wilayah'
                            sx={errors.jenis_pengurus ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.jenis_pengurus ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControlLabel
                            value='daerah'
                            label='Daerah'
                            sx={errors.jenis_pengurus ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.jenis_pengurus ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControlLabel
                            value='cabang'
                            label='Cabang'
                            sx={errors.jenis_pengurus ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.jenis_pengurus ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControlLabel
                            value='ranting'
                            label='Ranting'
                            sx={errors.jenis_pengurus ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.jenis_pengurus ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControlLabel
                            value='anggota'
                            label='Anggota'
                            sx={errors.jenis_pengurus ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.jenis_pengurus ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  )}
                />
                {errors.jenis_pengurus && (
                  <FormHelperText
                    sx={{ color: 'error.main', marginTop: -3, marginBottom: 5, marginLeft: 0 }}
                    id='validation-basic-radio'
                  >
                    {errors.jenis_pengurus.message}
                  </FormHelperText>
                )}
              </FormControl>
              {/* End Jenis Pengurus */}

              {/* Nama Lengkap */}
              <TextField
                fullWidth
                id='name'
                label='Nama'
                autoFocus
                name='name'
                sx={{ mb: 4 }}
                value={input.name}
                onChange={onChangeInput}
                placeholder='Nama lengkap dengan gelar'
                error={Boolean(errors.name)}
              />
              {errors.name && (
                <FormHelperText
                  sx={{ color: 'error.main', marginTop: -2, marginBottom: 5 }}
                  id='validation-basic-radio'
                >
                  {errors.name.message}
                </FormHelperText>
              )}
              {/* End Nama Lengkap */}

              {/* Email */}
              <TextField
                fullWidth
                label='Email'
                sx={{ mb: 4 }}
                placeholder='Contoh : misal@gmail.com'
                name='email'
                value={input.email}
                onChange={onChangeInput}
                error={Boolean(errors.email)}
              />
              {errors.email && (
                <FormHelperText sx={{ color: 'error.main', marginTop: -2, marginBottom: 5 }} id='validation-input'>
                  {errors.email.message}
                </FormHelperText>
              )}
              {/* End Email */}

              {/* No HP */}
              <TextField
                fullWidth
                label='No. Handphone'
                sx={{ mb: 4 }}
                placeholder='No. Handphone'
                name='no_hp'
                value={input.no_hp}
                onChange={onChangeInput}
                onKeyPress={event => onlyNumber(event)}
                error={Boolean(errors.no_hp)}
              />
              {errors.no_hp && (
                <FormHelperText sx={{ color: 'error.main', marginTop: -2, marginBottom: 5 }} id='validation-input'>
                  {errors.no_hp.message}
                </FormHelperText>
              )}
              {/* End No HP */}

              {/* NIK */}
              <TextField
                fullWidth
                id='nik'
                label='NIK'
                sx={{ mb: 4 }}
                placeholder='NIK'
                name='nik'
                value={input.nik}
                onChange={onChangeInput}
                onKeyPress={event => onlyNumber(event)}
                error={Boolean(errors.nik)}
              />
              {errors.nik && (
                <FormHelperText sx={{ color: 'error.main', marginTop: -2, marginBottom: 5 }} id='validation-input'>
                  {errors.nik.message}
                </FormHelperText>
              )}
              {/* End NIK */}

              {/* Jabatan */}
              <TextField
                fullWidth
                id='jabatan'
                label='Jabatan'
                sx={{ mb: 4 }}
                placeholder='Jabatan'
                name='jabatan'
                value={input.jabatan}
                onChange={onChangeInput}
                error={Boolean(errors.jabatan)}
              />
              {errors.jabatan && (
                <FormHelperText sx={{ color: 'error.main', marginTop: -2, marginBottom: 5 }} id='validation-input'>
                  {errors.jabatan.message}
                </FormHelperText>
              )}
              {/* End Jabatan */}

              {/* Tempat Lahir */}
              <TextField
                fullWidth
                id='tempat-lahir'
                label='Tempat Lahir'
                sx={{ mb: 4 }}
                placeholder='Tempat Lahir'
                name='tempat_lahir'
                value={input.tempat_lahir}
                onChange={onChangeInput}
                error={Boolean(errors.tempat_lahir)}
              />
              {errors.tempat_lahir && (
                <FormHelperText sx={{ color: 'error.main', marginTop: -2, marginBottom: 5 }} id='validation-input'>
                  {errors.tempat_lahir.message}
                </FormHelperText>
              )}
              {/* End Tempat Lahir */}

              {/* Tanggal Lahir */}
              <Grid container>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Tanggal Lahir'
                      value={input.tanggal_lahir}
                      showYearDropdown
                      showMonthDropdown
                      onChange={newValue => {
                        var month = newValue.getMonth() + 1 // getMonth() is zero-based
                        var day = newValue.getDate()

                        var newDate = [
                          `${day > 9 ? '' : '0'}${day}`,
                          `-${month > 9 ? '' : '0'}${month}`,
                          `-${newValue.getFullYear()}`
                        ].join('')

                        // console.log(newDate)

                        setInput(prevInput => ({
                          ...prevInput,
                          tanggal_lahir: newDate
                        }))

                        clearErrors('tanggal_lahir')
                      }}
                      fullWidth
                      placeholder='Tanggal Lahir'
                      sx={{ mb: 4 }}
                      placeholderText='DD/MM/YYYY'
                      customInput={
                        <CustomInput
                          label='Tanggal Lahir'
                          error={Boolean(errors.tanggal_lahir)}
                          aria-describedby='validation-basic-dob'
                        />
                      }
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              {errors.tanggal_lahir && (
                <FormHelperText sx={{ color: 'error.main', marginTop: 2 }} id='validation-input'>
                  {errors.tanggal_lahir.message}
                </FormHelperText>
              )}
              {/* End Tanggal Lahir */}

              {/* Pilih Provinsi */}
              <Grid container>
                <Grid item xs={12} sm={6} style={{ marginTop: 15 }}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-outlined-label'>Pilih Provinsi</InputLabel>
                    <Select
                      label='Age'
                      defaultValue=''
                      id='demo-simple-select-outlined'
                      labelId='demo-simple-select-outlined-label'
                      name='provinsi'
                      value={input.provinsi}
                      onChange={onChangeInput}
                      error={Boolean(errors.provinsi)}
                    >
                      <MenuItem value=''>
                        <em>Pilih Provinsi</em>
                      </MenuItem>
                      {provinces &&
                        provinces.map(province => (
                          <MenuItem value={province.id} key={province.id}>
                            {province.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {errors.provinsi && (
                    <FormHelperText sx={{ color: 'error.main', marginTop: 2 }} id='validation-input'>
                      {errors.provinsi.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} style={{ marginTop: 15 }}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-outlined-label'>Pilih Kabupaten / Kota</InputLabel>
                    <Select
                      label='Kota'
                      defaultValue=''
                      id='demo-simple-select-outlined'
                      labelId='demo-simple-select-outlined-label'
                      name='kota'
                      disabled={regencies.length === 0 ? true : false}
                      value={input.kota}
                      onChange={onChangeInput}
                      error={Boolean(errors.kota)}
                    >
                      <MenuItem value=''>
                        <em>Pilih Kabupaten / Kota</em>
                      </MenuItem>
                      {regencies &&
                        regencies.map(regency => (
                          <MenuItem value={regency.id} key={regency.id}>
                            {regency.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {errors.kota && (
                    <FormHelperText sx={{ color: 'error.main', marginTop: 2 }} id='validation-input'>
                      {errors.kota.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              {/* End Pilih Provinsi */}

              {/* Pilih Kecamatan */}
              <Grid container>
                <Grid item xs={12} sm={6} style={{ marginTop: 15 }}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-outlined-label'>Pilih Kecamatan</InputLabel>
                    <Select
                      label='Age'
                      defaultValue=''
                      name='kecamatan'
                      id='demo-simple-select-outlined'
                      labelId='demo-simple-select-outlined-label'
                      disabled={districts.length === 0 ? true : false}
                      value={input.kecamatan}
                      onChange={onChangeInput}
                      error={Boolean(errors.kecamatan)}
                    >
                      <MenuItem value=''>
                        <em>Pilih Kecamatan</em>
                      </MenuItem>
                      {districts &&
                        districts.map(district => (
                          <MenuItem value={district.id} key={district.id}>
                            {district.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {errors.kecamatan && (
                    <FormHelperText sx={{ color: 'error.main', marginTop: 2 }} id='validation-input'>
                      {errors.kecamatan.message}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} style={{ marginTop: 15 }}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-outlined-label'>Pilih Kelurahan</InputLabel>
                    <Select
                      label='Age'
                      defaultValue=''
                      name='kelurahan'
                      id='demo-simple-select-outlined'
                      labelId='demo-simple-select-outlined-label'
                      disabled={villages.length === 0 ? true : false}
                      value={input.kelurahan}
                      onChange={onChangeInput}
                      error={Boolean(errors.kelurahan)}
                    >
                      <MenuItem value=''>
                        <em>Pilih Kelurahan</em>
                      </MenuItem>
                      {villages &&
                        villages.map(village => (
                          <MenuItem value={village.id} key={village.id}>
                            {village.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {errors.kelurahan && (
                    <FormHelperText sx={{ color: 'error.main', marginTop: 2 }} id='validation-input'>
                      {errors.kelurahan.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              {/* End Pilih Kecamatan */}

              {/* Alamat Lengkap */}
              <Grid style={{ marginTop: 15 }}>
                <TextField
                  rows={4}
                  fullWidth
                  multiline
                  label='Alamat lengkap'
                  id='textarea-outlined-static'
                  name='alamat_lengkap'
                  value={input.alamat_lengkap}
                  onChange={onChangeInput}
                  error={Boolean(errors.alamat_lengkap)}
                />
                {errors.alamat_lengkap && (
                  <FormHelperText sx={{ color: 'error.main', marginTop: 2 }} id='validation-input'>
                    {errors.alamat_lengkap.message}
                  </FormHelperText>
                )}
              </Grid>
              {/* End Alamat Lengkap */}

              {/* Memiliki Anak Sekolah */}
              <FormControl error={Boolean(errors.memiliki_anak_sekolah)} fullWidth style={{ marginTop: 15 }}>
                <FormLabel>Memiliki Anak Yang Masih Sekolah</FormLabel>
                <Controller
                  name='radio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      {...field}
                      aria-label='memiliki_anak_sekolah'
                      name='memiliki_anak_sekolah'
                      value={input.memiliki_anak_sekolah}
                      onChange={onChangeInput}
                    >
                      <Grid container>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='0'
                            label='Tidak'
                            sx={errors.memiliki_anak_sekolah ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.memiliki_anak_sekolah ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='1'
                            label='Ya'
                            sx={errors.memiliki_anak_sekolah ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.memiliki_anak_sekolah ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  )}
                />
                {errors.memiliki_anak_sekolah && (
                  <FormHelperText
                    sx={{ color: 'error.main', marginTop: -3, marginBottom: 5, marginLeft: 0 }}
                    id='validation-basic-radio'
                  >
                    {errors.memiliki_anak_sekolah.message}
                  </FormHelperText>
                )}
              </FormControl>
              {/* End Memiliki Anak Sekolah */}

              {/* Pendidikan Terakhir */}
              <FormControl error={Boolean(errors.pendidikan_terakhir)} fullWidth style={{ marginTop: 15 }}>
                <FormLabel>Pendidikan Terakhir</FormLabel>
                <Controller
                  name='radio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      {...field}
                      aria-label='pendidikan_terakhir'
                      name='pendidikan_terakhir'
                      value={input.pendidikan_terakhir}
                      onChange={onChangeInput}
                    >
                      <Grid container>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='0'
                            label='Tidak ada'
                            sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='SD'
                            label='SD'
                            sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='SMA'
                            label='SMA'
                            sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='SMA/SMU/SMK'
                            label='SMA/SMU/SMK'
                            sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='D3'
                            label='D3'
                            sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='S1'
                            label='S1'
                            sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='S2'
                            label='S2'
                            sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='S3'
                            label='S3'
                            sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.pendidikan_terakhir ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  )}
                />
                {errors.pendidikan_terakhir && (
                  <FormHelperText
                    sx={{ color: 'error.main', marginTop: -3, marginBottom: 5, marginLeft: 0 }}
                    id='validation-basic-radio'
                  >
                    {errors.pendidikan_terakhir.message}
                  </FormHelperText>
                )}
              </FormControl>
              {/* End Pendidikan Terakhir */}

              {/* Jenis Handphone */}
              <FormControl error={Boolean(errors.jenis_hp)} fullWidth>
                <FormLabel>Jenis Handphone</FormLabel>
                <Controller
                  name='radio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      {...field}
                      aria-label='jenis_hp'
                      name='jenis_hp'
                      value={input.jenis_hp}
                      onChange={onChangeInput}
                    >
                      <Grid container>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='0'
                            label='Tidak memiliki'
                            sx={errors.jenis_hp ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.jenis_hp ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='android'
                            label='Android'
                            sx={errors.jenis_hp ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.jenis_hp ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <FormControlLabel
                            value='iphone'
                            label='Iphone'
                            sx={errors.jenis_hp ? { color: 'error.main' } : null}
                            control={<Radio sx={errors.jenis_hp ? { color: 'error.main' } : null} />}
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  )}
                />
                {errors.jenis_hp && (
                  <FormHelperText
                    sx={{ color: 'error.main', marginTop: -3, marginBottom: 5, marginLeft: 0 }}
                    id='validation-basic-radio'
                  >
                    {errors.jenis_hp.message}
                  </FormHelperText>
                )}
              </FormControl>
              {/* End Jenis Handphone */}

              {/* Type Handphone */}
              <TextField
                fullWidth
                id='type-handphone'
                label='Type Handphone'
                sx={{ mb: 4 }}
                placeholder='Type Handphone'
                name='type_hp'
                value={input.type_hp}
                onChange={onChangeInput}
                error={Boolean(errors.type_hp)}
              />
              {errors.type_hp && (
                <FormHelperText
                  sx={{ color: 'error.main', marginTop: -3, marginBottom: 5, marginLeft: 0 }}
                  id='validation-basic-radio'
                >
                  {errors.type_hp.message}
                </FormHelperText>
              )}
              {/* End Type Handphone */}

              {/* Dompet Digital */}
              <Typography sx={{ mb: 2, fontWeight: 500 }}>Dompet Digital Yang Digunakan</Typography>
              <FormControl error={Boolean(errors.dompet_digital)} fullWidth>
                <InputLabel id='demo-multiple-checkbox-label'>
                  <em>Pilih Dompet</em>
                </InputLabel>
                <Select
                  multiple
                  label='Tag'
                  value={walletName}
                  MenuProps={MenuProps}
                  onChange={handleChangePerson}
                  id='demo-multiple-checkbox'
                  labelId='demo-multiple-checkbox-label'
                  renderValue={selected => selected.join(',')}
                  error={Boolean(errors.dompet_digital)}
                >
                  {wallets.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={walletName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
                {errors.dompet_digital && (
                  <FormHelperText sx={{ color: 'error.main', marginTop: 2, marginLeft: 0 }} id='validation-basic-radio'>
                    {errors.dompet_digital.message}
                  </FormHelperText>
                )}
              </FormControl>
              {/* End Dompet Digital */}

              {/* Checkbox Persetujuan */}
              <Grid style={{ marginTop: 15 }}>
                <FormControlLabel
                  sx={errors.checked ? { color: 'error.main' } : null}
                  control={
                    <Checkbox
                      sx={errors.checked ? { color: 'error.main' } : null}
                      onChange={() => {
                        isChecked === false ? setIsChecked(true) : setIsChecked(false)

                        isChecked === false
                          ? clearErrors('checked')
                          : setError('checked', {
                              type: 'manual',
                              message: 'Anda harus menyetujui persyaratan dan ketentuan yang berlaku'
                            })
                      }}
                    />
                  }
                  label={
                    <Fragment>
                      <span>Saya menyetujui </span>
                      <Typography
                        href='/'
                        variant='body2'
                        component={Link}
                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                        onClick={e => e.preventDefault()}
                      >
                        syarat dan ketentuan yang berlaku
                      </Typography>
                    </Fragment>
                  }
                />
                {errors.checked && (
                  <FormHelperText
                    sx={{ color: 'error.main', marginTop: -2, marginBottom: 5 }}
                    id='validation-basic-checkbox'
                  >
                    {errors.checked.message}
                  </FormHelperText>
                )}
              </Grid>
              {/* End Checkbox Persetujuan */}

              <LoadingButton
                fullWidth
                type='submit'
                size='large'
                loading={auth.loadingButton}
                variant='contained'
                sx={{ mb: 7 }}
              >
                Daftar
              </LoadingButton>

              {/* Redirect To Login */}
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Sudah punya akun?</Typography>
                <Typography component={Link} href='/login' sx={{ color: 'primary.main', textDecoration: 'none' }}>
                  Login
                </Typography>
              </Box>
              {/* End Redirect To Login */}
            </form>
          </CardContent>
        </Card>
      </Box>
    </DatePickerWrapper>
  )
}

Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
