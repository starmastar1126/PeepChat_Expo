const ADD_TODO = 'TODO/ADD_TODO';
const TOGGLE_TODO = 'TODO/TOGGLE_TODO';
const DELETE_TODO = 'TODO/DELETE_TODO';

const initialState = [];

export default function todo_reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            if (action.todo.id === null) {
                action.todo.id =
                    (state.length > 0
                        ? Math.max.apply(Math, state.map(todo => todo.id))
                        : 0) + 1;
            }
            action.todo.createdAt = Date.now();

            return [...state, action.todo];

        case TOGGLE_TODO:
            return state.map(todo => {
                if (todo.id !== action.todo.id) {
                    return todo;
                }

                return {
                    ...todo,
                    completed: !todo.completed,
                };
            });

        case DELETE_TODO:
            return state.filter(function(todo) {
                return todo.id !== action.todo.id;
            });

        default:
            return state;
    }
}

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo,
    };
}

export function toggleTodo(todo) {
    return {
        type: TOGGLE_TODO,
        todo,
    };
}

export function deleteTodo(todo) {
    return {
        type: DELETE_TODO,
        todo,
    };
}
