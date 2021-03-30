import {useContext, useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../context/userContext';
import { API, setAuthToken } from "../config/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faUtensils } from '@fortawesome/free-solid-svg-icons'

function LoginForm(props) {
  const router = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [newerror, setError] = useState('');

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loginHandler = async (e) => {
    e.preventDefault();

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

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      });

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
    <>

    {(props.from == 'products')? (
       <Button variant="warning" onClick={handleShow} className="btn btn-block">
       <FontAwesomeIcon icon={faCartPlus} /> Order</Button>
    ) : (
      <Button variant="dark" onClick={handleShow} className="btn-sm">Login</Button>
    )}

    <Modal show={show} onHide={handleClose} className="foodways-modal" backdrop="static" centered>

      <Modal.Body className="px-4">
        <div>
          <h2 className="text-warning">Login</h2>
        </div>
        {newerror && 
          <div class="alert alert-danger" role="alert">
          {newerror}
          </div>
        }
        <div className="mt-4">
          <Form onSubmit={loginHandler}>

            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" name="email" value={email} onInput={e => onChange(e)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" name="password" value={password} onInput={e => onChange(e)} />
            </Form.Group>

            <div className="mt-4 text-center">
              <Button variant="dark" type="submit" className="btn-block">
                Login
              </Button>
              <Button variant="white" className="btn-block btn-outline-warning" onClick={handleClose}>
                Close
              </Button>

              <Form.Text className="text-muted mt-2">
                Don't have an account? Klik <a href="" className="text-dark font-weight-500">Here</a>
              </Form.Text>
            </div>

          </Form>
        </div>
      </Modal.Body>
    </Modal>

    </>
  );
}

export default LoginForm
