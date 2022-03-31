import React from 'react';

const PageContext = React.createContext({
    colorMode: {
        toggleColorMode: () => {}
    },
    setTokenInfo: (token, expiration, callback) => {},
    setUser: (user) => {},
    user: {
        name: '',
        id: '',
        avatar: ''
    },
    accessToken: '',
    expiration: 0,
    setCookie: (name, value, options?) => {}
})

export default PageContext
