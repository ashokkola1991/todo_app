export const addProduct = payload => ({
    type: 'ADD_PRODUCT',
    payload
});


export const addTask = (id, payload) => ({
    type: 'ADD_TASK',
    id,
    payload
});

export const chnageTaskStatus = (id, taskId, newState) => ({
    type: 'CHANGE_TASK_STATUS',
    id,
    taskId,
    newState
});