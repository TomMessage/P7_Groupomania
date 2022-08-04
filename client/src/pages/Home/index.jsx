import { Link } from 'react-router-dom';
import Logout from '../../components/Log/Logout';
import NewPost from '../../components/NewPost';
import Log from '../../components/Log'
import Posts from '../../components/Posts';

function Home() {

  const isLogged = localStorage.getItem('token');

  return (
    <div>
      <header>
        <div className='logo'><Link to="/"><img className='logo' src='./img/logo-noir.png' alt='' /> </Link></div>
        <div className='nav'><Link to="/profil"><img src='./icons/user-regular.svg' alt='' /></Link>
          <Logout />
        </div>


      </header>
      <div className='home'>
        {isLogged ? <NewPost /> : <Log signin={false} signup={true} />}
      </div>
      <Posts />
    </div>
  )
}

export default Home
