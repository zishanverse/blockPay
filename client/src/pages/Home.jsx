import AppContext from "../Context/context";
import {Navigate, Link} from 'react-router-dom';
import "./styles/home.css";



const Home = () => (
    <AppContext.Consumer>
      {value => {
        const {wallet} = value;

        if (wallet === undefined) {
          return <Navigate replace to={"/connect"} />
        }
          return (
              <div className="home-container">
                  <img src="https://www.icicidirect.com/images//Fund%20manager-202210281647246454795.png" alt="gov" className="gov-logo" />
                  <h1 className="heading">Gov Fund Manager</h1>
                  <Link to="/create-allocation" ><button className="connect-btn" >Add Allocation</button></Link>
              </div>
               )}}
    </AppContext.Consumer>
)


export default Home;