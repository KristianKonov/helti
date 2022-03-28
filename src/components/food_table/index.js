import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Витамин А', 159, 6.0, 24, 4.0),
  createData('Витамин Б', 237, 9.0, 37, 4.3),
  createData('Минерал Девин', 262, 16.0, 24, 6.0),
  createData('Минерал Банкя', 305, 3.7, 67, 4.3),
  createData('Минерал Горна Баня', 356, 16.0, 49, 3.9),
];

const FoodTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 150, maxWidth: 1000}} fullwidth aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Витамини и минерали (100g serving)</TableCell>
            <TableCell align="right">Количество</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FoodTable