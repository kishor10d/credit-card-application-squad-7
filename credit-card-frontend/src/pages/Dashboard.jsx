import React, { useEffect, useState } from 'react';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TablePagination, TableRow , TableSortLabel
} from '@mui/material';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Home from './Home';
import { getUserData } from '../services/dashboardService';
import ApplicantForm from './ApplicantForm';

function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading]= useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const sortedRows = [...data].sort(getComparator(order, orderBy));
  const [open, setOpen] = React.useState(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  //fetch data
  const fetchData = async () => {
     setLoading(true);
      try {
        const response = await getUserData();
        setData(response);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Initial load
    useEffect(() => {
      fetchData();
    }, []);


  // for table sorting  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // for view detail dialog 
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedId(id)
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h3>Credit Card Applications</h3>
      <br />

      {loading && ('Loading Data...' )}

      {!loading && (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table ">
            <TableHead>
              <TableRow>
                <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'phone'}
                  direction={orderBy === 'phone' ? order : 'asc'}
                  onClick={() => handleRequestSort('phone')}
                >
                  Phone
                </TableSortLabel>
                </TableCell>

                <TableCell>
              
                  Action
            
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                <TableRow key={row.id} hover sx={{ '&:hover': { backgroundColor: '#e9ecef !important' } }}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell> <button className='btn btn-primary' variant="outlined" onClick={() => handleClickOpen(row.id)}>View </button> </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )}   

    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open} >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        View Details
      </DialogTitle>
    
      <DialogContent dividers>

        <ApplicantForm role={user.role} />

      </DialogContent>
      
      <DialogActions>
         <button className='btn btn-primary' variant="outlined" onClick={handleClose}> Save changes </button> 
        <Button className='btn btn-default' onClick={handleClose}>
          Cancel 
        </Button>
      </DialogActions>
    </BootstrapDialog>
    </>
    
  );
}

export default Dashboard