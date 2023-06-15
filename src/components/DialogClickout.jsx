import Dialog from '@mui/material/Dialog';

export default function DialogClickout({open,children, handleClose}) { 

  return (
    <div className='dialogOut'>
      <Dialog 
        open={open}
      // maxWidth='xl'
      className="dialog"
        onClose={handleClose}>

        {children}
       
      </Dialog>
    </div>
  );
}