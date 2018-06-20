// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
// import initialState from './todos';
import Checkbox from 'theme/assets/Checkbox';

// Components
import Task from 'components/Task';


export default class Scheduler extends Component {

    static defaultProps = { todos: []};

    state = {
        textValue: '',
    }

    handleSubmit = (event) => {
        event.preventDefault(); 
        
        this.props.addTask(this.state.textValue);
    }

    handleChange = (e) => {
        const { value } = e.target;

        this.setState(() => ({
            textValue: value,
        }))
    }

    complete = (id) =>
        this.setState(({ todos }) => ({
            todos: todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }

                return todo;
            }),
        }));

    changePriority = (id) =>
        this.setState(({ todos }) => ({
            todos: todos.map((todo) => {
                if (todo.id === id) {
                    todo.important = !todo.important;
                }

                return todo;
            }),
        }));

    completeAll = () =>
        this.setState(({ todos }) => ({
            todso: todos.map((todo) => {
                todo.completed = true;

                return todo;
            }),
        }));

    render () {
        const { textValue } = this.state;
        const { todos } = this.props;
        const allCompleted = todos.every((todo) => todo.completed);
        console.log(this.props);
        console.log(todos);
        
        const todoList = todos.map(({ id, message, completed, favorite }) => (
            <Task
                changePriority = { this.changePriority }
                complete = { this.complete }
                completed = { completed }
                favorite = { favorite }
                id = { id }
                key = { id }
                message = { message }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>
                    <section>
                        <form onSubmit = { this.handleSubmit }>
                            <input onChange = { this.handleChange } placeholder = 'Описание моей новой задачи' type = 'text' value = { textValue } />
                            <button>Добавить задачу</button>
                        </form>
                        <ul>{todoList}</ul>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { allCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this.completeAll }
                        />
                        <code>Все задачи выполнены</code>
                    </footer>
                </main>
            </section>
        );
    }
}
