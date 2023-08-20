import { makeStyles } from '@mui/styles';

//custom CSS rule for the scrollbar
export const useStylesUtility = makeStyles({
    paper: {
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: '2px',
      },
    },
  });