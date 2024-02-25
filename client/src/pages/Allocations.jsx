
import { useState, useEffect } from "react";
import logic from "../interface/logic";
import AppContext from "../Context/context";
import {toastError } from "../utils/toastWrapper";
import {Circles} from 'react-loader-spinner';
import {Navigate} from 'react-router-dom';
import "./styles/allocation.css";
import AllocationItem from "./AllocationItem";



const Allocations = ({ wallet }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    
      try {
        const {allocations} = await logic.GetAllocations();
        const update = [];
        for (let each of allocations.entries()) {
          update.push({...each[1], key: each[0]});
        };
        setList(update);
        
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
        toastError(error.message);
      }
  }

  return (
    <AppContext.Consumer>
      {value => {
        const {wallet} = value;

        if (wallet === undefined) {
          return <Navigate replace to={"/connect"} />
        }
          return (
            
              <div className="home-container">
                  {loading ? <Circles
                      height="80"
                      width="80"
                      color="#000"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                  /> :<>
                  <h1 className="head">List of Allocations</h1>
                  <ul className="pre-allocations">
                  {list.map(each => <AllocationItem key={each.key} item={each}/>)}
                </ul>
                  </> }
                </div>
            )
      }}
    </AppContext.Consumer>
  )
};


export default Allocations
