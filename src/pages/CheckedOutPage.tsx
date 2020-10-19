import { Button, Grid, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useActions } from "../actions";
import * as CheckoutActions from "../actions/checkout";
import { TodoTable } from "../components";

export function CheckedOutPage() {
	const classes = useStyles();
	const checkoutActions = useActions(CheckoutActions);

	const clearCheckout = () => {
		checkoutActions.clearCheckout();
	};

	return (
		<Grid container className={classes.root}>
			<Grid item xs={6}>
				<Typography variant="h4" gutterBottom>
					Checked out movies
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<div className={classes.buttonContainer}>
					<Button
						className={classes.button}
						variant="contained"
						color="secondary"
						onClick={clearCheckout}
					>
						Clear checkout
					</Button>
				</div>
			</Grid>
			<Grid className={classes.table} item xs={12}>
				<TodoTable />
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: 20,
		[theme.breakpoints.down("md")]: {
			paddingTop: 50,
			paddingLeft: 15,
			paddingRight: 15,
		},
	},
	table: {
		flex: 1,
	},

	buttonContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},

	button: {
		marginBottom: 15,
	},
}));
