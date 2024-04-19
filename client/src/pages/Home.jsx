import {Link} from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import "./styles/home.css";



const Home = () => (
              <div className="home-container">
                <div className='home-content'>
                  <h1 className='home-head'>
                      <span className="heading">G</span>
                      <span className="heading">o</span>
                      <span className="heading">v </span>
                      <span className="heading">Integrated </span>
                      <span className="heading">F</span>
                      <span className="heading">u</span>
                      <span className="heading">n</span>
                      <span className="heading">d </span>
                      <span className="heading">Manager</span></h1>
                  <p className='content'>
                      Welcome to our decentralized government fund management web-app! based on <span ><a className='moi-text' href="https://moi.technology/">MOI Technology.</a></span>
                      <br />
                      <br />
                      Our platform facilitates the allocation of government funds to gram panchayats, block panchayats, and zilla parishads, enabling them to implement essential programs and services tailored to their specific needs.
                      <br />
                      <br />
                      Experience the power of decentralized governance with our intuitive and efficient web-app.
                  </p>
                  
                  <Link to="/add-allocation" ><button className="connect-btn" >Add Allocation</button></Link>
                </div>
                <img src="https://www.icicidirect.com/images//Fund%20manager-202210281647246454795.png" alt="gov" className="gov-logo" />
              </div>
)


export default Home;