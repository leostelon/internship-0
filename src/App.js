import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductScreen from "./screens/Product";
import { SmallCard } from "./components/smallCard";
import { Create } from "./screens/create";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/card/:id" element={<ProductScreen />} />
					<Route path="/create" element={<Create />} />
					<Route path="/*" element={<Home />} />
				</Routes>
			</Router>
		</div>
	);
}

const homeStyle = {background: "linear-gradient(to bottom, #ffcc99 0%, #ff99cc 100%)", height:"100vh", display: "flex", flexDirection: "column",alignItems: "center",}

const Home = function () {
	const [cards, setCards] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchData();
	}, []);
	
	const fetchData = async () => {
		const data = await fetch("https://internshipm.herokuapp.com/cards");
		const formattedResponse = await data.json();
		if(formattedResponse.length > 0){
			setCards(formattedResponse);
		}
		setLoading(false);
	}

	return loading ? 
		<h3>loading</h3>:(
		<div style={homeStyle}>
			<h3>
				Upcoming Birthday's🥳
			</h3>
			<div>
				{
					cards.map(card => {
						return (<SmallCard key={card._id} card={card}/>);
					})
				}
			</div>
		</div>
	);
};

export default App;
