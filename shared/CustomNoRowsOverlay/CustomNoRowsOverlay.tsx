import { Box, Typography } from "@mui/material";
import styles from './CustomNoRowsOverlay.module.scss'
const CustomNoRowsOverlay = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          backgroundColor: '#f5f5f5', // Optional styling
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No data available
        </Typography>
      </Box>
    );
  };

  export default CustomNoRowsOverlay