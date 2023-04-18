import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BluetoothSearchingIcon from '@mui/icons-material/BluetoothSearching';
import { Container, Menu, MenuItem, Tooltip, Button  } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
// import Tooltip from '@mui/material/Tooltip';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Image from 'next/image';
const drawerWidth = 240;
const topBarHeight=80;
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#112235',
    },
    secondary: {
      main: '#0b5394',
    },
    background: {
      default: '#ffffff',
      paper: '#172e48',
    },
  },
});

export default function SideBar(props) {
  const { window, children,Component, pageProps, currentUser, } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  // const connectLeftSideBluetooth = async () =>{
  //   await navigator.bluetooth.requestDevice({
  //     filters:[{
  //       services:['cf69d05e-dd02-11ed-afa1-0242ac120002' ]
  //     } ]
  //   })
  // }

  async function connectLeftSideBluetooth() {

    // const device = await navigator.bluetooth.requestDevice({ acceptAllDevices:true})
    const device = await navigator.bluetooth.requestDevice({filters: [{services: ['51ad213f-e568-4e35-84e4-67af89c79ef0']}]})
    const server = await device.gatt.connect()
    const service = await server.getPrimaryService('51ad213f-e568-4e35-84e4-67af89c79ef0')
    const char = await service.getCharacteristic('528ff74b-fdb8-444c-9c64-3dd5da4135ae')
    await char.addEventListener('characteristicvaluechanged', handleChangedValue)
    await char.startNotifications()
    console.log("the name of the device is: "+device) //BluetoothDevice
    console.log('Getting server... '+server) //BluetoothRemoteGATTServer
    console.log('Getting service... '+service) //BluetoothRemoteGATTService
    console.log('Getting char... '+char) //BluetoothRemoteGATTCharacteristic
  }
  const connectRightSideBluetooth = async () =>{
    await navigator.bluetooth.requestDevice({
      filters:[{
        services:['cf69d05e-dd02-11ed-afa1-0242ac120002' ]
      } ]
    })
  }

  // if currentUser then show all options
  // else if currentUser not connected prompt login/sighnup

  const drawer = (
    <div>
      {/* MY LOGO
      {currentUser.login} */}

          <Box sx={{ p: 3 }}

          >
            {/* <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />

              </a>

            </NextLink> */}
            <Container

                   >
                                <Container
                   alignItems="center"
                   justifyContent="center"
                   >
            <Image
            src="/logo_color.png"
            alt="Logo"
            />
            </Container>
            </Container>
            
            {/* <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nordic Walking
          </Typography> */}
          </Box>

      
      <List>
      <ListItem key="DashBoard" >
      <Tooltip title="Page not visible until both sides of nordic walking pole devices are connected via bluetooth">
            <ListItemButton   sx={{
    ":hover": {
      bgcolor: "#1f3a5a"
    }
  }}>
              <NordicWalkingIcon color="disabled" />
              <ListItemText sx={{ pl: 1 }} primary="DashBoard" color="disabled"  />
            </ListItemButton >
            </Tooltip>
          </ListItem>
          <ListItem key="Heart" >
          <Tooltip title="Page not visible until both sides of nordic walking pole devices are connected via bluetooth">

            <ListItemButton sx={{
    ":hover": {
      bgcolor: "#1f3a5a"
    }
  }}>
              <FavoriteBorderIcon color="disabled" />
              <ListItemText sx={{ pl: 1 }} primary="Heart" color="disabled" />
            </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem key="Position" >
          <Tooltip title="Page not visible until both sides of nordic walking pole devices are connected via bluetooth">

            <ListItemButton sx={{
    ":hover": {
      bgcolor: "#1f3a5a"
    }
  }}>
              <ThreeSixtyIcon color="disabled" />
              <ListItemText sx={{ pl: 1 }} primary="Position" color="disabled"  />
            </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem key="Force"  >
          <Tooltip title="Page not visible until both sides of nordic walking pole devices are connected via bluetooth">
            <ListItemButton sx={{
    ":hover": {
      bgcolor: "#1f3a5a"
    }
  }}>
              <FitnessCenterIcon color="disabled" />
              <ListItemText sx={{ pl: 1 }} primary="Force" color="disabled" />
            </ListItemButton>
            </Tooltip>
          </ListItem>
          
        {/* {['DashBoard', 'Heart Rate', 'Position', 'Force' ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            
          </Typography> */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Nordic Walking
          </Typography>
          <div>
          <Tooltip title="Connect to the left side of the walking pole, will only scan for comptible devices">

          <Button onClick={connectLeftSideBluetooth} sx={{color:"white",textTransform: "none",":hover": {
      bgcolor: "#182e46"
    } }}>          <Typography variant="subtitle1" >
                          
          Connect Left Pole</Typography><BluetoothSearchingIcon  /></Button></Tooltip>
          <Tooltip title="Connect to the left side of the walking pole, will only scan for comptible devices">

<Button onClick={connectLeftSideBluetooth} sx={{color:"white",textTransform: "none",":hover": {
bgcolor: "#182e46"
} }}>          <Typography variant="subtitle1" >
                
Connect Left Pole</Typography><BluetoothSearchingIcon  /></Button></Tooltip>
          {/* <Tooltip title="Connect to the left side of the walking pole, will only scan for comptible devices">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={connectLeftSideBluetooth}
                color="inherit"
                sx={{
                  ":hover": {
                    bgcolor: "white"
                  }
                }}
              >
          <Typography variant="subtitle1" >
                          Connect Left Pole
          </Typography>
                <BluetoothSearchingIcon/>
                
              </IconButton>
              </Tooltip>

              <Tooltip title="Connect to the right side of the walking pole, will only scan for comptible devices"></Tooltip>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={connectRightSideBluetooth}
                color="inherit"
              >
              <Typography variant="subtitle1" >
                          Connect Right Pole
          </Typography>
          <BluetoothSearchingIcon  />
          
              </IconButton> */}
              {/* </Tooltip> */}
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu> */}
            </div>



        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },pt: `${topBarHeight}px` }}
      >
        {/* <Component currentUser={currentUser} {...pageProps}/> */}
        {children}
      </Box>
    </Box>
    </ThemeProvider>
  );
}



// export default SideBar;