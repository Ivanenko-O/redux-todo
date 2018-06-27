import types from 'actions/task/types';
import { List, Map, fromJS } from 'immutable';
import uuid from 'uuid';

import defaultTodos from '../../components/Scheduler/todos';

const compareFavorite = (a, b) => {    
    if(a.favorite && !b.favorite) {
        return -1;
    }

    if(!a.favorite && b.favorite || a.favorite && b.favorite ) {
        return 1;
    }
}

const initialState = List(defaultTodos.todos).sort(compareFavorite);

export default (state = initialState, action) => {

    switch (action.type) {
        case types.ADD_TASK:
            return state.unshift({id: uuid.v4(), message: action.payload}).sort(compareFavorite);

        case types.DELETE_TASK:        
            return state.filter(({id}) => {                       
                return id !== action.payload });

        case types.UPDATE_TASKS:
            return state.update((todos) =>
                todos.filter(({id}) => {
                    return id !== action.payload }));
        
        case types.FAVORITE_TASK:      
            return state.update((todos) => {
                return todos.map((task) => {
                    if (task.id === action.payload.id ){
                        task.favorite = !task.favorite
                    }
                    return task;
               })
            }).sort(compareFavorite);

        case types.COMPLETE_ALL:
            return state.update((todos) => {

                if (!todos.every((task) => task.completed)) {
                    return todos.map((task) => {          
                        task.completed = true;                    
                        return task;
                    }) 
                } else  {
                    return todos.map((task) => {                                     
                        task.completed = false;                    
                        return task; 
                    })
                }
            })

        default:
            return state;
    }
}