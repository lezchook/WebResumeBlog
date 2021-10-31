import '../BlogBar.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import {red} from "@mui/material/colors";

export const BlogBar = ({title, description, liked, likePost, deletPost, username, visiDelete}) => {

    const heartFill = liked ? 'crimson' : 'black';

    return (
        <div className="window bar-post">
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <div>
                    <button className="LikeButton" onClick={likePost}>
                        <FavoriteIcon style={{fill: heartFill}} />
                    </button>
                </div>
                <h3>Author: {username}</h3>
            </div>
            <button onClick={deletPost} style={{visibility: visiDelete}}>
                <DeleteIcon />
            </button>
        </div>
    )
}