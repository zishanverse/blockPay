import { Toaster } from "react-hot-toast";
import "./App.css";
import './pages/styles/home.css'
import AppContext from "./Context/context";
import ConnectModal from "./components/ConnectModal";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import CreateAllocation from './pages/CreateAllocation';
import Allocations from './pages/Allocations';
import Allocation from './pages/Allocation';
import NotFound from './pages/NotFound';

const App = () => {
  // const wa = Cookies.get("wallet");
  const [wallet, setWallet] = useState(); //wa
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const updateWallet = (wallet) => {
    setWallet(wallet);
    // Cookies.set("wallet", wallet, {expires:30});
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
    

  };

  return (
    <AppContext.Provider value={({wallet: wallet, isModalOpen, setIsModalOpen: showConnectModal})}>
    <div className="main-container">
      <Navbar
        updateWallet={updateWallet}
        wallet={wallet}
        showConnectModal={showConnectModal}
      />
      <Toaster />
      <ConnectModal
        updateWallet={updateWallet}
      />
      
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-allocation" element={<CreateAllocation />} />
        <Route exact path="/allocations" element={<Allocations />} />
        <Route exact path="/allocations/:name" element={<Allocation />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
      </div>
    </AppContext.Provider>
    
  );
}

export default App;
