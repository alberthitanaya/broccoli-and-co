// prettier-ignore
import { Button, Dialog, DialogTitle } from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/styles";
import * as React from "react";
import { history } from "../configureStore";

interface Props {
	open: boolean;
	onClose: () => void;
}

const DialogActions = withStyles((theme) => ({
	root: {
		flex: 1,
		justifyContent: "center",
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

export function SuccessDialog(props: Props) {
	const { open, onClose } = props;
	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Movies successfully checked out</DialogTitle>
			<DialogActions>
				<Button
					onClick={() => {
						handleClose();
						history.push("/checkedout");
					}}
					color="secondary"
				>
					View checked out movies
				</Button>
			</DialogActions>
		</Dialog>
	);
}
