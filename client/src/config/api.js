import {useQuery, useMutation } from 'react-query';
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const UpdateProduct = async (obj) => {
	const {data} = await axios.patch(`http://localhost:5000/api/v1/product/${obj.id}`, obj.body)
	return data
}

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};