import {
    Menu,
    MenuItem,
} from "@mui/material"
import ConfigContext from "./../ConfigContext"
import {useContext} from 'react'

const AddNewPermissionDialog = (props: {anchor: any, open: boolean, onClose: (val: boolean)=>void}) => {
    const botContext = useContext(ConfigContext)
    const handleAddCommand = (command: string) => {
        let newPermissions = botContext.bot!
        newPermissions.config.permissions.push({
            command: command,
            allowed: "",
            on: [],
            opts: {}
        })
        botContext.setBot({...newPermissions})
        props.onClose(false)
    }
    return (
        <Menu
            elevation={24}
            open={props.open && props.anchor !== null}
            anchorEl={props.anchor}
            onClose={props.onClose}
        >
                {Object.keys(botContext.bot!.config.commands).map((key: string)=>
                    <MenuItem sx={{paddingLeft: '20px',paddingRight: '20px'}} onClick={() => handleAddCommand(key)}>
                        {key[0].toUpperCase() + key.slice(1)}
                    </MenuItem>
                )}
        </Menu>
    )
}
export default AddNewPermissionDialog
