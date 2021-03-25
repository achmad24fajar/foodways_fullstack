import {useContext, useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../context/userContext';

function LoginForm() {
  const router = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loginHandler = (event) => {
    event.preventDefault()
    if(email == state.user.email){
      if(password == state.user.password){
        dispatch({
          type: "LOGIN_SUCCESS"
        })
        handleClose()
        router.push('/');
      }
    }
  }

  return (
    <>
    <Button variant="dark" onClick={handleShow} className="btn-sm">Login</Button>
    <Modal show={show} onHide={handleClose} className="foodways-modal" centered>

      <Modal.Body className="px-4">
        <div>
          <h2 className="text-warning">Login</h2>
        </div>
        <div className="mt-4">
          <Form onSubmit={loginHandler}>

            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" value={email} onInput={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" value={password} onInput={e => setPassword(e.target.value)} />
            </Form.Group>

            <div className="mt-4 text-center">
              <Button variant="dark" type="submit" className="btn-block">
                Login
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
