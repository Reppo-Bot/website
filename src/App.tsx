import React, {useState} from 'react';
import PageContext from "./PageContext"

const App = () => {
    const [isDark, setDark] = useState(true);
    const toggleTheme = () => {
        setDark(!isDark)
    }
    return (
        <>
            <PageContext.Provider value={{
                isDark: true,
                toggleTheme: toggleTheme
            }}>
                Hello world, we are in {isDark ? "Dark" : "Light"} mode!
            </PageContext.Provider>
        </>
    )
}

export default App;
