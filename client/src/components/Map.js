import React, { useMemo, useEffect, useState } from 'react';
import ReactMapGL, {Popup} from 'react-map-gl';
import {Button, Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker, faTimes } from '@fortawesome/free-solid-svg-icons'

function Map() {

  const [viewport, setViewport] = useState({
    container: 'map',
    latitude: -6.1753942,
    longitude: 106.827183,
    width: "fit",
    height: "50vh",
    zoom: 10,
  });

  console.log(viewport)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPopup, togglePopup] = useState(false);

  return (
    <>
    <Button variant="dark" onClick={handleShow} className="mr-2" style={{width: "250px"}}>
      <FontAwesomeIcon icon={faMapMarker} className="text-white font-standart mr-2" />See on map
    </Button>
    
    <Modal 
      show={show} 
      onHide={handleClose}
      centered>


      <Modal.Body>
        <FontAwesomeIcon icon={faTimes} className="text-dark font-big" onClick={handleClose}
        style={{position: "absolute", right: "25", top: "20", zIndex: "2000", cursor: "pointer"}} />

        <ReactMapGL 
        {...viewport} 
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiYWNoZmFqYXItMjQiLCJhIjoiY2ttOTdmYmhhMWZndzJvb2o5b3h3Ym5tcyJ9.nrHsfh693IosdLB9294YQQ"
        onViewportChange={(viewport) => setViewport(viewport)}>          
        </ReactMapGL>

      </Modal.Body>

    </Modal>
    </>
  );
}

export default Map