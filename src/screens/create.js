import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const Create = () => {
	const navigate = useNavigate();
    const [name, setName] = useState("");
    const [date, setDate] = useState(undefined);

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
		<div style={{padding:"16px",display: "flex",alignItems: "center", justifyContent: "center"}}>
			<form onSubmit={handleSubmit} style={{display: 'flex', flexDirection:"column"}}>
				<div style={{padding:"16px",display: "flex",alignItems: "flex-start", flexDirection:"column",justifyContent: "center"}}>
					<label>
						Enter your name:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
					<br/>
					<label>
						Enter your birthdate:
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</label>
				</div>
				<input style={{margin:"16px", padding:"8px"}} type="submit" />
			</form>
		</div>
	);
};
