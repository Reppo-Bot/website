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

const SearchBox = () => {
    const [options, setOptions] = useState<(Server|User)[]>([])
    const [inputValue, setInputValue] = useState('')
    const theme  = useTheme()
    const getUrl = (option: User | Server)=>{
        if(option.group === 'Server'){
            return `https://cdn.discordapp.com/icons/${option.id}/${option.avatar}?size=480`
        }
        if(option.group === "User"){
            return `https://cdn.discordapp.com/avatars/${option.id}/${option.avatar}?size=480`
        }
    }

    const getAvatar = (entity: Server | User) => {
        if(entity.avatar === ""){
            return (
                <Avatar>
                    {entity.name[0]}
                </Avatar>
            )
        }
        return <Avatar src={`https://cdn.discordapp.com/${entity.group === 'Server' ? "icons":"avatars"}/${entity.id}/${entity.avatar}?size=480`} alt={entity.name}/>
    }

    useEffect(() => {
        if(inputValue === ''){
            setOptions([])
            return
        }

        search(inputValue).then((payload) => {
            if(payload){
                const servers = payload[0].map((option: Server)=>{
                    return {...option, group: "Server"}
                })
                const users = payload[1].map((option: User)=>{
                    return {...option, id: option.discordid, group: "User"}
                })
                const results: (Server|User)[]= [...users, ...servers]
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
                groupBy={(option) => option.group!}
                renderOption={(props, option, state)=>{
                    return (
                        <ul key={option.id} style={{paddingTop: '5px', paddingBottom: '5px'}}>
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex'
                                }}
                                to={`/${option.group}/${option.id}`}>
                                {getAvatar(option)}
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
