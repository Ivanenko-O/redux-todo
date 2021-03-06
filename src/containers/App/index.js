// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import taskActions from '../../actions/task';

// Components
import Scheduler from 'components/Scheduler';

class App extends Component {
    render () {            
        return (<Scheduler 
            addTask = { this.props.actions.addTask } 
            deleteTask = { this.props.actions.deleteTask }
            updateTasks = { this.props.actions.updateTasks }
            changePriority = { this.props.actions.changePriority }
            completeAll = { this.props.actions.completeAll }
            searchTask = { this.props.actions.searchTask }
            todos = { this.props.todos }
        />);
    }
}

const mapStateToProps = (state) => {         
    return ({
        todos: state.tasks.toJS(),
    });
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...taskActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
