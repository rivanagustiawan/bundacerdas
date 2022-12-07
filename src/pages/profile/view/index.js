import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import axios from 'axios'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import { styled, useTheme } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'

import authConfig from 'src/configs/auth'
import configs from 'src/configs/configs'

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

function View({ id }) {
  const [dataUser, setDataUser] = useState([])

  async function getData() {
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

      // console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant='h6'>Detail User</Typography>
            <Divider />
            <TableContainer sx={{ width: 'auto', display: 'table', tableLayout: 'fixed' }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Nama</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.name}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>NIK</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.nik}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Jabatan</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.jabatan}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Tempat Lahir</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.tempat_lahir}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Tanggal Lahir</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.tanggal_lahir}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Pendidikan Terakhir</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.pendidikan_terakhir}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Email</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.email}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>No. Telp</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.no_hp}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Provinsi</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.provinsi}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Kota / Kabupaten</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.kota}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Kecamatan</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.kecamatan}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Kelurahan</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.kelurahan}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Alamat Lengkap</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.alamat_lengkap}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Anak Yang Masih Sekolah</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>
                        : {dataUser.memiliki_anak_sekolah == '1' ? 'Ya' : 'Tidak'}
                      </Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Jenis Handphone</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.jenis_hp}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Type Handphone</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.type_hp}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Dompet Digital Yang Digunakan</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='inherit'>: {dataUser.dompet_digital}</Typography>
                    </MUITableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} href={`/profile/edit`}>
              Edit
            </Button>
            <Button color='error' variant='outlined' href='#'>
              Kembali
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

View.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default View
