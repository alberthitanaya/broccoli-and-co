// prettier-ignore
import { AppBar, Badge, Divider, Drawer as DrawerMui, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { Theme, useTheme } from "@material-ui/core/styles";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Router } from "react-router-dom";
import { ConfirmCartDialog } from "./components";
import { SuccessDialog } from "./components/SuccessDialog";
import { history } from "./configureStore";
import { Movie } from "./model";
import { CheckedOutPage, HomePage } from "./pages";
import { RootState } from "./reducers/index";
import { withRoot } from "./withRoot";

function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Route exact={true} path="/" component={HomePage} />
			<Route exact={true} path="/home" component={HomePage} />
			<Route exact={true} path="/checkedout" component={CheckedOutPage} />
		</div>
	);
}

function Drawer(props: { checkoutList: Movie[][] }) {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.drawerHeader} />
			<Divider />
			<List>
				<ListItem button onClick={() => history.push("/")}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button onClick={() => history.push("/checkedout")}>
					<ListItemIcon>
						<TodoIcon checkoutList={props.checkoutList} />
					</ListItemIcon>
					<ListItemText primary="Checked out movies" />
				</ListItem>
			</List>
		</div>
	);
}

function App() {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(true);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
	const cart = useSelector((state: RootState) => state.cart);
	const checkout = useSelector((state: RootState) => state.checkout);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Router history={history}>
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
								className={classes.navIconHide}
							>
								<MenuIcon />
							</IconButton>
							<div className={classes.title}>
								<Typography
									variant="h6"
									color="inherit"
									noWrap={isMobile}
								>
									OMdb checkout
								</Typography>
							</div>
							<IconButton
								aria-label="show cart"
								aria-haspopup="true"
								onClick={() => setOpenDialog(true)}
								color="inherit"
								disabled={cart.length === 0}
							>
								<Badge
									badgeContent={cart.length}
									color="secondary"
								>
									<ShoppingCartIcon />
								</Badge>
							</IconButton>
						</Toolbar>
					</AppBar>
					<Hidden mdUp>
						<DrawerMui
							variant="temporary"
							anchor={"left"}
							open={mobileOpen}
							classes={{
								paper: classes.drawerPaper,
							}}
							onClose={handleDrawerToggle}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							<Drawer checkoutList={checkout} />
						</DrawerMui>
					</Hidden>
					<Hidden smDown>
						<DrawerMui
							variant="permanent"
							open
							classes={{
								paper: classes.drawerPaper,
							}}
						>
							<Drawer checkoutList={checkout} />
						</DrawerMui>
					</Hidden>
					<ConfirmCartDialog
						open={openDialog}
						openSuccess={() => setOpenSuccessDialog(true)}
						onClose={() => {
							setOpenDialog(false);
						}}
					/>
					<SuccessDialog
						open={openSuccessDialog}
						onClose={() => setOpenSuccessDialog(false)}
					></SuccessDialog>
					<Routes />
				</div>
			</div>
		</Router>
	);
}

function TodoIcon(props: { checkoutList: Movie[][] }) {
	if (props.checkoutList && props.checkoutList.length > 0) {
		return (
			<Badge color="secondary" badgeContent={props.checkoutList.length}>
				<FormatListNumberedIcon />
			</Badge>
		);
	} else {
		return <FormatListNumberedIcon />;
	}
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
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
		position: "absolute",
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: 250,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			position: "relative",
			height: "100%",
		},
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
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

export default withRoot(App);
