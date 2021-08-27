import React, { Component } from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEditUsers } from "../actions/userActions";
import { TextField, Button } from "@material-ui/core";
import FormAutocompleteSelect from "./FormAutocompleteSelect";
import { Field } from "redux-form";
import SnackBar from "./SnackBar";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

class AddEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id:
          this.props.location.state && this.props.location.state.user
            ? this.props.location.state.user.id
            : "",
        nama:
          this.props.location.state && this.props.location.state.user
            ? this.props.location.state.user.nama
            : "",
        kontak:
          this.props.location.state && this.props.location.state.user
            ? this.props.location.state.user.kontak
            : "",
        posisi:
          this.props.location.state && this.props.location.state.user
            ? this.props.location.state.user.posisi
            : "",
        provinsi:
          this.props.location.state && this.props.location.state.user
            ? this.props.location.state.user.provinsi
            : "",
        kecamatan:
          this.props.location.state && this.props.location.state.user
            ? this.props.location.state.user.kecamatan
            : "",
        kota:
          this.props.location.state && this.props.location.state.user
            ? this.props.location.state.user.kota
            : "",
        alamat:
          this.props.location.state && this.props.location.state.user
            ? this.props.location.state.user.alamat
            : "",
        edit:
          this.props.location.state && this.props.location.state.user
            ? this.props.location.state.edit
            : false,
      },
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  }

  render() {
    return (
      <Route
        render={({ history }) => (
          <div>
            <Formik
              initialValues={this.state.user}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  // actions.handleReset();
                  history.push("/");

                  this.props.addNewUser([values]);
                }, 100);
              }}
              validationSchema={Yup.object().shape({
                id: Yup.number().required("ID field is required"),
                nama: Yup.string().required("Nama field is required"),
                kontak: Yup.string()
                  .required("Kontak field is required")
                  .max(13)
                  .min(11),
                posisi: Yup.string().required("Posisi field is required"),
                provinsi: Yup.string().required("Provinsi field is required"),
                kecamatan: Yup.string().required("Kecamatan field is required"),
                kota: Yup.string().required("Kota field is required"),
                alamat: Yup.string().required("Alamat field is required"),
              })}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;
                return (
                  <form
                    onSubmit={handleSubmit}
                    style={{ width: "75%", margin: "auto" }}
                  >
                    <TextField
                      id="standard-id"
                      type="text"
                      name="id"
                      label="ID Karyawan" // Label acts like placeholder
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.id}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      required
                    />
                    {errors.id && touched.id && (
                      <div
                        style={{
                          textAlign: "start",
                          marginTop: "2px",
                          color: "red",
                        }}
                      >
                        {errors.id}
                      </div>
                    )}

                    <TextField
                      id="standard-nama"
                      type="text"
                      name="nama"
                      label="Nama Lengkap" // Label acts like placeholder
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nama}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      required
                    />
                    {errors.nama && touched.nama && (
                      <div
                        style={{
                          textAlign: "start",
                          marginTop: "2px",
                          color: "red",
                        }}
                      >
                        {errors.nama}
                      </div>
                    )}

                    <TextField
                      id="standard-kontak"
                      type="kontak"
                      name="kontak"
                      label="Kontak Pribadi" // Label acts like placeholder
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.kontak}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      required
                    />
                    {errors.kontak && touched.kontak && (
                      <div
                        style={{
                          textAlign: "start",
                          marginTop: "2px",
                          color: "red",
                        }}
                      >
                        {errors.kontak}
                      </div>
                    )}

                    <TextField
                      id="standard-posisi"
                      type="text"
                      name="posisi"
                      label="Posisi Pekerjaan" // Label acts like placeholder
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.posisi}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      required
                    />
                    {errors.posisi && touched.posisi && (
                      <div
                        style={{
                          textAlign: "start",
                          marginTop: "2px",
                          color: "red",
                        }}
                      >
                        {errors.posisi}
                      </div>
                    )}

                    <TextField
                      id="standard-provinsi"
                      type="text"
                      name="provinsi"
                      label="Provinsi" // Label acts like placeholder
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.provinsi}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    {errors.provinsi && touched.provinsi && (
                      <div
                        style={{
                          textAlign: "start",
                          marginTop: "2px",
                          color: "red",
                        }}
                      >
                        {errors.provinsi}
                      </div>
                    )}

                    <TextField
                      id="standard-kecamatan"
                      type="text"
                      name="kecamatan"
                      label="Kecamatan" // Label acts like placeholder
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.kecamatan}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    {errors.kecamatan && touched.kecamatan && (
                      <div
                        style={{
                          textAlign: "start",
                          marginTop: "2px",
                          color: "red",
                        }}
                      >
                        {errors.kecamatan}
                      </div>
                    )}

                    <TextField
                      id="standard-kota"
                      type="text"
                      name="kota"
                      label="Kota" // Label acts like placeholder
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.website}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    {errors.kota && touched.kota && (
                      <div
                        style={{
                          textAlign: "start",
                          marginTop: "2px",
                          color: "red",
                        }}
                      >
                        {errors.kota}
                      </div>
                    )}

                    <TextField
                      id="standard-alamat"
                      type="text"
                      name="alamat"
                      label="alamat" // Label acts like placeholder
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.alamat}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    {errors.alamat && touched.alamat && (
                      <div
                        style={{
                          textAlign: "start",
                          marginTop: "2px",
                          color: "red",
                        }}
                      >
                        {errors.alamat}
                      </div>
                    )}

                    <Button
                      disabled={!dirty && !isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ margin: "1em", float: "right" }}
                    >
                      {this.state.user.edit ? "Update User" : "Add User"}
                    </Button>
                  </form>
                );
              }}
            </Formik>
            <SnackBar
              open={this.state.open}
              handleClose={this.handleClose}
              variant="success"
              message="User Created Successfully"
            />
          </div>
        )}
      />
    );
  }
}

AddEditUser.propTypes = {
  addNewUser: PropTypes.func,
  snackBarMessage: PropTypes.string,
  snackBarVariant: PropTypes.string,
};

const mapStateToProps = (state) => ({
  snackBarMessage: state.utils.message,
  snackBarVariant: state.utils.variant,
});

export default connect(mapStateToProps, { addNewUser: addEditUsers })(
  AddEditUser
);
