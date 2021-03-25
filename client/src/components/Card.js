import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

function Card(props) {

  const history = useHistory();

  if(props.template == 'style-1'){

    const {id, name, image} = props.data

    return (
      <div className="popular-restourant-item bg-white rounded p-2 mt-3 shadow-sm">
        <img src={image} className="mr-3" />
        <span className="font-weight-bold popular-restourant-title">{name}</span>
      </div>
    );
  } else

  if(props.template == 'style-2'){

    const {id, image, name, distance} = props.data

    return (
      <div className="restourant-near-you-item bg-white rounded p-2 mt-3 shadow-sm">
        <img src={image} className="mr-3" />
        <h6 className="mt-2 ml-2">{name}</h6>
        <span className="text-muted ml-2">{distance}</span>
      </div>
    );
  } else

  if(props.template == 'style-3'){

    const {id, name, image, price} = props.data;

    return (
      <div className="restourant-near-you-item bg-white rounded p-2 mt-3 shadow">
        <img src={image} className="mr-3" />
        <h6 className="mt-3 ml-2 libre">{name}</h6>
        <span className="text-dark ml-2 font-standart font-weight-bold">Rp.{price}</span>
        <div className="my-2">
          <button 
          className="btn btn-block btn-warning font-weight-bold" 
          onClick={() => props.addProductToCart(props.data, props.restourant)}>
            <FontAwesomeIcon icon={faCartPlus} /> Order
          </button>
        </div>
      </div>
    );

  }

}

export default Card;
