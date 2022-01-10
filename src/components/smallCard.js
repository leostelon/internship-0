import "./smallCard.css";
import Identicon from 'identicon.js';
import { Link } from "react-router-dom";

export const SmallCard = function ({card}) {
    var newDate = new Date();
    newDate.setTime(card.birth_date*1000);
    const dateString = newDate.toUTCString();
    const splitString = dateString.split(" ");
    const finalDate = splitString[1]+ " " + splitString[2];

	return (
        <Link to={`/card/${card._id}`} className="link">
            <div  className="smallCard">
                <img
                    className='ml-2'
                    width='30'
                    height='30'
                    alt='Card'
                    src={`data:image/png;base64,${new Identicon("abcdefghijk"+card._id, 30).toString()}`}
                />
                <p>{card.name}, {finalDate}</p>
            </div>
        </Link>
	);
};