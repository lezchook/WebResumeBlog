import '../BlogBar.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import {red} from "@mui/material/colors";
import axios from "axios";
import React from "react";

export class BlogBar extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        count: 0
    }

    componentDidUpdate() {
        axios.get('http://192.168.1.14:8080/user/like/count/' + this.props.id).then((res) => this.setState({count: res.data}))
    }

    render() {
        return (
            <div className="window bar-post">
                <div>
                    <h2>{this.props.title}</h2>
                    <p>{this.props.title}</p>
                    <div>
                        <button className="LikeButton" onClick={this.props.likePost}>
                            <FavoriteIcon />
                        </button>
                        <h4>Likes count: {this.state.count}</h4>
                    </div>
                    <h3>Author: {this.props.username}</h3>
                    <h3>Date: {this.props.date}</h3>
                </div>
                <button onClick={this.props.deletPost} style={{visibility: this.props.visiDelete}}>
                    <DeleteIcon/>
                </button>
            </div>
        );
    }
}