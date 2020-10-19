// prettier-ignore
import { Avatar, Button, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Theme } from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { makeStyles, withStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as CartActions from "../actions/cart";
import * as CheckoutActions from "../actions/checkout";
import { RootState } from "../reducers";

interface Props {
	open: boolean;
	onClose: () => void;
	openSuccess: () => void;
}

const DialogActions = withStyles((theme) => ({
	root: {
		flex: 1,
		justifyContent: "center",
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

export function ConfirmCartDialog(props: Props) {
	const { open, onClose } = props;
	const classes = useStyles();
	const cart = useSelector((state: RootState) => state.cart);

	const cartActions = useActions(CartActions);
	const checkoutActions = useActions(CheckoutActions);
	const handleClose = () => {
		onClose();
	};
	const handleCheckout = () => {
		checkoutActions.addToCheckout(cart);
		cartActions.clearCart();
		onClose();
		props.openSuccess();
	};
	const handleClearCart = () => {
		cartActions.clearCart();
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Please confirm checkout of these movies</DialogTitle>
			<List className={classes.root}>
				{cart.map((item) => (
					<ListItem key={item.imdbID} alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt={item.Title} src={item.Poster} />
						</ListItemAvatar>
						<ListItemText
							primary={item.Title}
							secondary={item.Year}
						/>
					</ListItem>
				))}
			</List>
			<DialogActions>
				<Button onClick={() => handleCheckout()} color="secondary">
					Confirm checkout
				</Button>
				<Button onClick={() => handleClearCart()} color="primary">
					Clear cart
				</Button>
			</DialogActions>
		</Dialog>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	textField: {
		width: "80%",
		margin: 20,
	},
	root: {
		width: "100%",
		maxWidth: "36ch",
		backgroundColor: theme.palette.background.paper,
	},
}));
