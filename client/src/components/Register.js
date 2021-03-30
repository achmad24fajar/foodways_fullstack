import {useState, useContext} from 'react';
import {UserContext} from '../context/userContext';
import {Button, Modal, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {useQuery, useMutation } from 'react-query';
import {API, setAuthToken} from '../config/api'

import LoginForm from './Login'

function Register() {
  const router = useHistory();
  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, dispatch] = useContext(UserContext);

  const [confirmPassword, setConfirmPass] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [dataUser, setDataUser] = useState('');
  const [register, setRegister] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    role: ""
  });
  const [newerror, setError] = useState('');

  const { fullname, email, password, phone, gender, role } = register;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseConfirmPassword = () => setShowConfirmPassword(false);
  const handleshowConfirmPassword = () => setShowConfirmPassword(true);
 
  const { data: users, loading, error, refetch } = useQuery('register', async () => {
    const response = await API.get("/users");
    return response;
  })

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
        role,
      });

      const response = await API.post("/register", body, config);
      setDataUser(response.data.data.user)
      refetch();

      handleClose()
      handleshowConfirmPassword()
    } catch (err) {
      setError(err.response.data.message)
    }
  });

  const onChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault()
    addUser.mutate();
    
  }

  const handleConfirmPassword = (e) => {
    e.preventDefault()

    if(confirmPassword !== password){
      return setErrorPassword('Your Password is incorrect!')
    }

    dispatch({
      type: 'USER_VALID',
      payload: dataUser
    });

    setAuthToken(dataUser.token)

    handleCloseConfirmPassword()

    if(role == 'partner'){
      router.push('/partner');
    }else{
      router.push('/');
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    handleCloseConfirmPassword()
  }

  return (
    <>
    <Button variant="dark" onClick={handleShow} className="btn-sm mr-2">
      Register
    </Button>
    <Modal show={show} onHide={handleClose} className="foodways-modal" backdrop="static" centered>
      
      <Modal.Body className="px-4">
        <div>
          <h2 className="text-warning">Register</h2>
        </div>
        {newerror && 
        <div class="alert alert-danger" role="alert">
          {newerror}
          </div>
        }
        <div className="mt-4">
          <Form onSubmit={handleRegister}>

            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={(e) => onChange(e)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e) => onChange(e)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Full Name" name="fullname" value={fullname} onChange={(e) => onChange(e)} />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1" >
              <Form.Control as="select" name="gender" onChange={(e) => onChange(e)}>
                <option value="">Choose Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="text" name="phone" placeholder="Phone" value={phone} onChange={(e) => onChange(e)} />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1" >
              <Form.Control as="select" name="role" onChange={(e) => onChange(e)}>
                <option value="">Choose Role</option>
                <option value="user">As User</option>
                <option value="partner">As Partner</option>
              </Form.Control>
            </Form.Group>

            <div className="mt-4 text-center">
              <Button variant="dark" type="submit" className="btn-block">
                Register
              </Button>
              <Button variant="white" className="btn-block btn-outline-warning" onClick={handleClose}>
                Close
              </Button>

              <Form.Text className="text-muted mt-2">
                Already have an account? Klik <a href="" className="text-dark font-weight-500">Here</a>
              </Form.Text>
            </div>

          </Form>
        </div>
      </Modal.Body>
    </Modal>

    <Modal show={showConfirmPassword} onHide={handleCloseConfirmPassword} className="foodways-modal" centered>
      
      <Modal.Body className="px-4">
        {errorPassword && <div class="alert alert-danger" role="alert">
          {errorPassword}
        </div>}
        <div>
          <h4 className="text-warning">Confirm Password</h4>
        </div>
        <div className="mt-4">
          <div className="username">
            <h4>Masuk sebagai {email}</h4>
          </div>
          <Form onSubmit={handleConfirmPassword}>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" value={confirmPassword} onInput={(e) => setConfirmPass(e.target.value)} />
            </Form.Group>

            <div className="mt-4 text-center">
              <Button variant="dark" type="submit" className="btn-block">
                Login
              </Button>
              <Button variant="white" className="btn-block btn-outline-warning" onClick={logout}>
                Close
              </Button>

              <Form.Text className="text-muted mt-2">
                Already have an account? Klik <a href="" className="text-dark font-weight-500">Here</a>
              </Form.Text>
            </div>

          </Form>
        </div>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default Register