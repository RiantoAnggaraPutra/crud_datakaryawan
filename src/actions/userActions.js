import { FETCH_USERS, ADD_USER, EDIT_USER, DELETE_USER, UPDATE_USER } from "./types";
import axios from 'axios';


export const fetchUsers = () => (dispatch) => {
  
  fetch("https://reqaid.com/api/FakePosts")
    .then((res) => res.json())
    .then((users) => {
      users = users.map((user) => {
        const { id, nama, kontak, posisi, provinsi, kecamatan, kota, alamat } =
          user;
        return {
          id,
          nama,
          kontak,
          posisi,
          provinsi,
          kecamatan,
          kota,
          alamat
        };
      });
      console.log(users);
      dispatch({
        type: FETCH_USERS,
        payload: users,
      });
    })
    .catch((err) => console.log(err));
};

export const addEditUsers = (userData) => (dispatch) => {
  if (!userData[0].edit) {
  axios.post("https://reqaid.com/api/FakePosts", userData)
    .then(response =>{
      dispatch({
        type: ADD_USER,
        payload:userData
      })
    })
  } else {
    axios.put("https://reqaid.com/api/FakePosts",userData)
    .then(response =>{
      dispatch({
        type: EDIT_USER,
        payload:userData
      })
    })
  }
};

export function updateuser(userData) {
  return dispatch => {
   axios.put("https://reqaid.com/api/FakePosts/${userData.id}", userData)
    .then(response =>{
      dispatch({
        type: UPDATE_USER,
        payload:response.data
      })
    })
  }
};

export const removeUsers = (usersNameArr) => (dispatch) => {
  
  dispatch({
    type: DELETE_USER,
    payload: usersNameArr,
  });
};
