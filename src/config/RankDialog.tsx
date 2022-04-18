import {rank} from "./../types"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
    TextField,
    Grid,
} from "@mui/material"
import {useState, useEffect, useContext} from 'react'
import ConfigContext from "./ConfigContext"

const RankDialog = (props: {open: number, selected: rank | null, onClose: () => void}) => {
    const [nameError, setNameError] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [minRep, setMinRep] = useState<string>('')
    const [minRepError, setMinRepError] = useState<string>('')
    const botContext = useContext(ConfigContext)
    const handleSave = () => {
        let errors = 0
        if(!/^[\w]{1,12}$/.test(name)){
            setNameError('Name must be only characters!')
            errors++
        }
        if(!/^-?[\d]{1,5}$/.test(minRep)){
            setMinRepError('Min Rep must be a number!')
            errors++
        }
        if(errors) return
        const rank = {
            name,
            minRep
        }
        if(!botContext.bot) return
        let newRankList = botContext.bot.config.ranks
        if(props.open === -2){
            newRankList.push(rank)
        } else newRankList[props.open] = rank
        botContext.setBot({
            ...botContext.bot,
            config: {
                ...botContext.bot.config,
                ranks: newRankList
            }
        })
        props.onClose()
    }
    useEffect(()=>{
        setNameError('')
    },[name])
    useEffect(()=>{
        setMinRepError('')
    },[minRep])
    useEffect(()=>{
        if(props.selected === null){
            setName('')
            setMinRep('')
            return
        }
        setName(props.selected.name)
        setMinRep(props.selected.minRep.toString())
    },[props.selected])
    return (
        <>
        {props.open === -1 ? (
            <Dialog open={false}/>
            ) : (
            <Dialog
                open={true}
                onClose={() => props.onClose()}
                >
                <DialogTitle>{props.selected !== null ? "Edit" : "Add"} Rank</DialogTitle>
                <DialogContent>
                    <Grid sx={{padding: '5px'}} container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Name"
                                value={name}
                                error={!!nameError}
                                helperText={nameError}
                                onChange={(e) => setName(e.target.value)}
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Min Rep"
                                value={minRep}
                                error={!!minRepError}
                                helperText={minRepError}
                                onChange={(e) => setMinRep(e.target.value)}
                                />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={props.onClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            )}
        </>
    )
}
export default RankDialog
