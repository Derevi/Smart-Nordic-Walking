import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import BluetoothDisabledIcon from '@mui/icons-material/BluetoothDisabled';
import { ThemeProvider, createTheme } from "@mui/material/styles";



export const StatusCard = (props) => (
  <Card
    sx={{ height: '100%',backgroundColor: "white" }}
    {...props}
  >
    <CardContent>
      {/* <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            BUDGET
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            $24k
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid> */}
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <BluetoothDisabledIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          Bluetooth Not connected
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          sensor data cannot be displayed untill device is connected 
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
