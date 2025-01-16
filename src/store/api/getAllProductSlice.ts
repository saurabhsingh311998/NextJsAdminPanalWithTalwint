import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the interface for a post
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

// Define the interface for the slice state
interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

// Async thunk for fetching all posts
export const fetchAllPosts:any = createAsyncThunk(
  'posts/fetchAllPosts',
  async (_:any, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://dummyjson.com/posts');
      return response.data.posts; // Return the posts array
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

// Create the slice
const getAllProductSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder:any) => {
    builder
      .addCase(fetchAllPosts.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state:any, action:any) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default getAllProductSlice.reducer;