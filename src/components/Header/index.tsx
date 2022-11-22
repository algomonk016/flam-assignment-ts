import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, Toolbar, IconButton, MenuItem, Menu } from '@mui/material';
import { More, WidthWideTwoTone } from '@mui/icons-material';
import { WidthInput, WidthInputIconWrapper, StyledInputBase } from './CustomNodes'
import RadioInput from 'components/Header/RadioInput';
import { Radio } from 'components/Header/types';
import { RootState } from 'redux/reducers';

const radios: Radio[] = [
  {
    title: 'Top-Left',
    value: 'tl',
  },
  {
    title: 'Top-Right',
    value: 'tr',
  },
  {
    title: 'Center',
    value: 'c',
  },
  {
    title: 'Bottom-Right',
    value: 'br',
  },
  {
    title: 'Bottom-Left',
    value: 'bl',
  },
]


const Header = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { parentDivRef } = useSelector((state: RootState) => state)

  useEffect(() => {
    console.log('selector', parentDivRef)
  }, [parentDivRef])

  const handleRadioSelect = (option: string) => {
    console.log('option', option)
    // const xr = parentDivRect?.width - 300 - (windowDimensions?.width * 0.115);
    // const yb = parentDivRect?.height - childDivRect?.height + 17;

    // switch(option){
    //   case 'tl':
    //     setModelPosition({x: 0, y: 0})
    //     break;
    //   case 'tr':
    //     setModelPosition({x: xr, y: 0})
    //     break;
    //   case 'c':
    //     setModelPosition({x: xr/2, y: yb/2})
    //     break;
    //   case 'br':
    //     setModelPosition({x: xr, y: yb}) 
    //     break;
    //   case 'bl':
    //     setModelPosition({x: 0, y: yb})
    //     break;
    // }
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {
        radios.map((radio) => {
          return (
            <MenuItem key={`dropdown-${radio.title}`}>
              <RadioInput key={radio.title} radio={radio} onSelectOption={handleRadioSelect} />
            </MenuItem>
          )
        })
      }
    </Menu>
  );

  return (
    <Box component={'div'} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Box component={'div'} sx={{ display: { xs: 'none', md: 'flex' }, width: '550px' }} justifyContent={'space-between'} alignItems={'center'} >
            {
              radios.map((radio) => {
                return (
                  <RadioInput key={radio.title} radio={radio} onSelectOption={handleRadioSelect} />
                )
              })
            }
          </Box>
          <Box component={'div'}  sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <More />
            </IconButton>
          </Box>
          <Box component={'div'}  sx={{ flexGrow: 1 }} />
          <WidthInput>
            <WidthInputIconWrapper>
              <WidthWideTwoTone />
            </WidthInputIconWrapper>
            <StyledInputBase
              placeholder="Width"
              inputProps={{ 'aria-label': 'search' }}
            />
          </WidthInput>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Header;