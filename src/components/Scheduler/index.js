// Core
import React, { Component } from 'react';
import { func, array } from 'prop-types';
// import { CSSTransition } from 'react-transition-group';
// import TransitionGroup from 'react-transition-group/TransitionGroup';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Instruments
import Styles from './styles';
import Checkbox from 'theme/assets/Checkbox';

// Components
import Task from 'components/Task';

export default class Scheduler extends Component {

    static defaultProps = { todos: []};

    static propTypes = {
        addTask:     func.isRequired,
        completeAll: func.isRequired,
        todos:       array.isRequired,
    }
    
    state = {
        textValue: '',
        searchValue: '',
    }


    handleChange = (e) => {
        const { value } = e.target;

        this.setState(() => ({
            textValue: value,
        }))      
    };


    handleSubmit = (e) => {
        e.preventDefault();       

        if(this.state.textValue) {
            this.props.addTask(this.state.textValue); 
        }

        this.setState(() => ({
            textValue: '',
        }))
    };

    
    handleKeyPress = (e) => {
        const enterKey = e.key === 'Enter';     
        
        if (enterKey) this.handleSubmit(e);
    };


    handleSearch = (e) => {        
        const { value: searchValue } = e.target;

        searchValue.toLowerCase();

        this.setState( () => ({
            searchValue,
        }))        
    };


    complete = (id) =>
        this.setState(({ todos }) => ({
            todos: todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            }),
        }));


    toggleCompleteAll = () => {
        let { completeAll } = this.props;

        completeAll();
    }

    render () {
        const { textValue, searchValue } = this.state;
        const { todos, changePriority, deleteTask, updateTasks, completed } = this.props;
        const tasksFiltered = todos.filter((todo) => 
            todo.message
                .toLowerCase()
                .includes(searchValue)
                );

        const todoList = tasksFiltered.map(({ id, message, completed, favorite }) => (
            <CSSTransition
                classNames = { {
                    enter:        Styles.todoInStart,
                    enterActive:  Styles.todoInEnd,
                    exit:         Styles.todoOutStart,
                    exitActive:   Styles.todoOutEnd
                } }
                in = { true }
                key = { id }
                timeout = { 500 } >

                <Task
                    complete = { this.complete }
                    completed = { completed }
                    changePriority = { changePriority }
                    deleteTask = { deleteTask }
                    updateTasks = { updateTasks }
                    favorite = { favorite }
                    id = { id }
                    key = { id }
                    message = { message }
                />
            </CSSTransition>
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input 
                            placeholder = 'Поиск' 
                            type = 'search'
                            onChange = { this.handleSearch }
                            onKeyPress = { this.handleKeyPress }
                         />
                    </header>
                    <section>
                        <form 
                            onSubmit = { this.handleSubmit } >
                            <input 
                                placeholder = 'Описание моей новой задачи' 
                                type = 'text' 
                                value = { textValue } 
                                onChange = { this.handleChange } 
                                onKeyPress = { this.handleKeyPress }
                            />
                             <button type = 'submit'>Добавить задачу</button>
                        </form>
                        { todoList.length 
                            ? <ul><TransitionGroup>{ todoList }</TransitionGroup></ul> 
                            : <h1>Hey, time to plan dreams</h1> }
                        
                    </section>
                    <footer>
                        <Checkbox
                            checked = { completed }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this.toggleCompleteAll }
                        />
                        <code>Все задачи выполнены</code>
                    </footer>
                </main>
            </section>
        );
    }
}
