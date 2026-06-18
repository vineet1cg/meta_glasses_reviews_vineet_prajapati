import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchReviews = createAsyncThunk('reviews/fetchAll', async ({ page, limit, search, rating }, { rejectWithValue }) => {
  try {
    let url = `/reviews?page=${page}&limit=${limit}`;
    if (search) url += `&search=${search}`;
    if (rating) url += `&rating=${rating}`;
    const response = await api.get(url);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const createReview = createAsyncThunk('reviews/create', async (reviewData, { rejectWithValue }) => {
  try {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const updateReview = createAsyncThunk('reviews/update', async ({ id, reviewData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const deleteReview = createAsyncThunk('reviews/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/reviews/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [],
    pagination: {
      total: 0,
      page: 1,
      pages: 1,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch reviews';
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.items.unshift(action.payload.data);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;
