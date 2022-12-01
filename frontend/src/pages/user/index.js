import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import axios from 'axios'

import authConfig from 'src/configs/auth'
import configs from 'src/configs/configs'
import TableHeader from 'src/views/apps/user/list/TableHeader'


const RowOptions = ({ id }) => {

    async function deleteData(id) {
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
        try {
          const response = await axios({
              method: "delete",
              url: `${configs.API_URL}/users/${id}`,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedToken}`
              },
          });
          console.log(response)
          } catch(error) {
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
            href='#'
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
        minWidth: 150,
        field: 'name',
        headerName: 'Nama Lengkap',
        renderCell: ({ row }) => {
            return (
            <Typography  variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
                {row.name}
            </Typography>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 150,
        field: 'email',
        headerName: 'Email',
        renderCell: ({ row }) => {
          return (
            <Typography noWrap variant='body2'>
              {row.email}
            </Typography>
          )
        }
    },
    {
    flex: 0.2,
    minWidth: 150,
    field: 'jabatan',
    headerName: 'Jabatan',
    renderCell: ({ row }) => {
        return (
        <Typography noWrap variant='body2' sx={{ textTransform: 'capitalize' }}>
            {row.jabatan}
        </Typography>
        )
    }
    },
    {
    flex: 0.2,
    minWidth: 150,
    field: 'jenis_pengurus',
    headerName: 'Jenis Pengurus',
    renderCell: ({ row }) => {
        return (
        <Typography noWrap variant='body2' sx={{ textTransform: 'capitalize' }}>
            {row.jenis_pengurus}
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
  ];
  
export default function Index() {
const [pageSize, setPageSize] = useState(10)
const [tableData, setTableData] = useState([])
const [value, setValue] = useState('')

const handleFilter = useCallback(val => {
    setValue(val)
  }, [])


async function fetchData() {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    try {
      const response = await axios({
          method: "get",
          url: `${configs.API_URL}/users`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`
          },
      });
      setTableData(response.data.user)
      } catch(error) {
      console.log(error)
      }
  }

useEffect(() => {
    fetchData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter}  />
          <DataGrid
            autoHeight
            rows={tableData}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

    </Grid>
  )
}
