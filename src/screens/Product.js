import Identicon from "identicon.js";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./product.css";
import logo from "../logo.png";
import logo2 from "../logo2.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faPlus, faShare } from "@fortawesome/free-solid-svg-icons";

const ProductScreen = function () {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [card, setCard] = useState(true);

	useEffect(() => {
		fetchCard(id);
	}, [id]);

	const getDate = (unix) => {
		var newDate = new Date();
		newDate.setTime(unix * 1000);
		const dateString = newDate.toUTCString();
		const splitString = dateString.split(" ");
		const finalDate = splitString[1] + " " + splitString[2];
		return finalDate;
	};

	const fetchCard = async (userId) => {
		try {
			const response = await fetch(`https://internshipm.herokuapp.com/card/${userId}`);
			response.data = await response.json();
			setCard(response.data);
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	return loading ? (
		<div style={{height: "100vh", display: "flex", alignItems:"center", justifyContent: "center", background: "linear-gradient(to bottom, #ffcc99 0%, #ff99cc 100%)"}}>
			<h3 style={{color: "white"}}>loading⏰</h3>
		</div>
	) : (
		<div className="product-screen">
			<div className="product">
				<div className="product-header">
					<div className="product-header-logo">
						<img height="45" src={logo} alt="Logo" />
					</div>
					<div className="product-header-points">
						<FontAwesomeIcon icon={faCoins} color="orange" />
						<span
							style={{ fontWeight: "bold", fontSize: "16px", color: "#2c2c2c" }}
						>
							{" "}
							147
						</span>
					</div>
				</div>

				<div className="product-body">
					<div className="product-body-image">
						<img
							className="ml-2"
							width="250"
							height="250"
							alt="pic"
							src={`data:image/png;base64,${new Identicon(
								"abcdefghijkcdsbco" + card._id,
								720
							).toString()}`}
						/>
					</div>
				</div>

				<div className="product-footer">
					<div
						style={{ fontWeight: "lighter", fontSize: "18px" }}
						className="product-footer-name"
					>
						Name:{" "}
						<span
							style={{
								fontWeight: "bold",
								fontSize: "18px",
								color: "rgb(97, 97, 97)",
							}}
						>
							{card.name},
						</span>
					</div>
					<div
						style={{ fontWeight: "lighter", fontSize: "18px" }}
						className="product-footer-birth"
					>
						Birthday:{" "}
						<span
							style={{
								fontWeight: "bold",
								fontSize: "18px",
								color: "rgb(97, 97, 97)",
							}}
						>
							{getDate(card.birth_date)}
						</span>
					</div>
					<div
						className="product-footer-logo"
						style={{
							display: "flex",
							justifyContent: "center",
							width: "100%",
							padding: "4px",
							paddingTop: "32px",
						}}
					>
						<img height="45" src={logo2} alt="Logo" />
					</div>
				</div>
			</div>
			<div
				className="product-actions"
				style={{ display: "flex", justifyContent: "center" }}
			>
				<div
					className="product-actions-item share"
					style={{
						height: "60px",
						width: "60px",
						margin: "12px",
						borderRadius: "50%",
						backgroundColor: "white",
					}}
					onClick={() => navigator.share({url:window.location.href})}
				>
					<FontAwesomeIcon icon={faShare} color="orange" />
				</div>
				<Link to={`/create`}>
					<div
						className="product-actions-item create"
						style={{
							height: "60px",
							width: "60px",
							margin: "12px",
							borderRadius: "50%",
							backgroundColor: "white",
						}}
					>
						<FontAwesomeIcon icon={faPlus} color="orange" />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default ProductScreen;
