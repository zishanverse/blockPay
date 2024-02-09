import {useState} from 'react'
import logic from '../interface/logic'
import './home.css'

const Home = props => {
  const [FundName, setFundName] = useState("")
  const [amountAllocated, setAmountAllocated] = useState(0)
  const [amountSpent, setAmountSpent] = useState(0)
  const [purpose, setPurpose] = useState("")
  const [updateFund, setUpdateFund] = useState("")
  const [ended, setEnded] = useState(false)
  const [list, setList] = useState([])
  const [fundId, setFundId] = useState("")
  const [error,setError] = useState(false)
  const {wallet} = props

  const changeFundName = e => {
    setFundName(e.target.value)
  }  

  const addToList = async e => {
    e.preventDefault();
    const item = {FundName,amountAllocated, amountSpent, purpose, ended}
    
    const resp = await logic.CreateAllocation(item);
    setList(pre => [...pre, resp])
  }

  const changeAmountAllocated = e => setAmountAllocated(e.target.value)

  const changeAmountSpent = e => setAmountSpent(e.target.value)

  const changePurpose = e => setPurpose(e.target.value)

  const changeEnded = e => setEnded(e.target.value)

  const changeFund = async() => {
    await logic.UpdateAmountSpent(fundId, updateFund);
    setAmountSpent(pre => pre + updateFund)
    const found = list.find(each => each.id === fundId)
    if (found === undefined) {
      setError(true)
    }
    else {
      setError(false)
      const item = {allocationId: fundId, FundName,amountAllocated, amountSpent, purpose, ended}
      setList(pre => [...pre, item])
    }
    
    
  }

  const updateAmount = e => setUpdateFund(e.target.value)

  const changeFundId = e => {
    if (e.target.value.isInteger()){
      setFundId(e.target.value)
    }
  }



  return (
    <>
      <div className="form-container">
      <form onSubmit={addToList}>
        <h2 className="state">Fund Name</h2>
        <input type="text" value={FundName} onChange={changeFundName}/>
        <h2 className="">Amount Allocated</h2>
        <input type="text" value={amountAllocated} onChange={changeAmountAllocated}/>
        <h2>Amount Spend</h2>
        <input type="text" value={amountSpent} onChange={changeAmountSpent}/>
        <h2>purpose</h2>
        <input type="text" value={purpose} onChange={changePurpose}/>
        <h2>Ended</h2>
        <input type="Checkbox" value={ended} onChange={changeEnded}/>
        
        <br/>
        <br/>
        <button type="submit">Add to Allocated</button>
        </form>
      </div>
      <div className="form-container">
        <h2>update amount Spend</h2>
        <input type="text" value={fundId} onChange={changeFundId} />
        <input type="text" onChange={updateAmount}/>
        <button type="button" onClick={changeFund}>update</button>
        {error ? <p className="error">it should be number or item not found</p>: null}
      </div>

      <div className="list-container">
        <ul className="list">
          {list.map(each => <li key={each.id} className="form-container">
            <p className="item-details">id: {each.id}</p>
            <p className="item-details">Fund Name: {each.FundName}</p>
            <p className="item-details">Amount Allocated: {each.amountAllocated}</p>
            <p className="item-details">Amount Spent: {each.amountSpent}</p>
            <p className="item-details">Purpose: {each.purpose}</p>
            <p className="item-details">Ended: {each.ended}</p>
          </li>)}
        </ul>
      </div>
      </>
  )
}

export default Home
