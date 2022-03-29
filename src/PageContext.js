import React from 'react';

const PageContext = React.createContext({
    isDark : true,
    toggleTheme: () => {}
})

export default PageContext
