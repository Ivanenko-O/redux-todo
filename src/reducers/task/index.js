import types from 'actions/task/types';
import { List, Map } from 'immutable';
import uuid from 'uuid';

import defaultTodos from '../../components/Scheduler/todos';

console.log(defaultTodos.todos);
const initialState = List(defaultTodos.todos);

export default (state = initialState, action) => {

    switch (action.type) {
        case types.ADD_TASK:
            console.log(action.payload);
            return state.push(Map({id: uuid.v4(), message: action.payload}));

        case types.DELETE_TASK:
            return state.delete(action.payload);

        default:
            return state;
    }
}