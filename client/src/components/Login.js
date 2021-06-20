import {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { API, setAuthToken } from "../config/api";
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { isRegister } from '../actions'
import { useDispatch, useSelector } from "react-redux";

import TextField from "./form/TextField"

function LoginForm(props) {
  const router = useHistory();
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Password is required')
    .min(8, 'Too Short!')
 });

  const handleLogin = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        email,
        password,
      });

      const response = await API.post("/login", body, config);

      const { role, token } = response.data.data.user

      setAuthToken(token);

      if(role == 'partner'){
        router.push('/partner');
      }else{
        if(props.from == 'products'){
          router.push(props.url);
        }else{
          router.push('/');
        }
      }

      console.log(response);
    } catch (error) {
      setError(error?.response?.data.message)
    }
  };

  return (
    <div className={error && 'pt-5'}>
    {error && (
      <div className="bg-danger position-absolute foodways-alert text-light" role="alert">
        <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
      </div>
    )}
    <div className="ml-3 text-center">
      <h2 className="text-warning">Login</h2>
    </div>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SigninSchema}
      onSubmit={(values) => {
        setForm(values)
        handleLogin()
      }}
    >
      {({values}) => (
        <div className="mt-4">
          <Form className="ml-3">
          {console.log(values)}
            <TextField type="email" name="email" placeholder="Your E-Mail" />
            <TextField type="password" name="password" placeholder="Password" />
            <div className="mt-3">
              <button className="btn btn-warning btn-block text-light" type="submit">Login</button>
            </div>
            <div className="text-muted mt-2 text-center">
              Don't have an account? Klik
              <span
              className="text-dark font-weight-500"
              role="button"
              onClick={() => dispatch(isRegister())}> Here</span>
            </div>
          </Form>
        </div>
      )}
    </Formik>
    </div>
  );
}

export default LoginForm
