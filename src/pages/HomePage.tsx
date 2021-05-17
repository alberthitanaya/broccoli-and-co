import { yupResolver } from '@hookform/resolvers/yup';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
interface HomePageProps {
    postInvite: (data: InvitePostRequest) => any;
}

interface InvitePostRequest {
	name: string;
	email: string;
}

interface InviteFormData {
	fullname: string;
	email: string;
	emailConfirmation: string;
}

const schema = yup.object().shape({
	fullname: yup.string().required('Full name is required').min(3, 'Minimum 3 characters'),
	email: yup.string().email().required('Email is required'),
	emailConfirmation: yup.string().oneOf([yup.ref('email'), null], 'Emails must match'),
  });

export const HomePage = ({
	postInvite
}: HomePageProps) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [serverError, setServerError] = useState('');
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const { control, handleSubmit, formState:{ errors }, reset } = useForm({
		resolver: yupResolver(schema)
	  });
	const handleClose = () => {
		setOpen(false);
		resetForm();
		setShowSuccessMessage(false);
		setServerError('');
	};
	const onSubmit = async (data: InviteFormData) => {
		const responseJson = await postInvite({
			name: data.fullname,
			email: data.email,
		});
		if (responseJson === 'Registered') {
			resetForm();
			setShowSuccessMessage(true);
		} else if (responseJson?.errorMessage) {
			setServerError(responseJson.errorMessage);
		}
	};
	const resetForm = () => {
		reset({
			fullname: '',
			email: '',
			emailConfirmation: '',
		});
	}
    return (
        <form>
		<div className={classes.root}>
			<div className={classes.video}>
			</div>
			<div className={classes.body}>
			<div className={classes.title}>
			<Typography component="div" variant="h4" >
				<Box fontWeight={500} m={1}>
				A better way to enjoy every day.
				</Box>
			</Typography>
			</div>
			<div className={classes.title}>
			<Typography variant="h6" >
				Be the first to know when we launch.
			</Typography>
			</div>
			<div className={classes.inviteButton}>
				<Button data-testid="request-an-invite" variant="contained" color="primary" onClick={() => setOpen(true)}>
					Request an invite
				</Button>
			</div>
			</div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				{!showSuccessMessage && (
				<>
				<DialogTitle data-testid="invite-title" id="form-dialog-title">Request an invite</DialogTitle>
				<DialogContent>
				<Controller
						name="fullname"
						control={control}
						defaultValue=""
						render={({ field }) => <TextField
						{...field}
						margin="dense"
						data-testid="name"
						placeholder="e.g. John Smith"
						id="name"
						label="Full Name"
						type="text"
						fullWidth
					/>}
				/>
				<Typography variant="caption" color="error">{errors.fullname?.message}</Typography>
				<Controller
					name="email"
					control={control}
					render={({ field }) => <TextField
					{...field}
					margin="dense"
					data-testid="email"
					placeholder="e.g. broccoli@xyz.com"
					id="name"
					label="Email Address"
					type="email"
					fullWidth
					/>}
				/>
				<Typography variant="caption" color="error">{errors.email?.message}</Typography>
				<Controller
					name="emailConfirmation"
					control={control}
					render={({ field }) => <TextField
					{...field}
					margin="dense"
					data-testid="email-confirmation"
					placeholder="Confirm Email Address"
					id="name"
					label="Confirm Email Address"
					type="email"
					fullWidth
					/>}
				/>
				<div className={classes.bottomError}>
					<Typography data-testid="confirmation-error" variant="caption" color="error">{errors.emailConfirmation?.message}</Typography>
					<Typography data-testid="server-error" variant="caption" color="error">{serverError}</Typography>
				</div>
				</DialogContent>
					<DialogActions>
						<Button data-testid="send-invite" onClick={handleSubmit(onSubmit)} color="primary">
							Send
						</Button>

					</DialogActions>
				</>)}
				{showSuccessMessage && (
					<>
						<DialogTitle data-testid="all-done" id="form-dialog-title">All done!</DialogTitle>
						<DialogContent>
					    	<Typography>You will be the first to find out when Broccoli and co. launches</Typography>
						</DialogContent>
						<DialogActions>
						<Button onClick={handleClose} color="primary">
							Ok
						</Button>
						</DialogActions>
					</>
				)}
				</Dialog>
				</div>
				</form>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		height: '100vh',
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'transparent',
	},
	video: {
		zIndex: -1,
		opacity: 0.4,
		position: 'absolute',
		height: '100vh',
		width: '100%',
		backgroundImage: `url(${"https://wallpapercave.com/wp/wp1934179.jpg"})`
	},
	bottomError: {
		display: "flex",
		flexDirection: 'column',
	},
	body: {
		display: "flex",
		flex: 1,
		height: '100%',
		flexDirection: 'column',
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		textAlign: "center",
	},
	inviteButton: {
		marginTop: theme.spacing(4)
	}
}));