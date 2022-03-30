import React from 'react';

const PageContext = React.createContext({
    colorMode: {
        toggleColorMode: () => {}
    },
    setTokenInfo: (token, expiration, callback) => {},
    accessToken: '',
    expiration: 0
})

export default PageContext
