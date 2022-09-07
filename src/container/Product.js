import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
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
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(0);
  const [edit, setEdit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setEdit(false);
  };

  const handleClose = () => {
    setOpen(false);
    setDOpen(false);
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
  });

  const formik = useFormik({
    initialValues: {
      pname: "",
      brand: "",
      sprice: "",
      mrp: "",
      stock: "",
      kwords: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleClose();
      formik.resetForm();
      if (edit) {
        dispatch(editProductAction(values));
      } else {
        dispatch(addProductsAction(values));
      }
      loadData();
    },
  });
  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    formik;

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "pname", headerName: "Product name", width: 180 },
    { field: "brand", headerName: "Brand name", width: 150 },
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
    console.log(params.row);
    setEdit(true);
  };

  const loadData = () => {
    let localData = JSON.parse(localStorage.getItem("product"));
    if (localData !== null) {
      setData(localData);
    }
  };

  useEffect(() => {
    dispatch(readProductsAction());
    loadData();
  }, []);

  const product = useSelector((state) => state.products);
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Product
      </Button>

      <div style={{ height: 1000, width: "100%" }}>
        <DataGrid
          Value="Center"
          rows={product.products}
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
