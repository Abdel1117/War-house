import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


interface authState {
    user : any;
    isAuthenticated: boolean;
    loading: boolean;
    error: boolean;
}

const initialState: authState = {
    user : null,
    isAuthenticated: false,
    loading: false,
    error: false,
};

export const authThunk = createAsyncThunk(
    "auth/authThunk",
    async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/auth`, {
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(data),
                method: "POST",
            });
            const userData = await response.json();
            console.log(data);
            return userData;
        } catch (error) {
            console.error(error);
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
        extraReducers:  (builder) => {
            builder
                .addCase(authThunk.pending, (state) => {
                    state.loading = true;
                    state.error = false;
                })
                .addCase(authThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.isAuthenticated = action.payload;
                })
                .addCase(authThunk.rejected, (state) => {
                    state.loading = false;
                    state.error = true;
                });
        }
   
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;