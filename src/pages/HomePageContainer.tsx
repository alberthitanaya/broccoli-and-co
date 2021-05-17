import React from "react";
import { HomePage } from './HomePage';

interface InvitePostRequest {
	name: string;
	email: string;
}

export function HomePageContainer() {
	const postInvite = async (data: InvitePostRequest) => {
		const response = await fetch(
			`https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth`,
			{
				method: "POST",
				body: JSON.stringify(data)
			}
		);
		return await response.json();
	};

	return (
		<HomePage 
		postInvite={postInvite}
		/>
	);
}
