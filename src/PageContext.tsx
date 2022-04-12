import React from 'react';
type user = {
    name: string,
    id: string,
    avatar: string
}


const PageContext = React.createContext({
    colorMode: {
        toggleColorMode: () => {}
    },
    setTokenInfo: (token: string, expiration: number) => {},
    setUser: (user: user) => {},
    user: {
        name: '',
        id: '',
        avatar: ''
    },
    accessToken: '',
    expiration: 0,
    setCookie: (name: ("mode" | "user" | "token"), value: any, options?: any) => {}
})

export default PageContext
