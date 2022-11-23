import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Box, Toolbar, IconButton, MenuItem, Menu } from '@mui/material';
import { More, WidthWideTwoTone } from '@mui/icons-material';
import { WidthInput, WidthInputIconWrapper, StyledInputBase } from './CustomNodes'
import RadioInput from 'components/Header/RadioInput';
import { Radio, HeaderProps } from 'components/Header/types';
import { RootState } from 'redux/reducers';
import { DARK } from 'constant';
import Timer from 'components/Timer';

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

const Header = (props: HeaderProps): JSX.Element => {
  const { setModelPosition, modelSize, setModelSize } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { parentDivRef, childDivRef } = useSelector((state: RootState) => state)

  useEffect(() => {
    if(parentDivRef.right <= childDivRef.right && parentDivRef.right != 0 ){
      handleRadioSelect('tr');
    }
    // if(parentDivRef.bottom <= childDivRef.bottom){
    //   handleRadioSelect('bl');
    // }
    }, [parentDivRef, childDivRef])

  const handleRadioSelect = (option: string): void => {
    const xr = parentDivRef.right - modelSize * 1.11;
    const yb = parentDivRef.bottom - (modelSize * 1.365);

    switch (option) {
      case 'tl':
        setModelPosition({ x: 0, y: 0 })
        break;
      case 'tr':
        setModelPosition({ x: xr, y: 0 })
        break;
      case 'c':
        setModelPosition({ x: xr / 2, y: yb / 2 })
        break;
      case 'br':
        setModelPosition({ x: xr, y: yb })
        break;
      case 'bl':
        setModelPosition({ x: 0, y: yb })
        break;
    }
  }

  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleModelSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    let newSize: number = Number(event.target.value);
    if(newSize === 0){
      newSize = 250;
    } else if(newSize < 100){
      newSize = 100;
      alert('model size should be atleast 100px')
    } else if(newSize >= Math.min(parentDivRef.height, parentDivRef.width)){
      newSize = 250;
      alert('model size should be less than parent div')
    }

    setModelSize(newSize);
  }

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
            <div key={`dropdown-${radio.title}`}>
              <RadioInput radio={radio} onSelectOption={handleRadioSelect} />
            </div>
          )
        })
      }
    </Menu>
  );

  return (
    <Box component={'div'} sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: DARK}} >
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
          <Box component={'div'} sx={{ display: { xs: 'flex', md: 'none' } }}>
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
          <Box component={'div'} sx={{ flexGrow: 1 }} />
          <WidthInput>
            <WidthInputIconWrapper>
              <WidthWideTwoTone />
            </WidthInputIconWrapper>
            <StyledInputBase
              type='number'
              onBlur={handleModelSizeChange}
              placeholder="Width"
              inputProps={{ 'aria-label': 'new width' }}
            />
          </WidthInput>
          <Timer initialSeconds={0} initialHours={24} initialMinutes={0} />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Header;