import {Navigate} from 'react-router-dom';
import AppContext from '../Context/context';
import './styles/login.css';

const Login = ({wallet }) => (
    <AppContext.Consumer>
        {value => {
            const {wallet} = value;

            if (wallet !== undefined) {
                return <Navigate replace to={"/"} />
            }
        
            return (
                <div className='login'>
                    <img src="https://cdn-icons-png.freepik.com/512/154/154345.png" alt="wallet" className='login-img' />
                    <h1 className='nav-text'>Please Connect to wallet</h1>
                </div>
            )
        }}
    </AppContext.Consumer>
)

export default Login