import React from 'react';
import { Button, Modal, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { isRegister, isLogin, isClose } from '../actions'
import { useDispatch, useSelector } from "react-redux";

import Register from './Register'
import LoginForm from './Login'
import SlideShow from './SlideShow'

function Authentication() {
  const modalToggle = useSelector(state => state.modal.auth.isActive);
  const classToggle = useSelector(state => state.modal.auth.className);
  const dispatch = useDispatch();

  return (
    <>
    <Button variant="dark" onClick={() => dispatch(isLogin())} className="btn-sm mr-2">
      Login
    </Button>
    <Button variant="dark" onClick={() => dispatch(isRegister())} className="btn-sm mr-2">
      Register
    </Button>
    <Modal
    show={modalToggle}
    onHide={modalToggle}
    backdrop="static"
    size="xl"
    className="rounded-lg"
    centered>
      <Modal.Body className="p-0">
        <Row>
          <Col md={6} className={`p-3 pb-0`}>
          <div className="auth-frame">
            <div className={`auth-slider ${classToggle}`}>
              <div className="auth-container">
                <Register />
              </div>
              <div className="auth-container">
                <LoginForm />
              </div>
            </div>
          </div>
          </Col>
          <Col md={6} className="position-relative">
            <div class="register-image bg-warning mr-2 rounded-right">
              <SlideShow/>
            </div>
            <div className="close-modal" role="button" onClick={() => dispatch(isClose())}>
              <FontAwesomeIcon icon={faTimes} className="text-muted" />
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default Authentication
