import React, { useState } from 'react';
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { API, setAuthToken } from '../config/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { isLogin } from '../actions'
import { useDispatch, useSelector } from "react-redux";

import TextField from "./form/TextField"
import SelectField from "./form/SelectField"
import SlideShow from './SlideShow'

const Register = () => {
  const router = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    confirmPassword: ''
  })
  const {fullname, email, password, gender, phone} = user;

  const SignupSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    gender: Yup.string()
      .required('Required'),
    phone: Yup.string()
      .required('Required')
      .min(8, 'Too Short!')
      .max(14, 'Too Long!'),
    password: Yup.string().required('Password is required')
    .min(8, 'Too Short!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
 });

  const addUser = useMutation(async () => {
    try{
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        fullname,
        email,
        password,
        gender,
        phone,
      });

      const response = await API.post("/register", body, config);
    } catch (err) {
      setError(err.response.data.message)
    }
  });

  const handleRegister = (user) => {
    setUser(user)
    addUser.mutate();
  }

  return (
    <div className={error && 'pt-5'}>
      {error && (
        <div className="bg-danger position-absolute foodways-alert text-light" role="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
        </div>
      )}
      <div className="ml-3 text-center">
        <h2 className="text-warning">Register</h2>
      </div>
      <Formik
        initialValues={{
          fullname: '',
          email: '',
          gender: '',
          phone: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleRegister(values)}
      >
        {({values}) => (
          <div className="mt-4">
            <Form className="ml-3">
            {console.log(values)}
              <div className="d-flex">
                <div className="flex-fill mr-1">
                  <TextField type="text" name="fullname" placeholder="Full Name" />
                  <SelectField name="gender" />
                  <TextField type="password" name="password" placeholder="Password" />
                </div>
                <div className="flex-fill ml-1">
                  <TextField type="email" name="email" placeholder="Your E-Mail" />
                  <TextField type="text" name="phone" placeholder="Phone Number" />
                  <TextField type="password" name="confirmPassword" placeholder="Confirm Password" />
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-warning btn-block text-light" type="submit">Register</button>
              </div>
              <div className="text-muted mt-2 text-center">
                Already have an account? Klik
                <span
                className="text-dark font-weight-500"
                role="button"
                onClick={() => dispatch(isLogin())}> Here</span>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Register
