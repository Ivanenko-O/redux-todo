import types from './types';

export default Object.freeze({
    addTask: (msg) => ({
        type:    types.ADD_TASK,
        payload: msg,
    }),
    addTaskSuccess: (msg) => ({
        type:    types.ADD_TASK_SUCCESS,
        payload: msg,
    }),
    addTaskFail: (error) => ({
        type:    types.ADD_TASK,
        payload: error,
        error: true,
    }),

    deleteTask: (id) => ({
        type:    types.DELETE_TASK,
        payload: id,
    }),

    updateTasks: (msg) => ({
        type:    types.UPDATE_TASKS,
        payload: msg,
    }),
})