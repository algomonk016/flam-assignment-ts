import { Grid, Typography } from "@mui/material";
import { DARK, GithubIcon  } from '../constant'

const Footer = (): JSX.Element => {
  return (
    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'} height={80}  style={{ backgroundColor: DARK, color: 'white' }} >
      <Typography variant="subtitle1" fontSize={'20px'} mr={2} >Github Repo</Typography> <a href={'https://github.com/algomonk016/flam-assignment'} target='_blank' > <img src={GithubIcon} width={'40px'} height = {'40px'} /> </a>
    </Grid>
  )
}

export default Footer;