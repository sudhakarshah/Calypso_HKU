import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import SignUpBox from '../components/SignUpBox';

/**
 * @author utkarsh867
 * The Sign up page
 */
class SignUp extends Component{

    state = {
        success: false,
        reason: "",
        redirect: false
    };

    componentWillMount(){
        const sessionInfo = JSON.parse(sessionStorage.getItem('sessionAccount'));
        if(sessionInfo!==null && sessionInfo.fullName){
            this.setState({
                redirect: true
            });
        }
        else{
            this.setState({
                redirect: false
            });
        }
    }

    /**
     * When the user taps the signup button
     * @param data JSON object that contains the input fields of signup box
     */
    handleSubmit = (data) =>{
        this.requestSignUp(data);
    };

    /**
     * Sends sign up request to the server
     * @param data JSON object of sign up box
     * @returns {Promise<void>}
     */
    requestSignUp = async(data) => {
        try{
            const response = await axios.post('/api/signup',{
                "emailId": data.username,
                "password": data.password,
                "fullName": data.fullName
            }, {withCredentials: true});

            this.setState({
                success: response.data.success,
                reason: response.data.reason
            });

        }

        catch(e){
            console.log(e);
        }
    };

    render(){
        if(this.state.success){
            return (<Redirect to={'/login'}/>);
        }
        else if(this.state.redirect){
            return (<Redirect to={'/'}/>);
        }
        return(
            <div className={'container-fluid'}>
                <div className={'row vertical-center'}>
                    <div className={'jumbotron loginDialog col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1'}>
                        <div>
                            <h1><Link to={"/"} className={"logo"}>Calypso</Link></h1>
                        </div>
                        <hr className={'my-4'}/>
                        {(!this.state.success) && this.state.reason==="exists" ? <div>User already exists</div> : null}
                        <SignUpBox submitHandler={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default SignUp;
