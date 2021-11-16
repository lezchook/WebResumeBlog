import '../BlogBar.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import {red} from "@mui/material/colors";
import axios from "axios";
import React from "react";
let a = 0;
export class BlogBar extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        count: 0,
        clicked: 'false'
    }

    componentDidUpdate() {
        axios.get('http://192.168.1.33:8080/user/like/count/' + this.props.id).then((res) => this.setState({count: res.data})).then((re) => {
            if (a !== 10) {
                axios.get('http://192.168.1.33:8080/user/like/inform/' + this.props.id).then((res) => this.setState({clicked: res.data}));
                a = a + 1;
            }
        });
    }


    render() {
        return (
            <div className="window bar-post">
                <div>
                    <h2>{this.props.title}</h2>
                    <p>{this.props.description}</p>
                    <div>
                        <button className="LikeButton" onClick={this.props.likePost}>
                            <FavoriteIcon />
                        </button>
                        <h4>Likes count: {this.state.count}</h4>
                    </div>
                    <h3>Author: {this.props.username}</h3>
                    <h3>Date: {this.props.date}</h3>
                    <h3>{this.state.clicked}</h3>
                </div>
                <button onClick={this.props.deletPost} style={{visibility: this.props.visiDelete}}>
                    <DeleteIcon/>
                </button>
            </div>
        );
    }
}