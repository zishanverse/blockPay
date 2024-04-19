import React from 'react';

const AppContext = React.createContext({
    wallet: undefined,
    isModalOpen: false,
    setIsModalOpen: () => {}
})
export default AppContext;