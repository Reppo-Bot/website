import {
    Typography,
    Grid
} from '@mui/material'

const NotFound = () => {
    return (
        <Grid container justifyContent="center" sx={{paddingTop: '100px'}}>
            <Grid item xs={12}>
                <Typography sx={{
                    fontSize: '350px',
                    textAlign: 'center'
                }}>
                    404
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={{
                    textAlign: 'center'
                }} variant="h4">
                    Page not found
                </Typography>
            </Grid>
        </Grid>
    )
}

export default NotFound
