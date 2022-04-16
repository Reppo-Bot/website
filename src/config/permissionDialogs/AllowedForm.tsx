import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    SelectChangeEvent
} from "@mui/material"
import ConfigContext from "./../ConfigContext"
import {useContext} from "react"
import {rank, role} from "./../../types"
const AllowedForm = (props: {
        permType: string,
        allowed: string,
        allowedError: string,
        allowedOn: string[],
        handleAllowedOnChange: (event: SelectChangeEvent<string>)=>void,
        setAllowed: (s:string)=>void}) => {
    const botContext = useContext(ConfigContext)
    return(
    <>
    {props.permType === 'all' ? (null) : (props.permType === 'rank' ? (
    <>
        <Grid item xs={12}>
            <Typography>
                Ranks
            </Typography>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
            <InputLabel id="allowed-input">Allowed</InputLabel>
            <Select
                labelId="allowed-input"
                value={props.allowed}
                error={!!props.allowedError}
                onChange={(e) => props.setAllowed(e.target.value)}
                label="Allowed"
                >
                {botContext.bot!.config.ranks.map((rank: rank)=>
                    <MenuItem key={rank.name} value={rank.name}>
                        {rank.name}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel id="allowed-input">Allowed On</InputLabel>
            <Select
                labelId="allowed-input"
                multiple
                // Looks like value isnt properly typed for multiple
                // @ts-ignore
                value={props.allowedOn}
                onChange={props.handleAllowedOnChange}
                label="AllowedOn"
                >
                {botContext.bot!.config.ranks.map((rank: rank)=>
                    <MenuItem key={rank.name} value={rank.name}>
                        {rank.name}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
        </Grid>
    </>
    ) : (
    <>
        <Grid item xs={12}>
            <Typography>
                Roles
            </Typography>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
            <InputLabel id="allowed-input">Allowed</InputLabel>
            <Select
                labelId="allowed-input"
                value={props.allowed}
                error={!!props.allowedError}
                onChange={(e) => props.setAllowed(e.target.value)}
                label="Allowed"
                >
                {botContext.bot!.config.roles.map((rank: rank)=>
                    <MenuItem key={rank.name} value={rank.name}>
                        {rank.name}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel id="allowed-input">Allowed On</InputLabel>
            <Select
                labelId="allowed-input"
                multiple
                // Looks like value isnt properly typed for multiple
                // @ts-ignore
                value={props.allowedOn}
                onChange={props.handleAllowedOnChange}
                label="AllowedOn"
                >
                {botContext.bot!.config.roles.map((rank: rank)=>
                    <MenuItem key={rank.name} value={rank.name}>
                        {rank.name}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
        </Grid>
    </>
    ))}
    </>
    )
}
export default AllowedForm
