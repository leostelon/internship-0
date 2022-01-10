import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const Create = () => {
	const navigate = useNavigate();
    const [name, setName] = useState("");
    const [date, setDate] = useState(Date.now());

    const handleSubmit =async (event) => {
        event.preventDefault();
		console.log();
        if(name === "" || date === undefined){
            return alert("Please fill all the fields");
        }
        await fetch("https://internshipm.herokuapp.com/card",{
            method: "POST",
            headers:{
				"Content-Type": "application/json"
            },
            body: JSON.stringify({name, birth_date:Math.round(new Date(date).getTime()/1000)})
        })
		alert(`Card has been created, redirecting to home page`);
        navigate('/');
     }

	return (
		<form onSubmit={handleSubmit} style={{display: 'flex', flexDirection:"column"}}>
			<label>
				Enter your name:
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
            <label>
				Enter your birthdate:
				<input
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
			</label>
			<input type="submit" />
		</form>
	);
};
