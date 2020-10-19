import {
	Button,
	GridListTile,
	GridListTileBar,
	IconButton,
	Snackbar,
} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import InputBase from "@material-ui/core/InputBase";
import { fade, Theme } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useActions } from "../actions";
import * as CartActions from "../actions/cart";
import { Movie } from "../model";

export function HomePage() {
	const classes = useStyles();
	const [searchTerm, setSearchTerm] = useState("");
	const [movieResults, setMovieResults] = useState([]);
	const [selectedMovies, setSelectedMovies] = useState<any>({});
	const cartActions = useActions(CartActions);

	const handleClose = () => {};
	const fetchMovies = async () => {
		const results = await fetch(
			`https://www.omdbapi.com/?apikey=36bc2c5&s=${encodeURI(
				searchTerm
			)}`,
			{
				method: "GET",
			}
		);
		const jsonResults = await results.json();
		setMovieResults(jsonResults.Search);
	};

	useEffect(() => {
		fetchMovies();
	}, [searchTerm]);

	let selectedMovieCount = 0;
	Object.keys(selectedMovies).forEach((movie: any) => {
		if (selectedMovies[movie] !== undefined) {
			selectedMovieCount += 1;
		}
	});

	return (
		<div className={classes.root}>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder="Type to start searching…"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					onChange={(event) => {
						setSearchTerm(event.currentTarget.value);
					}}
					inputProps={{ "aria-label": "search" }}
				/>
			</div>
			<GridList
				cellHeight={300}
				spacing={30}
				className={classes.gridList}
			>
				{!!movieResults &&
					movieResults.map((tile: any) => (
						<GridListTile
							key={tile.imdbID}
							className={
								selectedMovies[tile.imdbID] === undefined
									? classes.imageContainer
									: classes.selectedImageContainer
							}
							onClick={() => {
								if (selectedMovies[tile.imdbID]) {
									setSelectedMovies({
										...selectedMovies,
										[tile.imdbID]: undefined,
									});
								} else {
									setSelectedMovies({
										...selectedMovies,
										[tile.imdbID]: tile,
									});
								}
							}}
						>
							<img
								className={classes.selectedGrid}
								src={tile.Poster}
								alt={tile.Title}
							/>

							<GridListTileBar
								title={tile.Title}
								actionIcon={
									<IconButton
										aria-label={`info about ${tile.Title}`}
										className={classes.icon}
									>
										<InfoIcon />
									</IconButton>
								}
							/>
						</GridListTile>
					))}
			</GridList>
			<Snackbar
				open={selectedMovieCount > 0}
				autoHideDuration={6000}
				onClose={handleClose}
				message={`You have selected ${selectedMovieCount} movies.`}
				action={
					<Button
						color="secondary"
						size="small"
						onClick={() => {
							let selectedMovieArray: Movie[] = [];
							Object.keys(selectedMovies).forEach(
								(key: string) => {
									if (selectedMovies[key] !== undefined) {
										selectedMovieArray.push(
											selectedMovies[key]
										);
										setSelectedMovies([]);
									}
								}
							);
							cartActions.addToCart(selectedMovieArray);
						}}
					>
						Add to cart
					</Button>
				}
			></Snackbar>
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	},
	imageContainer: {
		"&:hover": {
			opacity: 0.5,
			border: "5px solid blue;",
		},
	},
	selectedImageContainer: {
		border: `5px solid ${theme.palette.success.main};`,
	},
	selectedGrid: {},
	gridList: {
		width: 1000,
		height: "90vh",
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		marginBottom: 12,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
	inputRoot: {
		color: "inherit",
	},
	button: {
		marginTop: 20,
	},
}));
