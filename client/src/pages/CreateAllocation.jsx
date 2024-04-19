import { useState } from "react";
import { toastInfo, toastSuccess, toastError } from "../utils/toastWrapper";
import {useNavigate} from 'react-router-dom';
import AppContext from "../Context/context";
import {ColorRing} from 'react-loader-spinner';
import logic from "../interface/logic";
import './styles/createAllocation.css';

const CreateAllocation = () => {
  const [allocationName, setFundName] = useState("");
  const [amountAllocated, setAmountAllocated] = useState('');
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeFundName = (e) => {
    setFundName(e.target.value);
  };
  const changePurpose = (e) => setPurpose(e.target.value);


  const changeAmountAllocated = (e) => {
    if (Number.isNaN(parseInt(e.target.value))) {
      setAmountAllocated("");
    }
    else {
      setAmountAllocated(parseInt(e.target.value));
    }
  }
    


    

      return (
        <AppContext.Consumer>
          {value => {
            const {wallet, setIsModalOpen} = value;

            const addToList = async (e) => {
              e.preventDefault();
              if (wallet === undefined) {
                setIsModalOpen(true);
              }
              else {
                try {
                  setLoading(true);   
                  toastInfo("Adding Allocation...");
                  await logic.CreateAllocations(wallet,allocationName, purpose, amountAllocated);
                  toastSuccess("Successfully Added");
                  setPurpose("");
                  setAmountAllocated('');
                  setLoading(false);
                  navigate(`/allocations/${allocationName}`);
                  setFundName("");
                } catch (error) {
                  setLoading(false);
                  toastError(error.message);
                }
              }
              
            };

            
      
          return (
              <form className="home-container" onSubmit={addToList}>
                <div className="form-container">
                <h2 className="form-text">Fund Name</h2>
                <input type="text"
                className="form-input" value={allocationName} onChange={changeFundName} />
                <h2 className="form-text">Amount Allocated</h2>
                <input
                  type="text"
                  className="form-input"
                  value={amountAllocated}
                  onChange={changeAmountAllocated}
                />
                <h2 className="form-text">purpose</h2>
                <input type="text"
                className="form-input" value={purpose} onChange={changePurpose} />
                
                <br />
                <br />
                <button type="submit" className="connect-btn">{loading ? <ColorRing
  visible={true}
  height="20"
  width="20"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /> : 'Add to Allocated'}</button>
                </div>
              </form>
          )
          }}
        </AppContext.Consumer>
      )
}

export default CreateAllocation