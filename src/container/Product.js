import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import {
  ButtonGroup,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as yup from "yup";
import { Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductsAction,
  deleteProductAction,
  editProductAction,
  readProductsAction,
} from "../redux/actions/products.action";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [dopen, setDOpen] = useState(false);
  const [alert, setAlert] = useState(0);
  const [edit, setEdit] = useState(false);
  const [filterData, setFilterData] = useState([]);


  const handleClickOpen = () => {
    setOpen(true);
    setEdit(false);
  };

  const handleClose = () => {
    setOpen(false);
    setDOpen(false);
    formik.resetForm();
  };
  const handleDClickOpen = () => {
    setDOpen(true);
  };

  const dispatch = useDispatch();
  // form validation schema
  let schema = yup.object().shape({
    pname: yup.string().required("Please enter product name"),
    brand: yup.string().required("Please enter brand name"),
    mrp: yup
      .number("please enter valid mrp")
      .required("Please enter mrp")
      .positive("value can't in negative")
      .integer("please enter valid mrp"),
    sprice: yup
      .number("please enter valid selling price")
      .required("Please enter selling price")
      .positive("value can't in negative")
      .integer("please enter valid selling price"),
    stock: yup
      .number("please enter valid stock")
      .required("Please enter stock")
      .positive("stock can't in negative")
      .integer("please enter valid stock"),
    kwords: yup.string().required("Please enter keywords"),
    catagory: yup.string().required("Please select catagory"),
  });

  const formik = useFormik({
    initialValues: {
      pname: "",
      brand: "",
      sprice: "",
      mrp: "",
      stock: "",
      kwords: "",
      catagory: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      handleClose();
      formik.resetForm();
      if (edit) {
        dispatch(editProductAction(values));
      } else {
        dispatch(addProductsAction(values));
      }
    },
  });
  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    formik;

  const columns = [
    { field: "pname", headerName: "Product name", width: 180 },
    { field: "brand", headerName: "Brand name", width: 150 },
    { field: "catagory", headerName: "Catagoty", width: 130 },
    {
      field: "sprice",
      headerName: "Selling price",
      type: "number",
      width: 120,
    },
    { field: "mrp", headerName: "MRP", type: "number", width: 120 },
    { field: "stock", headerName: "stock", type: "number", width: 70 },
    { field: "kwords", headerName: "keywords", width: 250 },
    {
      field: "manage",
      headerName: "Manage",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="delet"
            onClick={() => {
              handleDClickOpen();
              setAlert(params.id);
            }}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton aria-label="edit" onClick={() => editFormOpen(params)}>
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelet = () => {
    dispatch(deleteProductAction(alert));
    setDOpen(false);
  };
  const editFormOpen = (params) => {
    setOpen(true);
    formik.setValues(params.row);
    setEdit(true);
  };
  const products = useSelector((state) => state.products.products);

  const handleCatagory = (cat) =>{
    const catFilterData = products.filter(ap => ap.catagory === cat)
    setFilterData(catFilterData)
    console.log(catFilterData);
  }
  const showData = filterData.length === 0 ? products : filterData
  useEffect(() => {
    dispatch(readProductsAction());
  },[]);

  return (
    <>
      <ButtonGroup margin="dense"
        variant="contained"
        aria-label="outlined primary button group"
        color="info"
        orientation="horizontal"
      >
        <Button onClick={()=>handleCatagory('all')}>All</Button>
        <Button onClick={()=>handleCatagory('fashion')}>Fashion</Button>
        <Button onClick={()=>handleCatagory('electronics')}>Electronics</Button>
        <Button onClick={()=>handleCatagory('grocery')}>Grocery</Button>
      </ButtonGroup>
      <br />
      <Button variant="contained" onClick={handleClickOpen} >
        Add Product
      </Button>

      <div style={{ height: 1000, width: "100%" }}>
        <DataGrid
          Value="Center"
          rows={showData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
      {/* ----- form dialogue ----- */}
      <Dialog open={open} onClose={handleClose}>
        {edit ? (
          <DialogTitle>Edit listed products</DialogTitle>
        ) : (
          <DialogTitle>List a new product</DialogTitle>
        )}

        <Formik values={formik}>
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              {edit ? null : (
                <DialogContentText color={"primary"}>
                  To list a product in AVIATO, Please ender below details here.
                  Please enter details properly.
                </DialogContentText>
              )}
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
              {touched.pname && errors.pname ? (
                <span className="form-error">{errors.pname}</span>
              ) : null}
              <TextField
                margin="dense"
                name="brand"
                label="Brand Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.brand}
              />
              {touched.brand && errors.brand ? (
                <span className="form-error">{errors.brand}</span>
              ) : null}

              <FormControl variant="standard" fullWidth margin="dense">
                <InputLabel id="demo-simple-select-standard-label">
                  Catagory
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={handleChange}
                  label="Catagory"
                  fullWidth
                  name="catagory"
                  value={values.catagory}
                >
                  <MenuItem value={"fashion"}>
                    Fashion
                  </MenuItem>
                  <MenuItem value={"electronics"}>Electronics</MenuItem>
                  <MenuItem value={"grocery"}>Grocery</MenuItem>
                </Select>
              </FormControl>
              {touched.catagory && errors.catagory ? (
                <span className="form-error">{errors.catagory}</span>
              ) : null}
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
              {touched.mrp && errors.mrp ? (
                <span className="form-error">{errors.mrp}</span>
              ) : null}
              <TextField
                margin="dense"
                name="sprice"
                label="Selling Price"
                type="etxt"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sprice}
              />
              {touched.sprice && errors.sprice ? (
                <span className="form-error">{errors.sprice}</span>
              ) : null}
              <TextField
                margin="dense"
                name="stock"
                label="Stoke"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.stock}
              />
              {touched.stock && errors.stock ? (
                <span className="form-error">{errors.stock}</span>
              ) : null}
              <TextField
                margin="dense"
                name="kwords"
                label="Key Words"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.kwords}
              />
              {touched.kwords && errors.kwords ? (
                <span className="form-error">{errors.kwords}</span>
              ) : null}
              <DialogContentText fontSize={11}>
                Please enter keyword that customer find easily your product{" "}
                <br />
                1. Do not use coma(,) in keyword, Just keep writing. <br />
                2. Enter only product related keywords <br />
                3. Do not use dummy keywords
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {edit ? (
                <Button type="submit">change</Button>
              ) : (
                <Button type="submit">submit</Button>
              )}
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>

      {/* ----- delet dialogue ----- */}
      <Dialog
        open={dopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to delet?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This product will also be delist from AVIATO after deletion
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={() => handleDelet()} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
