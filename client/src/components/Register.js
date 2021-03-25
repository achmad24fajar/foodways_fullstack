import {useState, useContext} from 'react';
import {UserContext} from '../context/userContext';
import {Button, Modal, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

function Register() {
  const router = useHistory();
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, dispatch] = useContext(UserContext);

  const handleRegister = (event) => {
    event.preventDefault()
    dispatch({
      type: 'USER_VALID',
      payload: 
        {
          email: email,
          password: password,
          fullName: fullName,
          gender: gender,
          phone: phone,
          role: role
        }
    });
    handleClose()
    if(role == 'partner'){
      router.push('/partner');
    }else{
      router.push('/');
    }
  }

  return (
    <>
    <Button variant="dark" onClick={handleShow} className="btn-sm mr-2">
      Register
    </Button>
    <Modal show={show} onHide={handleClose} className="foodways-modal" centered>
      
      <Modal.Body className="px-4">
        <div>
          <h2 className="text-warning">Register</h2>
        </div>
        <div className="mt-4">
          <Form onSubmit={handleRegister}>

            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" value={email} onInput={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" value={password} onInput={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Full Name" value={fullName} onInput={e => setFullName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1" >
              <Form.Control as="select" onChange={e => setGender(e.target.value)}>
                <option value="">Choose Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="text" placeholder="Phone" value={phone} onInput={e => setPhone(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1" >
              <Form.Control as="select" onChange={e => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="user">As User</option>
                <option value="partner">As Partner</option>
              </Form.Control>
            </Form.Group>

            <div className="mt-4 text-center">
              <Button variant="dark" type="submit" className="btn-block">
                Register
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