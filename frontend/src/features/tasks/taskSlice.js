import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await api.get('/tasks');
    return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (title) => {
    const response = await api.post('/tasks', { title });
    return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updates }) => {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    await api.delete(`/tasks/${id}`);
    return id;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add
            .addCase(addTask.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.items.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Delete
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter((task) => task.id !== action.payload);
            });
    },
});

export default taskSlice.reducer;
