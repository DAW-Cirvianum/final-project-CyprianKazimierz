import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
export default function NotFound() {
    const {isLogged} = useContext(AuthContext);
    console.log(isLogged());
  return (
    <div className='container mx-auto my-auto text-center' style={{width:"50rem",height:"auto"}}>
      <h1>404 - Page Not Found</h1>
      <p>The page does not exists.</p>
      {isLogged() ? (<Link to="/">Go back home</Link>) : (<Link to="/home">Go back home</Link>)}
    </div>
  );
}