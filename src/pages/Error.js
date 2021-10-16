import { Link } from 'react-router-dom';

const Error = () =>{
    return(
        <div>
            <p>Requested not found go to the home page</p>
            <Link to="/">Go to Home </Link>
        </div>
    )
}

export default Error;