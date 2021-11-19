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
        count: 0,
        clicked: 'fals',
        color: 'orange'
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
        for(let i = 1; i<=10; i = i + 1) {
            axios.get('http://192.168.1.33:8080/user/like/inform/' + this.props.id).then((res) => {
                this.setState({clicked: res.data});
            }).finally(res => {
                    if (this.state.clicked === 'tru') {
                        this.setState({color: 'crimson'});
                    }
                }
            );
            axios.get('http://192.168.1.33:8080/user/like/count/' + this.props.id).then((res) => {
                this.setState({count: res.data});
            });
        }
    }

    onPress1 = () => {
        this.props.likePost();
        for (let i = 1; i<=30; i = i + 1) {
            axios.get('http://192.168.1.33:8080/user/like/count/' + this.props.id).then((res) => {
                this.setState({count: res.data});
            });
        }
        this.setState({clicked: 'tru'});
        this.setState({color: 'crimson'});
    }

    onPress2 = () => {
        axios.delete('http://192.168.1.33:8080/user/like/delete/' + this.props.id)
        this.setState({color: 'orange'});
        for (let i = 1; i<=30; i = i + 1) {
            axios.get('http://192.168.1.33:8080/user/like/count/' + this.props.id).then((res) => {
                this.setState({count: res.data});
            });
        }
        this.setState({clicked: 'fals'});
    }

    onPress = () => {
        if (this.state.clicked === 'fals') this.onPress1();
        else if (this.state.clicked === 'tru') this.onPress2();
    }


    render() {
        return (
            <div className="window bar-post">
                <div>
                    <h2>{this.props.title}</h2>
                    <p>{this.props.description}</p>
                    <div>
                        <button className="LikeButton" onClick={this.onPress}>
                            <FavoriteIcon style={{fill: this.state.color}} />
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