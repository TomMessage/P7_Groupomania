import EditProfil from '../../components/EditProfil';
import { Link } from 'react-router-dom';
import Log from '../../components/Log'

function Profile() {
    const isLogged = localStorage.getItem('token');

    return (
        <>
            <header>
                <Link to="/"><img className='logo' src='./img/logo-noir.png' alt='' /> </Link>
            </header>
            <div>
                {isLogged ? <EditProfil /> : <Log signin={false} signup={true} />}
            </div>
        </>
    )
}
export default Profile;