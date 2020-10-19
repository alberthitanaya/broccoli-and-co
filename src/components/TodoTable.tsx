// prettier-ignore
import { Accordion, AccordionDetails, AccordionSummary, Avatar, List, ListItem, ListItemAvatar, ListItemText, Theme, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { Movie } from "../model";
import { RootState } from "../reducers";

export function TodoTable() {
	const classes = useStyles();
	const checkout = useSelector((state: RootState) => state.checkout);

	return (
		<div className={classes.paper}>
			<List>
				{checkout.map((n: Movie[], index) => {
					return (
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography
									className={classes.heading}
								>{`Checkout #${index + 1}`}</Typography>
							</AccordionSummary>
							<AccordionDetails
								className={classes.accordionDetails}
							>
								{n.map((item) => (
									<ListItem
										key={item.imdbID}
										alignItems="flex-start"
									>
										<ListItemAvatar>
											<Avatar
												alt={item.Title}
												src={item.Poster}
											/>
										</ListItemAvatar>
										<ListItemText
											primary={item.Title}
											secondary={item.Year}
										/>
									</ListItem>
								))}
							</AccordionDetails>
						</Accordion>
					);
				})}
			</List>
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		width: "100%",
		minWidth: 260,
		overflow: "auto",
		maxHeight: "70vh",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	accordionDetails: {
		flexDirection: "column",
	},
}));
