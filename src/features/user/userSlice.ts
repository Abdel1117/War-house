import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";


interface userState {
    value: any
    loading: boolean
    error: boolean
}


const initialState: userState = {
    loading: false,
    value: null,
    error: false,
}


// Créez un thunk pour une action asynchrone
export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/getAllUsers`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method : "GET",
            });
            const data = await response.json();
            console.log(data)
            return data;
          
        } catch (error) {
            console.error(error);
        }
    }
  );
  
  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<any>) => {
        state.value = action.payload;
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      setError: (state, action: PayloadAction<boolean>) => {
        state.error = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload)
          state.value = action.payload;
        })
        .addCase(fetchUser.rejected, (state) => {
          state.loading = false;
          state.error = true;
        })
    },
  });
  
  export const { setUser, setLoading, setError } = userSlice.actions;
  
  export const userReducer = userSlice.reducer;