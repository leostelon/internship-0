import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { constants } from "../constants";

const UserScreen = () => {
	const { id } = useParams();
	const [response, setResponse] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchItems(id);
	}, [id]);

	const fetchItems = async (userid) => {
		try {
			const response = await fetch(`${constants.url}/items/user/${userid}`);
			response.data = await response.json();
			console.log(response.data);
			setResponse(response);
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	return loading ? (
		<h3>loading</h3>
	) : response.status !== 200 ? (
		<p>error</p>
	) : (
		<p>{response.data[0].user_id}</p>
	);
};

export default UserScreen;
