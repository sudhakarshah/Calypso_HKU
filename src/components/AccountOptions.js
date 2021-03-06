import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from "@material-ui/core/styles";


const styles = {
    root: {
        display: 'flex',
    }
};

/**
 * @author utkarsh867
 * The little dropdown for user options
 */
class AccountOptions extends Component {
    state = {
        open: false,
        anchorOrigin: {
            horizontal: 'left',
            vertical: 'bottom',
        },
        targetOrigin: {
            horizontal: 'left',
            vertical: 'top',
        },
        anchorEl: null
    };

    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };


    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    logOut = () => {
        const {logOutHandler} = this.props;
        logOutHandler();
    };

    render(){
        return (
            <div style={styles.root}>
                <Manager>
                    <Target>
                        <div>
                            <button type="button" className="btn btn-outline-dark" onClick={this.handleClick}>Hi, {this.props.params.username}</button>
                        </div>
                    </Target>
                    <Popper
                        placement="bottom-start"
                        eventsEnabled={this.state.open}
                        style={
                            {
                                zIndex: 1000
                            }
                        }
                    >
                        <ClickAwayListener onClickAway={this.handleRequestClose}>
                            <Grow in={this.state.open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                                <Paper>
                                    <MenuList role={"menu"}>
                                        {this.props.params.verifiedUser ? <Link to={'/newproject'}><MenuItem>Start a Project</MenuItem></Link> : null}
                                        <Link to={'/profile'}><MenuItem>My Profile</MenuItem></Link>
                                        <Link to={'/loggedout'}><MenuItem onClick={this.logOut}>Sign out</MenuItem></Link>
                                    </MenuList>
                                </Paper>
                            </Grow>
                        </ClickAwayListener>
                    </Popper>
                </Manager>
            </div>
        );
    }
}

export default withStyles(styles)(AccountOptions);
