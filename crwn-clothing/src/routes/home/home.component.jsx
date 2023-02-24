import Directory from '../../components/directory/directory.component.jsx'
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
        <Directory />
        <Outlet />
    </div>
  );
}

export default Home;
