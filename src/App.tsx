// prettier-ignore
import { AppBar, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { Theme, useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { Route, Router } from "react-router-dom";
import { history } from "./configureStore";
import { HomePageContainer } from "./pages";
import { withRoot } from "./withRoot";

function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Route exact={true} path="/" component={HomePageContainer} />
			<Route exact={true} path="/home" component={HomePageContainer} />
		</div>
	);
}

function App() {
	const classes = useStyles();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Router history={history}>
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<div className={classes.title}>
								<Typography
									variant="h6"
									color="inherit"
									noWrap={isMobile}
								>
									Broccoli and Co.
								</Typography>
							</div>
						</Toolbar>
					</AppBar>
					<Routes />
					<AppBar position="fixed" color="primary" className={classes.bottomAppBar}>
						<Typography
							variant="caption"
							color="inherit"
							noWrap={isMobile}
							className={classes.footerText}
						>
							Made with ❤️ in Sydney
						</Typography>
						<Typography
							variant="caption"
							color="inherit"
							noWrap={isMobile}
							className={classes.footerText}
						>
							2021 Broccoli and Co. All rights reserved
						</Typography>
					</AppBar>
				</div>
			</div>
		</Router>
	);
}
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		overflow: "hidden",
	},
	appFrame: {
		position: "relative",
		display: "flex",
		width: "100%",
		height: "100%",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	bottomAppBar: {
		top: 'auto',
    	bottom: 0,
	},
	footer: {
		flex: 1,
		textAlign: "center",
		position: "absolute",
		bottom: 0,
		width: "100%",
		paddingVertical: 12,
		flexDirection: 'column',
	},
	footerText: {
		textAlign: 'center',
	},

	content: {
		backgroundColor: theme.palette.background.default,
		width: "100%",
		height: "calc(100% - 56px)",
		marginTop: 56,
		[theme.breakpoints.up("sm")]: {
			height: "calc(100% - 64px)",
			marginTop: 64,
		},
	},
	title: {
		flexGrow: 1,
	},
}));

export default withRoot(App);
