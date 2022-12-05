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
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
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
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
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
          {row.provinsi}
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
          {row.kota}
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
          {row.kecamatan}
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
          {row.kelurahan}
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
  const [pageSize, setPageSize] = useState(10)
  const [tableData, setTableData] = useState([])
  const [pengurus, setPengurus] = useState('')
  const [filter, setFilter] = useState('')
  const [filterBy, setFilterBy] = useState('all')
  const [provinsi, setProvinsi] = useState('')
  const [kota, setKota] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [kelurahan, setKelurahan] = useState('')
  const [dari, setDari] = useState(dayjs(moment().format()))
  const [sampai, setSampai] = useState(dayjs(moment().format()))
  const [filterDari, setFilterDari] = useState('')
  const [filterSampai, setFilterSampai] = useState('')

  async function fetchData() {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    try {
      const response = await axios({
        method: 'get',
        url: `${configs.API_URL}/users?jenis_pengurus=${pengurus}&${filterBy}=${filter}&provinsi=${provinsi}&kota=${kota}&kecamatan=${kecamatan}&kelurahan=${kelurahan}&dari=${filterDari}&sampai=${filterSampai}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`
        }
      })
      setTableData(response.data.user)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFilter = () => {
    fetchData()
  }

  const handleResetFilter = () => {
    setPengurus('')
    setFilter('')
    setFilterBy('')
    setProvinsi('')
    setKota('')
    setKecamatan('')
    setKelurahan('')
    setFilterDari('')
    setFilterSampai('')
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
    fetchData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader />
          <CardContent>
            <Grid container spacing={1}>
              <Grid>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: 350 }} size='small'>
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
              <Grid>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: 350 }} size='small'>
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
              <Grid>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: 350 }} size='small'>
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
              <Grid>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: 260 }} size='small'>
                  <InputLabel>-- Filter Provinsi --</InputLabel>
                  <Select
                    fullWidth
                    value={provinsi}
                    label='Select filter'
                    labelId='filter-select'
                    onChange={e => setProvinsi(e.target.value)}
                    inputProps={{ placeholder: 'Select Provinsi' }}
                  >
                    <MenuItem value=''>
                      <em>Pilih Provinsi</em>
                    </MenuItem>
                    <MenuItem value={32}>Jawa Barat</MenuItem>
                    <MenuItem value={33}>Jawa Tengah</MenuItem>
                    <MenuItem value={34}>Jawa Timur</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: 260 }} size='small'>
                  <InputLabel>-- Filter Kota --</InputLabel>
                  <Select
                    fullWidth
                    value={kota}
                    disabled={provinsi ? '' : 'false'}
                    label='Select filter'
                    labelId='filter-select'
                    onChange={e => setKota(e.target.value)}
                    inputProps={{ placeholder: 'Select Provinsi' }}
                  >
                    <MenuItem value=''>
                      <em>Pilih Kabupaten / Kota</em>
                    </MenuItem>
                    <MenuItem value={3210}>Majalengka</MenuItem>
                    <MenuItem value={3217}>Bandung</MenuItem>
                    <MenuItem value={3216}>Tasikmalaya</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: 260 }} size='small'>
                  <InputLabel>-- Filter Kecamatan --</InputLabel>
                  <Select
                    fullWidth
                    value={kecamatan}
                    disabled={kota ? '' : 'false'}
                    label='Select filter'
                    labelId='filter-select'
                    onChange={e => setKecamatan(e.target.value)}
                    inputProps={{ placeholder: 'Select Provinsi' }}
                  >
                    <MenuItem value=''>
                      <em>Pilih Kecamatan</em>
                    </MenuItem>
                    <MenuItem value={3210030}>Cikijng</MenuItem>
                    <MenuItem value={3210031}>Talaga</MenuItem>
                    <MenuItem value={3210040}>Majalengka Kulon</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl sx={{ mr: 2, mt: 4, minWidth: 260 }} size='small'>
                  <InputLabel>-- Filter Kelurahan --</InputLabel>
                  <Select
                    fullWidth
                    value={kelurahan}
                    disabled={kecamatan ? '' : 'false'}
                    label='Select filter'
                    labelId='filter-select'
                    onChange={e => setKelurahan(e.target.value)}
                    inputProps={{ placeholder: 'Select Provinsi' }}
                  >
                    <MenuItem value=''>
                      <em>Pilih Kelurahan</em>
                    </MenuItem>
                    <MenuItem value={3210030016}>Cikijing</MenuItem>
                    <MenuItem value={3210030017}>Kasturi</MenuItem>
                    <MenuItem value={3210030018}>Cidulang</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{ mr: 2, mt: 4 }}>
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
              <Grid sx={{ mr: 2, mt: 4 }}>
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
              <Grid item sm={4} xs={12}>
                <Button sx={{ mb: 2, mt: 3, mr: 2 }} size='large' variant='contained' onClick={handleFilter}>
                  Filter
                </Button>
                <Button sx={{ mb: 2, mt: 3 }} size='large' variant='contained' onClick={handleResetFilter}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <DataGrid
            autoHeight
            rows={tableData}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}
