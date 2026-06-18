import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchOverview = createAsyncThunk('analytics/fetchOverview', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/analytics/overview');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const fetchRatingDistribution = createAsyncThunk('analytics/fetchRatingDistribution', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/analytics/rating-distribution');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const fetchSentimentTrend = createAsyncThunk('analytics/fetchSentimentTrend', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/analytics/sentiment-trend');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const fetchTopReviewers = createAsyncThunk('analytics/fetchTopReviewers', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/analytics/top-reviewers');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const fetchHelpfulnessDistribution = createAsyncThunk('analytics/fetchHelpfulnessDistribution', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/analytics/helpfulness-distribution');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const fetchMonthlyVolume = createAsyncThunk('analytics/fetchMonthlyVolume', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/analytics/monthly-volume');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const fetchImageVsNoImage = createAsyncThunk('analytics/fetchImageVsNoImage', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/analytics/image-vs-no-image');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    overview: null,
    ratingDist: [],
    sentimentTrend: [],
    topReviewers: [],
    helpfulnessDist: [],
    monthlyVolume: [],
    imageComparison: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverview.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchOverview.fulfilled, (state, action) => { state.loading = false; state.overview = action.payload.overview; })
      .addCase(fetchOverview.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchRatingDistribution.fulfilled, (state, action) => { state.ratingDist = action.payload.distribution; })
      .addCase(fetchSentimentTrend.fulfilled, (state, action) => { state.sentimentTrend = action.payload.trend; })
      .addCase(fetchTopReviewers.fulfilled, (state, action) => { state.topReviewers = action.payload.reviewers; })
      .addCase(fetchHelpfulnessDistribution.fulfilled, (state, action) => { state.helpfulnessDist = action.payload.distribution; })
      .addCase(fetchMonthlyVolume.fulfilled, (state, action) => { state.monthlyVolume = action.payload.volume; })
      .addCase(fetchImageVsNoImage.fulfilled, (state, action) => { state.imageComparison = action.payload.comparison; });
  },
});

export default analyticsSlice.reducer;
