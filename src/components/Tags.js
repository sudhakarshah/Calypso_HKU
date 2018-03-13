import React, { Component } from 'react';
import axios from 'axios';
import CheckBox from './CheckBox';
import SearchBar from "./SearchBar";

let tags = ["Computer Science", "Journalism", "Biotech","Mathematics", "Medicine", "Arts","Physics", "Chemistry", "Business"];
let tags_to_display = tags;

class Tags extends Component {
    state = {
        checked: 0,
        search: ""
    };

    componentWillMount(){
        //I need to fetch tags here before the component is loaded
        this.selectedCheckboxes = new Set();
        axios.get('localhost:3000/tags')
            .then(response => {
                console.log(response);
            });
    };

    toggleCheckbox = (label) => {
        if(this.selectedCheckboxes.has(label)){
            this.selectedCheckboxes.delete(label);
            this.setState(({checked})=>(
                {
                    checked: checked-1
                }
            ));
        }
        else{
            this.selectedCheckboxes.add(label);
            this.setState(({checked})=>(
                {
                    checked: checked+1
                }
            ));
        }
        console.log(this.selectedCheckboxes);
    };

    createCheckbox = (label) => (
        <CheckBox
            label={label}
            selected_set = {this.selectedCheckboxes}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
    );

    createCheckboxes = () => (
        tags_to_display.map(this.createCheckbox)
    );

    onSearchTags = (val) =>{
        this.setState({search:val}, () =>{
            //console.log(this.state);
            this.modifyTagsList(this.state.search);
        });

    };

    modifyTagsList = (text) =>{
        //Modify the tags array
        this.setState({search:text});           //This is the jugaad I did not understand
        tags_to_display = [];
        if(text===""){
            tags_to_display = tags;
        }
        else{
            for(let i = 0; i<tags.length; i++){
                if((tags[i].toLowerCase()).indexOf(text.toLowerCase())!==-1){
                    tags_to_display.push(tags[i])
                }
            }
        }
    };


    render() {
        return (
            <div>
                <SearchBar text="Search tags" onSearch={this.onSearchTags} />
                <div className="tags-div">
                    <form>
                        {this.createCheckboxes()}
                    </form>
                </div>
            </div>
        );
    }

}


export default Tags;
