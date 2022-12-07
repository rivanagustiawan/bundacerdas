import { useState, useEffect, useCallback } from 'react'

import dayjs from 'dayjs'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import axios from 'axios'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import TuneIcon from '@mui/icons-material/Tune'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import moment from 'moment'

import authConfig from 'src/configs/auth'
import configs from 'src/configs/configs'

const RowOptions = ({ id }) => {
  async function deleteData(id) {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    try {
      const response = await axios({
        method: 'delete',
        url: `${configs.API_URL}/users/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    deleteData(id)
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href={`/user/views/${id}`}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          component={Link}
          onClick={handleRowOptionsClose}
          sx={{ '& svg': { mr: 2 } }}
          href={`/user/edit/${id}`}
        >
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.2,
    minWidth: 180,
    field: 'created_at',
    headerName: 'Tanggal Registrasi',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle2' noWrap sx={{ textTransform: 'capitalize' }}>
          {moment(row.created_at).format('lll')}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'nomor_anggota',
    headerName: 'Nomor Anggota',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.nomor_anggota}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 100,
    field: 'jenis_pengurus',
    headerName: 'Pengurus',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.jenis_pengurus}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 100,
    field: 'jabatan',
    headerName: 'Jabatan',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.jabatan}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'name',
    headerName: 'Nama Lengkap',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'nik',
    headerName: 'NIK',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.nik}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'no_hp',
    headerName: 'No. Telp',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.no_hp}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 170,
    field: 'provinsi',
    headerName: 'Provinsi',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.provinsi.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 170,
    field: 'kota',
    headerName: 'Kota / Kabupaten',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.kota.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 170,
    field: 'kecamatan',
    headerName: 'Kecamatan',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.kecamatan.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 170,
    field: 'kelurahan',
    headerName: 'Kelurahan',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.kelurahan.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.nomor_anggota} />
  }
]

export default function Index() {
  const [sampai, setSampai] = useState(dayjs(moment().format()))
  const [dari, setDari] = useState(dayjs(moment().format()))
  const [arrayKecamatan, setArrayKecamatan] = useState([])
  const [arrayKelurahan, setArrayKelurahan] = useState([])
  const [arrayProvinsi, setArrayProvinsi] = useState([])
  const [filterSampai, setFilterSampai] = useState('')
  const [filterDari, setFilterDari] = useState('')
  const [filterBy, setFilterBy] = useState('all')
  const [kelurahan, setKelurahan] = useState('')
  const [tableData, setTableData] = useState([])
  const [kecamatan, setKecamatan] = useState('')
  const [arrayKota, setArrayKota] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(0)
  const [rowCount, setRowCount] = useState()
  const [pengurus, setPengurus] = useState('')
  const [provinsi, setProvinsi] = useState('')
  const [filter, setFilter] = useState('')
  const [kota, setKota] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function getProvinces() {
    const response = await axios.get(`${configs.API_URL}/get/provinces`)
    setArrayProvinsi(response.data.data.provinces)
  }
  async function getRegency(id) {
    const response = await axios.get(`${configs.API_URL}/get/regencies/${id}`)
    setArrayKota(response.data.data.regencies)
  }
  async function getDistricts(id) {
    const response = await axios.get(`${configs.API_URL}/get/districts/${id}`)
    setArrayKecamatan(response.data.data.districts)
  }
  async function getVillages(id) {
    const response = await axios.get(`${configs.API_URL}/get/villages/${id}`)
    setArrayKelurahan(response.data.data.villages)
  }

  const handleFilter = () => {
    fetchData()
  }
  function handlePage(newPage) {
    setPage(newPage)
    console.log(page)
  }
  function handlePageSize(newPageSize) {
    setPageSize(newPageSize)
    console.log(pageSize)
  }

  const handleResetFilter = () => {
    setPengurus('')
    setFilter('')
    setFilterBy('all')
    setProvinsi('')
    setKota('')
    setKecamatan('')
    setKelurahan('')
    setFilterDari('')
    setFilterSampai('')
    setDari(dayjs(moment().format()))
    setSampai(dayjs(moment().format()))
    fetchData()
  }

  const handleChangeDari = e => {
    setDari(e)
    setFilterDari(e.$d.toISOString())
  }

  const handleChangeSampai = e => {
    setSampai(e)
    setFilterSampai(e.$d.toISOString())
  }
  useEffect(() => {
    ;(async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      try {
        setIsLoading(true)

        const response = await axios.get(
          `${configs.API_URL}/users?${filterBy}=${filter}&page=${page + 1}&pageSize=${pageSize}`,
          {
            params: {
              jenis_pengurus: `${pengurus}`,
              provinsi: `${provinsi}`,
              kota: `${kota}`,
              kecamatan: `${kecamatan}`,
              kelurahan: `${kelurahan}`,
              dari: `${filterDari}`,
              sampai: `${filterSampai}`
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedToken}`
            }
          }
        )
        console.log(response)
        setTableData(response.data.user.data)
        setRowCount(response.data.user.total)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()

    getProvinces()
  }, [page, pageSize, pengurus, provinsi, kota, kecamatan, kelurahan, filterDari, filterSampai, filterBy, filter])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' sx={{ mb: 4 }}>
          List User
        </Typography>
        <Card>
          <CardHeader />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: '100%' }} size='small'>
                  <InputLabel id='pengurus-select'>Jenis Pengurus</InputLabel>
                  <Select
                    fullWidth
                    value={pengurus}
                    id='filter_by_pengurus'
                    label='Select pengurus'
                    labelId='pengurus-select'
                    onChange={e => setPengurus(e.target.value)}
                    inputProps={{ placeholder: 'Select Pengurus' }}
                  >
                    <MenuItem value=''>Select Pengurus</MenuItem>
                    <MenuItem value='pusat'>Pusat</MenuItem>
                    <MenuItem value='wilayah'>Wilayah</MenuItem>
                    <MenuItem value='daerah'>Daerah</MenuItem>
                    <MenuItem value='cabang'>Cabang</MenuItem>
                    <MenuItem value='ranting'>Ranting</MenuItem>
                    <MenuItem value='anggota'>Anggota</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: '100%' }} size='small'>
                  <TextField
                    size='small'
                    fullWidth
                    value={filter}
                    labelId='filter'
                    placeholder='Filter'
                    onChange={e => setFilter(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: '100%' }} size='small'>
                  <InputLabel id='filter-select'>-- Filter Berdasarkan --</InputLabel>
                  <Select
                    fullWidth
                    value={filterBy}
                    label='Select filter'
                    labelId='filter-select'
                    onChange={e => setFilterBy(e.target.value)}
                    inputProps={{ placeholder: 'Select Filter' }}
                  >
                    <MenuItem value='all'>Default (all)</MenuItem>
                    <MenuItem value='nomor_anggota'>Nomor Anggota</MenuItem>
                    <MenuItem value='name'>Nama</MenuItem>
                    <MenuItem value='nik'>NIK</MenuItem>
                    <MenuItem value='no_hp'>No. Telp</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: '100%' }} size='small'>
                  <InputLabel>-- Filter Provinsi --</InputLabel>
                  <Select
                    fullWidth
                    value={provinsi}
                    label='Select filter'
                    labelId='filter-select'
                    onChange={e => [setProvinsi(e.target.value), getRegency(e.target.value)]}
                    inputProps={{ placeholder: 'Select Provinsi' }}
                  >
                    <MenuItem value=''>
                      <em>Pilih Provinsi</em>
                    </MenuItem>
                    {arrayProvinsi &&
                      arrayProvinsi.map(provinsi => (
                        <MenuItem value={provinsi.id} key={provinsi.id}>
                          {provinsi.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: '100%' }} size='small'>
                  <InputLabel>-- Filter Kota --</InputLabel>
                  <Select
                    fullWidth
                    value={kota}
                    disabled={provinsi ? '' : 'false'}
                    label='Select filter'
                    labelId='filter-select'
                    onChange={e => [setKota(e.target.value), getDistricts(e.target.value)]}
                    inputProps={{ placeholder: 'Select Kota' }}
                  >
                    <MenuItem value=''>
                      <em>Pilih Kabupaten / Kota</em>
                    </MenuItem>
                    {arrayKota &&
                      arrayKota.map(kota => (
                        <MenuItem value={kota.id} key={kota.id}>
                          {kota.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: '100%' }} size='small'>
                  <InputLabel>-- Filter Kecamatan --</InputLabel>
                  <Select
                    fullWidth
                    value={kecamatan}
                    disabled={kota ? '' : 'false'}
                    label='Select filter'
                    labelId='filter-select'
                    onChange={e => [setKecamatan(e.target.value), getVillages(e.target.value)]}
                    inputProps={{ placeholder: 'Select Kecamatan' }}
                  >
                    <MenuItem value=''>
                      <em>Pilih Kecamatan</em>
                    </MenuItem>
                    {arrayKecamatan &&
                      arrayKecamatan.map(kecamatan => (
                        <MenuItem value={kecamatan.id} key={kecamatan.id}>
                          {kecamatan.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: '100%' }} size='small'>
                  <InputLabel>-- Filter Kelurahan --</InputLabel>
                  <Select
                    fullWidth
                    value={kelurahan}
                    disabled={kecamatan ? '' : 'false'}
                    label='Select filter'
                    labelId='filter-select'
                    onChange={e => setKelurahan(e.target.value)}
                    inputProps={{ placeholder: 'Select Kelurahan' }}
                  >
                    <MenuItem value=''>
                      <em>Pilih Kelurahan</em>
                    </MenuItem>
                    {arrayKelurahan &&
                      arrayKelurahan.map(kelurahan => (
                        <MenuItem value={kelurahan.id} key={kelurahan.id}>
                          {kelurahan.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} sx={{ mr: 2, mt: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label='Dari'
                    value={dari}
                    onChange={handleChangeDari}
                    inputFormat='YYYY/MM/DD'
                    renderInput={params => <TextField size='small' {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={4} sx={{ mr: 2, mt: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label='Sampai'
                    value={sampai}
                    inputFormat='YYYY/MM/DD'
                    onChange={handleChangeSampai}
                    renderInput={params => <TextField size='small' {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item>
                <Button sx={{ mb: 2, mt: 3, mr: 2 }} size='large' variant='contained' onClick={handleFilter}>
                  <TuneIcon />
                </Button>
                <Button
                  sx={{ mb: 2, mt: 3 }}
                  color='error'
                  size='large'
                  variant='contained'
                  onClick={handleResetFilter}
                >
                  <RestartAltIcon />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <DataGrid
            autoHeight
            style={{
              display: 'flex',
              flexDirection: 'column-reverse'
            }}
            rows={tableData}
            columns={columns}
            checkboxSelection
            rowCount={rowCount}
            page={page}
            pageSize={pageSize}
            paginationMode='server'
            onPageChange={newPage => handlePage(newPage)}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => handlePageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}
