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
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';

import { red } from '@mui/material/colors';

const color = red[500];


export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // form validation scema
  let schema = yup.object().shape({
    pname: yup.string().required('Please enter product name'),
    bname: yup.string().required('Please enter brand name'),
    mrp: yup.number('please enter valid mrp').required('Please enter mrp').positive("value can't in negative").integer('please enter valid mrp'),
    sprice: yup.number('please enter valid selling price').required('Please enter selling price').positive("value can't in negative").integer('please enter valid selling price'),
    stock: yup.number('please enter valid stock').required('Please enter stock').positive("stock can't in negative").integer('please enter valid stock'),
    kwords: yup.string().required('Please enter keywords'),
  });

  const formik = useFormik({
    initialValues: {
      pname: '',
      bname: '',
      sprice: '',
      mrp: '',
      stock: '',
      kwords: '',
    },
    validationSchema : schema,
    onSubmit: values => {
      handleClose();
      alert(JSON.stringify(values, null, 2));
    },
  });
  const {handleBlur, handleChange, handleSubmit, errors, touched, values} = formik
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
        <Formik values={formik}>
            <Form onSubmit={handleSubmit}>
            <DialogContent>
          <DialogContentText color={'primary'}>
            To list a product in AVIATO, Please ender below details here. Please enter details properly.
          </DialogContentText>
          <TextField
            margin="dense"
            name="pname"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pname}
          />
          {touched.pname && errors.pname ? <span className="form-error">{errors.pname}</span> : null}
          <TextField
            margin="dense"
            name="bname"
            label="Brand Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.banme}
          />
          {touched.bname && errors.bname ? <span className="form-error">{errors.bname}</span> : null}
          <TextField
            margin="dense"
            name="mrp"
            label="MRP"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.mrp}
          />
          {touched.mrp && errors.mrp ? <span className="form-error">{errors.mrp}</span> : null}
         <TextField
            margin="dense"
            name='sprice'
            label="Selling Price"
            type="etxt"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.sprice}
          />
          {touched.sprice && errors.sprice ? <span className="form-error">{errors.sprice}</span> : null}
         <TextField
            margin="dense"
            name='stock'
            label="Stoke"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.stock}
          />
          {touched.stock && errors.stock ? <span className="form-error">{errors.stock}</span> : null}
         <TextField
            margin="dense"
            name='kwords'
            label="Key Words"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.kwords}
          />
          {touched.kwords && errors.kwords ? <span className="form-error">{errors.kwords}</span> : null}
          <DialogContentText fontSize={11}>
           Please enter keyword that customer find easily your product <br />
                1. Do not use coma(,) in keyword, Just keep writing. <br />
                2. Enter only product related keywords <br />
                3. Do not use dummy keywords
          </DialogContentText>

        </DialogContent>
<DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
            </Form>
        </Formik>
        
      </Dialog>
    </>
  );
}
