import { Link } from 'react-router-dom';
import Logout from '../../components/Log/Logout';
import NewPost from '../../components/Feed/NewPost';
import Log from '../../components/Log'
import Feed from '../../components/Feed/Feed';

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
        <br />
        <h1>Publications récentes</h1>
        <br />
        <Feed />
      </div>

    </div>
  )
}

export default Home
