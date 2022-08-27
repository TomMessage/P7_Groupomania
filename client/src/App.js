import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import "./styles/index.scss"
import Profil from './pages/Profile'
import Error from './components/Error';

function App() {
    return (

        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/profil" element={<Profil />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    )
}

export default App;