import types from 'actions/task/types';
import { List } from 'immutable';
import uuid from 'uuid';

import defaultTodos from '../../components/Scheduler/todos';

const initialState = List(defaultTodos.todos);

export default (state = initialState, action) => {

    switch (action.type) {
        case types.ADD_TASK:
            return state.unshift({id: uuid.v4(), message: action.payload});

        case types.DELETE_TASK:        
            return state.filter(({id}) => {                       
                return id !== action.payload });

        case types.UPDATE_TASKS:
            return state.filter(({id}) => {
                return id !== action.payload });

        default:
            return state;
    }
}