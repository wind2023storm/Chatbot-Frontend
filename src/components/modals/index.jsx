import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { VscClose } from "react-icons/vsc";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0),
    width: "536px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
    width: "536px",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          className="!h-6 !w-6 !p-0"
          sx={{
            position: "absolute",
            left: 17,
            top: 18,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <VscClose className=" h-full w-full" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
const SModal = (props) => {
  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        className="!h-[59px] text-center"
        onClose={props.onClose}
      >
        <p className="text-black font-[Inter] text-[16px] leading-normal font-bold">
          {props.headerTitle && props.headerTitle}
        </p>
      </BootstrapDialogTitle>
      <DialogContent dividers>{props.children}</DialogContent>
    </BootstrapDialog>
  );
};

export default SModal;
