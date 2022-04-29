import React from 'react'
type user = {
    name: string,
    id: string,
    avatar: string
}


const PageContext = React.createContext({
    colorMode: {
        toggleColorMode: () => {return}
    },
    setTokenInfo: (token: string, expiration: number) => {return},
    setUser: (user: user) => {return},
    user: {
        name: '',
        id: '',
        avatar: ''
    },
    accessToken: '',
    expiration: 0,
    setCookie: (name: ("mode" | "user" | "token"), value: any, options?: any) => {return}
})

export default PageContext
