
import posed from 'react-pose';


export const Drawer = posed.div({
  closed: { 
    height: 0,
    transition: {
      duration: 200,
      ease: 'circOut'
    } 
  },
  open: { 
    height: 'auto',
    transition: {
      duration: 330,
      ease: 'circOut'
    }
  }
});