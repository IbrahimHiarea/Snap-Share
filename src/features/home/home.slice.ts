import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface postType{
    id?: number,
    username?: string,
    email?: string,
    avatar?: string,
    title?: string,
    postImage?: string,
    likes?: number,
    comments?: number
}

export interface profileType{
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    address?: string,
    image?: string,
    phone?: string,
    job?: string,
    username?: string,
}

interface initialStateType{
    loading: boolean
    error: string,
    data: {
        posts: postType[],
        profiles: profileType[],
        profileInfo: profileType
    }
}

const initialState: initialStateType = {
    loading: false,
    error: '',
    data: {
        posts: [],
        profiles: [],
        profileInfo: {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            image: '',
            phone: '',
            job: '',
            username: '',
        }
    }
}

export const fetchPosts = createAsyncThunk('home/fetchPosts' , async () => {
    return axios
    .get(`https://65731eb2192318b7db41952a.mockapi.io/posts`)
    .then((response) => {
        return response.data;
    })
});

export const fetchProfiles = createAsyncThunk('home/fetchProfiles' , async () => {
    return axios
    .get(`https://65731eb2192318b7db41952a.mockapi.io/users`)
    .then((response) => {
        return response.data;
    })
});

export const fetchProfileInfo = createAsyncThunk('home/fetchProfileInfo' , async (id: number) => {
    return axios
    .get(`https://65731eb2192318b7db41952a.mockapi.io/users/${id}`)
    .then((response) => {
        return response.data;
    })
});


const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //posts
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.data.posts = action.payload;
            state.error = '';
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.loading = false;
            state.data.posts = [];
            state.error = 'No Posts';
        });
        //profiles
        builder.addCase(fetchProfiles.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProfiles.fulfilled, (state, action) => {
            state.loading = false;
            state.data.profiles = action.payload;
            state.error = '';
        });
        builder.addCase(fetchProfiles.rejected, (state) => {
            state.loading = false;
            state.data.profiles = [];
            state.error = 'No Profiles';
        });
        //profiles Info
        builder.addCase(fetchProfileInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProfileInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.data.profileInfo = action.payload;
            state.error = '';
        });
        builder.addCase(fetchProfileInfo.rejected, (state) => {
            state.loading = false;
            state.data.profiles = [];
            state.error = 'Profile';
        });
    },
});

export default homeSlice.reducer;