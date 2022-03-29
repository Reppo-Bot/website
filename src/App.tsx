import React, {useState} from 'react';
import PageContext from "./PageContext"
import {createTheme, ThemeProvider, styled} from "@mui/material"

const App = () => {
    const [isDark, setDark] = useState(true);
    const toggleTheme = () => {
        setDark(!isDark)
    }
    const theme = createTheme({
        palette: {
            mode: (isDark ? "dark" : "light")
        }
    })
    return (
        <>
            <ThemeProvider theme={theme}>
                <PageContext.Provider value={{
                    isDark: true,
                    toggleTheme: toggleTheme
                }}>
                    Hello world, we are in {isDark ? "Dark" : "Light"} mode!
                </PageContext.Provider>
            </ThemeProvider>
        </>
    )
}

export default App;
