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

    changePriority: (task) => ({
        type:    types.FAVORITE_TASK,
        payload: task,
    }),
    completeAll: (tasks) => ({
        type:     types.COMPLETE_ALL,
        payload:  tasks,
    })
})