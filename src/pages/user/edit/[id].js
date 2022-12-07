import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import authConfig from 'src/configs/auth'
import configs from 'src/configs/configs'

const jenisPengurus = ['Pusat', 'Cabang', 'Wilayah', 'Daerah', 'Ranting', 'Anggota']
const pendidikan = ['Tidak Ada', 'SD', 'SMP', 'SMA/SMU/SMK', 'D3', 'S1', 'S2', 'S3']
const wallets = ['OVO', 'Gopay', 'DANA', 'LinkAja', 'Lainnya']

const Edit = ({id}) => {
    const [dataUser, setDataUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [dompetDigital, setDompetDigital] = useState([])
    const [arrayDompetDigital, setArrayDompetDigital] = useState([])
    const [arrayKecamatan, setArrayKecamatan] = useState([])
    const [arrayKelurahan, setArrayKelurahan] = useState([])
    const [error, setError] = useState([])
    const [arrayKota, setArrayKota] = useState([])
    const [arrayProvinsi, setArrayProvinsi] = useState([])
    

    async function getProvinces() {
      const response = await axios.get(`${configs.API_URL}/get/provinces`);
      setArrayProvinsi(response.data.data.provinces)
    }
    async function getRegency(id) {
      const response = await axios.get(`${configs.API_URL}/get/regencies/${id}`);
      setArrayKota(response.data.data.regencies)
    }
    async function getDistricts(id) {
      const response = await axios.get(`${configs.API_URL}/get/districts/${id}`);
      setArrayKecamatan(response.data.data.districts)
    }
    async function getVillages(id) {
      const response = await axios.get(`${configs.API_URL}/get/villages/${id}`);
      setArrayKelurahan(response.data.data.villages)
    }

    async function getData() {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      try {
        setIsLoading(true)
        const response = await axios({
            method: "get",
            url: `${configs.API_URL}/users/${id}/edit`,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            },
        });
        setDataUser(response.data.user)
        getProvinces()
        getRegency(response.data.user.provinsi)
        getDistricts(response.data.user.kota)
        getVillages(response.data.user.kecamatan)
        setDompetDigital(response.data.user.dompet_digital)
        setArrayDompetDigital(response.data.user.dompet_digital)
        setIsLoading(false)
        } catch(error) {
        console.log(error)
        }
    }
    async function postData() {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      try {
        const response = await axios({
            method: "put",
            url: `${configs.API_URL}/users/${id}`,
            data: dataUser,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            },
        });
        window.location.href='/user'
        } catch(error) {
        setError(error.response.data.errors)
        }
    }

    function handleForm(e) {
      const newDataUser = {...dataUser}
      newDataUser[e.target.id] = e.target.value
      if(e.target.value == ''){
        setError(true)
      }else{
        setError(false)
      }
      setDataUser(newDataUser)
  }

  const handleDate = (e) => {
    const newDataUser = {...dataUser}
      newDataUser['tanggal_lahir'] = e.$d.toISOString()
      setDataUser(newDataUser)
  }
  function handleChangeSelect(e,id){
    const newDataUser = {...dataUser}
    newDataUser[id] = e.target.value
    setDataUser(newDataUser)
  }

  function handleChangeHp(e){
    const newDataUser = {...dataUser}
    newDataUser['jenis_hp'] = e.target.value

    if(e.target.value == 0){
      newDataUser['type_hp'] = '-'
    }
    setDataUser(newDataUser)

  }
  function handleCheckBox(e){
    const newDataUser = {...dataUser}

      if(e.target.checked == false){
        var array = [...arrayDompetDigital]
        var index = array.indexOf(e.target.value)
        if (index !== -1) {
          array.splice(index, 1);
          setArrayDompetDigital(array);
          newDataUser['dompet_digital'] = array
        }
      }else if(e.target.checked == true){
        setArrayDompetDigital(arrayDompetDigital => [...arrayDompetDigital,e.target.value] );
        newDataUser['dompet_digital'] = [...arrayDompetDigital,e.target.value]
      }
    
    setDataUser(newDataUser)
   
   
  }
  
  function handleChangeProvinsi(e){
    const newDataUser = {...dataUser}
    newDataUser['kota'] = ''
    newDataUser['kecamatan'] = ''
    newDataUser['kelurahan'] = ''
    setDataUser(newDataUser)
  }

  function handleSubmit(e){
    e.preventDefault()
    
    postData()
    // console.log(dataUser)

  }
    useEffect(() => {
      getData()
    }, [])
    if(isLoading) return null 

  return (
    <Grid item xs={12}>
        <Card>
          <CardHeader title='Edit Data User' />
          <CardContent>
            <Alert icon={false} severity='warning' sx={{ mb: 6 }}>
              <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                Peringatan !!
              </AlertTitle>
              Mohon Teliti dan Bertanggung Jawab Dalam Mengedit Data User.
            </Alert>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl error={error.name && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-new-password'>Nama Lengkap</InputLabel>
                    <OutlinedInput
                      value={dataUser.name}
                      onChange={(e) => handleForm(e)}
                      id="name"
                      label='Nama Lengkap'
                    />
                    {error.name && (
                        <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                          {error.name}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Nomor Induk Kependudukan</InputLabel>
                    <OutlinedInput
                      value={dataUser.nik}
                      readOnly
                      label='NOMOR INDUK KEPENDUDUKAN'
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Nomor Anggota</InputLabel>
                    <OutlinedInput
                      value={dataUser.nomor_anggota}
                      readOnly
                      label='Nomor Anggota'
                    />
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl error={error.email && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Email</InputLabel>
                    <OutlinedInput
                      onChange={(e) => handleForm(e)}
                      id="email"
                      value={dataUser.email}
                      label='Email'
                    />
                    {error.email && (
                        <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                          {error.email}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl error={error.no_hp && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Nomor Telpon</InputLabel>
                    <OutlinedInput
                      onChange={(e) => handleForm(e)}
                      id="no_hp"
                      value={dataUser.no_hp}
                      label='Nomor Telpon'
                    />
                    {error.no_hp && (
                        <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                          {error.no_hp}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl error={error.jabatan && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Jabatan</InputLabel>
                    <OutlinedInput
                      value={dataUser.jabatan}
                      id="jabatan"
                      onChange={(e) => handleForm(e)}
                      label='Jabatan'
                    />
                    {error.jabatan && (
                        <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                          {error.jabatan}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl error={error.jenis_pengurus && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Jenis Pengurus</InputLabel>
                    <Select
                        fullWidth
                        label='Jenis Pengurus'
                        value={dataUser.jenis_pengurus}
                        onChange={(e) => handleChangeSelect(e,'jenis_pengurus')}
                        inputProps={{ placeholder: 'Jenis Pengurus' }}
                        >
                          {jenisPengurus.map(name => (
                            <MenuItem value={name} >{name}</MenuItem>
                          ))}
                    </Select>
                    {error.jenis_pengurus && (
                        <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                          {error.jenis_pengurus}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl error={error.tempat_lahir && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Tempat Lahir</InputLabel>
                    <OutlinedInput
                      onChange={(e) => handleForm(e)}
                      id='tempat_lahir'
                      value={dataUser.tempat_lahir}
                      label='Tempat Lahir'
                    />
                    {error.tempat_lahir && (
                        <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                          {error.tempat_lahir}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl error={error.tanggal_lahir && 'true'} fullWidth>
                    <LocalizationProvider  dateAdapter={AdapterDayjs} >
                        <DesktopDatePicker
                        label="Tanggal Lahir"
                        value={dataUser.tanggal_lahir}
                        onChange={handleDate}
                        inputFormat="YYYY/MM/DD"
                        renderInput={(params) => <TextField size="large"  {...params} />}
                        />
                    </LocalizationProvider>
                    {error.tanggal_lahir && (
                        <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                          {error.tanggal_lahir}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl error={error.pendidikan_terakhir && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Pendidikan Terakhir</InputLabel>
                        <Select
                        fullWidth
                        value={dataUser.pendidikan_terakhir}
                        label='Pendidikan Terakhir'
                        id="pendidikan_terakhir"
                        onChange={(e) => handleChangeSelect(e,'pendidikan_terakhir')}
                        inputProps={{ placeholder: 'Pendidikan Terakhir' }}
                        >
                            {pendidikan.map(name => (
                            <MenuItem value={name} >{name}</MenuItem>
                          ))}
                        </Select> 
                      {error.pendidikan_terakhir && (
                          <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                            {error.pendidikan_terakhir}
                          </FormHelperText>
                        )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl error={error.provinsi && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Provinsi</InputLabel>
                        <Select
                        fullWidth
                        value={dataUser.provinsi }
                        label='Provinsi' 
                        onChange={(e) => [handleChangeSelect(e,'provinsi'), handleChangeProvinsi(e) , getRegency(e.target.value)]}
                        >
                        {arrayProvinsi &&
                          arrayProvinsi.map(provinsi => (
                            <MenuItem value={provinsi.id} key={provinsi.id}>
                              {provinsi.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {error.provinsi && (
                          <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                            {error.provinsi}
                          </FormHelperText>
                        )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl error={error.kota && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Kota / Kabupaten</InputLabel>
                        <Select
                        fullWidth
                        value={dataUser.kota }
                        label='Kota / Kabupaten'
                        onChange={(e) => [handleChangeSelect(e,'kota'), getDistricts(e.target.value)]}
                        inputProps={{ placeholder: 'Kota / Kabupaten' }}
                        >
                          {arrayKota &&
                            arrayKota.map(kota => (
                              <MenuItem value={kota.id} key={kota.id}>
                                {kota.name}
                              </MenuItem>
                            ))}
                        </Select>
                        {error.kota && (
                          <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                            {error.kota}
                          </FormHelperText>
                        )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl error={error.kecamatan && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Kecamatan</InputLabel>
                        <Select
                        fullWidth
                        value={dataUser.kecamatan }
                        onChange={(e) => [handleChangeSelect(e,'kecamatan'), getVillages(e.target.value)]}
                        label='Kecamatan'
                        inputProps={{ placeholder: 'Kecamatan' }}
                        >
                          {arrayKecamatan &&
                            arrayKecamatan.map(kecamatan => (
                              <MenuItem value={kecamatan.id} key={kecamatan.id}>
                                {kecamatan.name}
                              </MenuItem>
                            ))}
                        </Select>
                        {error.kecamatan && (
                          <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                            {error.kecamatan}
                          </FormHelperText>
                        )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl error={error.kelurahan && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Kelurahan</InputLabel>
                        <Select
                        fullWidth
                        value={dataUser.kelurahan }
                        onChange={(e) => handleChangeSelect(e, 'kelurahan')}
                        label='Kelurahan'
                        inputProps={{ placeholder: 'Kelurahan' }}
                        >
                          {arrayKelurahan &&
                            arrayKelurahan.map(kelurahan => (
                              <MenuItem value={kelurahan.id} key={kelurahan.id}>
                                {kelurahan.name}
                              </MenuItem>
                            ))}
                        </Select>
                        {error.kelurahan && (
                          <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                            {error.kelurahan}
                          </FormHelperText>
                        )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl error={error.alamat_lengkap && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Alamat Lengkap</InputLabel>
                    <OutlinedInput
                      value={dataUser.alamat_lengkap}
                      onChange={(e) => handleForm(e)}
                      id="alamat_lengkap"
                      label='Alamat Lengkap'
                    />
                    {error.alamat_lengkap && (
                      <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                        {error.alamat_lengkap}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl error={error.memiliki_anak_sekolah && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-new-password'>Anak Yang Sekolah</InputLabel>
                    <OutlinedInput
                      value={dataUser.memiliki_anak_sekolah}
                      id="memiliki_anak_sekolah"
                      onChange={(e) => handleForm(e)}
                      label='Anak Yang Sekolah'
                    />
                    {error.memiliki_anak_sekolah && (
                      <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                        {error.memiliki_anak_sekolah}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl error={error.jenis_hp && 'true'} fullWidth>
                    <InputLabel htmlFor='user-view-security-new-password'>Jenis Handphone</InputLabel>
                    <Select
                        fullWidth
                        value={dataUser.jenis_hp}
                        onChange={(e) => handleChangeHp(e)}
                        label='Jenis Handphone'
                        inputProps={{ placeholder: 'Jenis Handphone' }}
                        >
                            <MenuItem value='0'>Tidak Memiliki</MenuItem>
                            <MenuItem value='Android'>Android</MenuItem>
                            <MenuItem value='Iphone'>Iphone</MenuItem>
                      </Select>
                        {error.jenis_hp && (
                          <FormHelperText sx={{ color: 'error.main', marginTop: 2 }}>
                            {error.jenis_hp}
                          </FormHelperText>
                        )}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='user-view-security-new-password'>Type Handphone</InputLabel>
                    <OutlinedInput
                      disabled={(dataUser.jenis_hp == 0) && 'true'}
                      value={dataUser.type_hp}
                      id="type_hp"
                      onChange={(e) => handleForm(e)}
                      label='Type Handphone'
                    />
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                  <FormLabel>Dompet Digital</FormLabel>
                  <FormGroup
                    row
                    onChange={(e) => handleCheckBox(e)}
                    >
                      {
                        wallets.map(wallet => (
                          <FormControlLabel value={wallet} control={<Checkbox defaultChecked={
                            dompetDigital &&
                            (dompetDigital.find(dompet => dompet == wallet)) && 'true'
                          } />} label={wallet} />
                          ))
                        }
                  </FormGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button href='/user' color='error' variant='contained' sx={{ mr:4 }}>
                    Kembali
                  </Button>
                  <Button type='submit' variant='contained' >
                    Simpan
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
  )
}

export default Edit

Edit.getInitialProps = async ({ query }) => {
    const {id} = query
  
    return {id}
  }