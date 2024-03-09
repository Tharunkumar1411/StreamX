import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  Button,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { removeFavourites } from "../../store/actions/homeAction";
import { useDispatch } from "react-redux";

export default forwardRef(function ConfirmDeletePopup(props, ref) {
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // Changed to null

  const dispatch = useDispatch();

  const closeDialog = () => {
    setOpen(false);
    setUserToDelete(null); // Reset userToDelete
  };

  const openDialog = (user) => {
    setUserToDelete(user);
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    openDialog,
  }));

  const handleDelete = () => {
    if (userToDelete) {
      dispatch(removeFavourites(userToDelete));
    }
    closeDialog(); // Close dialog after delete
  };

  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={closeDialog}>
      <DialogTitle>Remove Favourites </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove{" "}
          <strong>{userToDelete?.title}</strong> from your favourites
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="info">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error">
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
});
