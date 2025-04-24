import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: 'red', // Whole grid background
          borderRadius: '30px',
          border: 'none',
        },
        columnHeaders: {
          backgroundColor: '#343434', // Header background
          color: '#ffffff',           // Header text
          fontWeight: 'bold',
          fontSize: '0.95rem',
        },
        columnHeaderTitle: {
          overflow: 'visible',        // Prevent ellipsis on header
        },
        row: {
          '&:hover': {
            backgroundColor: '#f9f9f9', // Row hover
          },
          '&.Mui-selected': {
            backgroundColor: '#e3f2fd !important', // Selected row
          },
        },
        cell: {
          fontSize: '0.9rem',
          color: 'red',
          padding: '10px',
        },
        footerContainer: {
          backgroundColor: '#fafafa',
          borderTop: '1px solid #ddd',
        },
        toolbarContainer: {
          backgroundColor: '#f0f0f0',
          padding: '8px 16px',
        },
        virtualScroller: {
          minHeight: '300px', // Ensures some scroll height
        },
        // Optional: Set checkbox color if using selection
        checkboxInput: {
          color: '#1976d2',
        },
      },
    },
  },
});

export default theme;
