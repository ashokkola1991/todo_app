const products = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PRODUCT': {
            return [
                ...state,
                action.payload
            ]
        }
        case 'ADD_TASK': {
            const newData = state.map(item => {
                if (item.id === action.id) {
                    item.tasks = [
                        ...item.tasks,
                        action.payload
                    ]
                }
                return item
            })
            return [
                ...newData,
            ]
        }
        case 'CHANGE_TASK_STATUS': {
            const newData = state.map(item => {
                if (item.id === action.id) {
                    item.tasks =  item.tasks.map(task => {
                        if(task.id === action.taskId) {
                            task.state = action.newState;
                        }
                        return task
                    })
                }
                return item
            })
            return [
                ...newData,
            ]
        }
        default:
            return state
    }
}

export default products;