// src/redux/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        removeTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        },
        updateTask: (state, action) => {
            const { id, updatedTask } = action.payload; 
            const index = state.findIndex(task => task.id === id); 
            if (index !== -1) {
                state[index] = { ...state[index], ...updatedTask }; 
            }
        },
    },
});

export const { addTask, removeTask, updateTask } = taskSlice.actions; 
export default taskSlice.reducer; 

