
import logic from "../interface/logic";
import { toastInfo, toastSuccess, toastError } from "../utils/toastWrapper";
import {useState, useEffect} from 'react';
import Modal from 'react-modal';
import { truncateStr } from "../utils/truncateStr";
import { bytesToHex } from "js-moi-sdk";
import { FaRupeeSign } from "react-icons/fa";
import {Circles, ColorRing} from 'react-loader-spinner';
import AppContext from "../Context/context";
import {useParams} from 'react-router-dom';
import './styles/allocation.css';

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
  

const Allocation = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amountSpent, setAmountSpent] = useState("");
  const [item, setItem] = useState("");
  const [comment, setComment] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const {name} = useParams();
  console.log(item);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
      try {
        setLoading(true);
        const {allocations} = await logic.GetAllocations();
        const update = [];
        for (let each of allocations.entries()) {
          update.push({...each[1], key: each[0]});
        };
        const found = update.find(each => each.key === name)
        setItem(found);
        console.log(found);
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
        toastError(error.message);
      }
  }


    
  const changeAmountSpend = event => {
    if (Number.isNaN(parseInt(event.target.value))) {
      setAmountSpent("");
    }
    else {
      setAmountSpent(parseInt(event.target.value))
    }
  }
    
  function openModal() {
    setIsOpen(true);
  }
  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal2() {
    setIsOpen2(false);
  }
    return (
      <AppContext.Consumer>
        {value => {
          const {wallet, setIsModalOpen} = value;
          const changeFund = async () => {
            if (wallet === undefined) {
              setIsModalOpen(true);
            }
            else {
              try {
                setLoadingBtn(true);
                  toastInfo("Adding Spend Amount...");
                  await logic.UpdateAmountSpent(wallet, name , amountSpent);
                  toastSuccess("Successfully Added");
                  setIsOpen(false);
                  setAmountSpent(0);
                  setLoadingBtn(false);
                  getData();
                }
                catch (error) {
                  closeModal();
                  setAmountSpent(0);
                  setLoadingBtn(false);
                  toastError(error.message);
                }
            }
            
          };
    
          const AddComment = async () => {
            if (wallet === undefined) {
              setIsModalOpen(true);
            }
            else {
              try {
                setLoadingBtn(true);
                toastInfo("Adding Comment...");
                await logic.AddComment(wallet, name , comment);
                toastSuccess("Successfully Added");
                setIsOpen2(false);
                setComment("");
                setLoadingBtn(false);
                getData();
              }
              catch (error) {
                setIsOpen2(false);
                setComment("");
                setLoadingBtn(false);
                toastError(error.message);
              }
            }
          }

          
        

          return (
            <li className="home-container">
          {loading ? <Circles
                      height="80"
                      width="80"
                      color="#000"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                  /> : 
                  <div className="allocation-details-card">
                  <h1 className="head">Allocation Details</h1>
                  <p className="allocation-text">Name: {name}</p>
            <p>Amount Allocated: <span><FaRupeeSign /></span> {item.amountAllocated}</p>
            <div className="flex">
            <p>Add to amount spent: <span><FaRupeeSign /></span> {item.amountSpent}</p> <button onClick={openModal} className="btn update">Update</button>
            </div>
            <p>Purpose: {item.purpose}</p>
            <h2 className="head">Previous Comments</h2>
            <ol>
                {item && item.comments.map(each => <li className="comment-card"><p className="comment">comment: {each.comment}</p><p className="comment">commentator: {truncateStr(bytesToHex(each.commentator), 11)}</p></li>)}</ol>
            <div className="btns">
            <button onClick={openModal2} className="connect-btn">Add Comments</button>
            </div>
            <Modal
            isOpen={modalIsOpen2}
            onRequestClose={closeModal2}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="modal-container">
            <div>
              <label className="modal-label">Enter your comment</label>
              <textarea  rows="25" cols="30" onChange={(e) => setComment(e.target.value)} placeholder="Enter your Comment  " value={comment}/>
            </div>
            <button onClick={AddComment} className="btn">{loadingBtn ? <ColorRing
  visible={true}
  height="20"
  width="20"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /> : 'Done'}</button>
            </div>
          </Modal>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="modal-container">
            <h2 className="form-name">Allocation</h2>
            <div>
              <label className="modal-label">Enter Amount Spend</label>
              <input className="form-input" type="text" onChange={changeAmountSpend} placeholder="Enter Allocation Spend Amount" value={String(amountSpent)}/>
            </div>
            
            <button onClick={changeFund} className="btn">{loadingBtn ? <ColorRing
  visible={true}
  height="20"
  width="20"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /> : 'Add Spend'}</button>
            </div>
          </Modal>
          </div>
                  }
            
        </li>
          )
        }}

      </AppContext.Consumer>
        
    )
}

export default Allocation