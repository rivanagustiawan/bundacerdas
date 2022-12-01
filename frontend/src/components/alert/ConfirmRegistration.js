import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'

const ConfirmRegisData = ({ inputData }) => {
  return (
    <TableContainer component={Paper}>
      <Typography align='center' variant='subtitle1' mb={1}>
        <strong>Apakah anda yakin telah mengisi semua data dengan benar dan sesuai?</strong>
      </Typography>
      <Table sx={{ minWidth: 10 }} aria-label='simple table'>
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          {inputData.map(row => (
            <TableRow key={row.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row' style={{ fontSize: '1rem', width: '25%' }}>
                {row.key}
              </TableCell>
              <TableCell align='left' style={{ fontSize: '1rem' }}>{`: ${row.value}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ConfirmRegisData
