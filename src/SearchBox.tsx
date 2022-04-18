import {
    Autocomplete,
    TextField,
    Typography,
    Avatar,
    useTheme
} from "@mui/material"
import {useState, useEffect} from 'react'
import {search} from './utils/homepage'
import {Link} from 'react-router-dom'

type serverEntry = {
    avatar: string,
    id: string,
    name: string,
    group: string
}

type userEntry = {
    name: string,
    avatar: string,
    group: string,
    id: string,
    discordid: string
}

const SearchBox = () => {
    const [options, setOptions] = useState<(serverEntry|userEntry)[]>([])
    const [inputValue, setInputValue] = useState('')
    const theme  = useTheme()
    useEffect(() => {
        if(inputValue === ''){
            setOptions([])
            return
        }

        search(inputValue).then((payload) => {
            if(payload){
                const servers = payload[0].map((option: serverEntry)=>{
                    return {...option, group: "Server"}
                })
                const users = payload[1].map((option: userEntry)=>{
                    return {...option, id: option.discordid, group: "User"}
                })
                const results: (serverEntry|userEntry)[]= [...users, ...servers]
                setOptions(results)
            }
        })

    },[inputValue])
    return (
        <>
            <Autocomplete
                filterOptions={(x) => x}
                options={options}
                autoComplete
                renderInput={(params) => (
                    <TextField {...params} label="Search User or Server" fullWidth/>
                )}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                groupBy={(option) => option.group}
                renderOption={(props, option, state)=>{
                    return (
                        <ul key={option.id} style={{paddingTop: '5px', paddingBottom: '5px'}}>
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex'
                                }}
                                to={`/${option.group}/${option.id}`}>
                                {option.avatar === "" || option.avatar === null ? (
                                    <Avatar/>
                                ) : (
                                    <Avatar src={`https://cdn.discordapp.com/avatars/${option.id}/${option.avatar}?size=480`} alt={option.name}/>
                                )}
                                <Typography variant="h6" sx={{paddingLeft: '10px', color: theme.palette.text.primary}}>
                                    {option.name}
                                </Typography>
                            </Link>
                        </ul>
                        )

                }}
                getOptionLabel={(option)=> option ? option.id : ""}
            />
        </>
    )
}

export default SearchBox
