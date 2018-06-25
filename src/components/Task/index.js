// Core
import React, { Component } from 'react';
import { func, string, bool } from 'prop-types';
import cx from 'classnames';

// Instruments
import Styles from './styles';
import Checkbox from 'theme/assets/Checkbox';
import Delete from 'theme/assets/Delete';
import Edit from 'theme/assets/Edit';
import Star from 'theme/assets/Star';

export default class Task extends Component {

    static propTypes = {
        changePriority: func.isRequired,
        deleteTask:     func.isRequired,
        updateTasks:    func.isRequired,
        id:             string.isRequired,
        message:        string.isRequired,
        favorite:       bool.isRequired,
    }


    state = {
        editing: false,
        favorite: false,
        message: this.props.message,
    }


    handleDelete = () => {
        const { id, deleteTask } = this.props;
               
        deleteTask(id);
    }


    handleChange = (value) => {
        this.setState(() => ({
            message: value,
        }))
    }


    handleEdit = () => {        
        const { id, message: prevMessage, updateTasks } = this.props;
        const { editing, message } = this.state;

        this.setState({
            editing: true,
        })
        
        if (editing) {
            if(message === '' || message.length > 47 || message.trim() === '' || message.trim() === prevMessage) {
                
                this.setState({
                    editing: !editing,
                    message:  prevMessage,
                });

                return;
            }
             updateTasks( [{
                    id, 
                    message,
                }] );
        }
        this.setState({
            editing: !editing,
        });
    }


    handleKeyPress = (key) => {
        if (key === 'Enter') {
            this.handleEdit();
        }
    }


    complete = () => {
        const { id, complete } = this.props;
        
        complete(id);
    };


    changePriority = () => {
        const { id, favorite, changePriority } = this.props;
  
        changePriority( {
            id,
            favorite,
        })
    };


    render () {
        const { completed, favorite } = this.props;        
        const { message, editing } = this.state;
        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
           
        });

        return (
            <li className = { styles } >
                <div>
                    <Checkbox
                        checked = { completed }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this.complete }
                    />
                    <code>
                        { editing ? 
                            <input
                                type = 'text'
                                value = { message }
                                onChange = { (event) => this.handleChange(event.target.value) }
                                onKeyPress = { (event) => this.handleKeyPress(event.key)}                                   
                            />
                            : message }
                    </code>
                </div>
                <div>
                    <Star
                        favorite = { favorite }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.changePriority }
                    />
                    <Edit 
                        color1 = '#3B8EF3' 
                        color2 = '#000' 
                        onClick = { this.handleEdit } 
                        editing = { editing }
                    />
                    <Delete 
                        color1 = '#3B8EF3' 
                        color2 = '#000'  
                        onClick = { this.handleDelete } 
                    />
                </div>
            </li>
        );
    }
}
