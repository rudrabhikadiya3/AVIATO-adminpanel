import {React, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'pname', headerName: 'Product name', width: 180 },
    { field: 'bname', headerName: 'Brand name', width: 180 },
    {field: 'sprice',headerName: 'Selling price',type: 'number',width: 120,},
    {field: 'mrp',headerName: 'MRP',type: 'number',width: 120,},
    {field: 'stock',headerName: 'stock',type: 'number',width: 70,},
    { field: 'kwords', headerName: 'keywords', width: 250,},
    {
      field: "manage",
      headerName: "Manage",
      width: 100,
      renderCell: (params) => (
        <>
        <IconButton aria-label="delete">
          <DeleteIcon/>
        </IconButton>

        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        </>
      ),
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Product
      </Button>

      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>List a product</DialogTitle>
        <DialogContent>
          <DialogContentText color={'primary'}>
            To list a product in AVIATO, Please ender below details here. Please enter details properly.
          </DialogContentText>
          <TextField
            margin="dense"
            name="pname"
            label="Product Name"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="bname"
            label="Brand Name"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="mrp"
            label="MRP"
            type="email"
            fullWidth
            variant="standard"
          />
         <TextField
            margin="dense"
            name='sprice'
            label="Selling Price"
            type="email"
            fullWidth
            variant="standard"
          />
         <TextField
            margin="dense"
            name='stock'
            label="Stoke"
            type="email"
            fullWidth
            variant="standard"
          />
          
         <TextField
            margin="dense"
            name='kwords'
            label="Key Words"
            type="email"
            fullWidth
            variant="standard"
          />
          <DialogContentText fontSize={11}>
           Please enter keyword that customer find easily your product <br />
                1. Do not use coma(,) in keyword, Just keep writing. <br />
                2. Enter only product related keywords <br />
                3. Do not use dummy keywords
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
