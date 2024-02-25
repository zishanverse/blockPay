import {Link} from 'react-router-dom';
import './styles/allocation.css';
// This page opens to view individual allocation

// People can view amount-spent and purpose
// People can add immutable comments
// Check if connected wallet is creator of allocation and only he can update
// amount spent from this page
const customStyles = {
    content: {
      padding: '10px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  

const AllocationItem = props => {
  const {item} = props
  const {amountAllocated, amountSpent, purpose, key} = item

    return (
        <Link to={`/allocations/${key}`}>     
            <li className="allocation-item">
                <p className="allocation-text">Name: {key}</p>
                <p>Amount Allocated: {amountAllocated} Rupees</p>
                <p>Amount Spent: {amountSpent} Rupees</p>
                <p>Purpose: {purpose}</p>
                <button className='btn'>More Details</button>
            </li>
        </Link>
    )   
}

export default AllocationItem