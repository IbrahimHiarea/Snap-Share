import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface userType{
    firstName?: string,
    lastName?: string,
    avatar?: string,
    email?: string,
    password?: string
}

interface initialStateType{
    loading: boolean
    isAuthorized: boolean,
    error: string,
    token: string,
    id: number,
    data: userType,
}

const initialState: initialStateType = {
    loading: false,
    isAuthorized: false,
    error: '',
    data: {
        firstName: '',
        lastName: '',
        avatar: '',
        email: '',
        password: '',
    },
    token: '',
    id: 0,
}

export const login = createAsyncThunk('auth/login' , async (user: userType) => {
    return axios
    .post(
        `https://reqres.in/api/register`,
        {
            email: user.email,
            password: user.password
        },
            {
                headers: {
                    'Content-type': 'application/json',
                },
            }
        )
    .then((response) => {
        return response.data;
    })
});

export const userInfo = createAsyncThunk('auth/userInfo' , async (id: number) => {
    return axios
    .get(`https://reqres.in/api/users/${id}`)
    .then((response) => {
        return response.data;
    })
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthorized = true;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.error = '';
        });
        builder.addCase(login.rejected, (state) => {
            state.loading = false;
            state.isAuthorized = false;
            state.token = '';
            state.error = 'Wrong Email !';
        });
        //Info
        builder.addCase(userInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.data.firstName = action.payload.data.first_name;
            state.data.lastName = action.payload.data.last_name;
            state.data.avatar = action.payload.data.avatar;
            state.data.email = action.payload.data.email;
            state.data.password = action.payload.data.password;
            state.isAuthorized = true;
            state.error = '';
        });
        builder.addCase(userInfo.rejected, (state) => {
            state.loading = false;
            state.isAuthorized = false;
            state.token = '';
            state.error = 'User Not Found';
        });
    },
});

export default authSlice.reducer;