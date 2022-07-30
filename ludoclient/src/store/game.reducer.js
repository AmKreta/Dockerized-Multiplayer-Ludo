import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import asyncRequest from "../asyncRequest/asyncRequest";
import { getGameMapInfo } from "../services/services";

const initialState = {
    starredSteps: {},
    colouredSteps: {
        red: new Set([]),
        blue: new Set([]),
        yellow: new Set([]),
        green: new Set([])
    },
    pawns: {

    },
    gameId: {

    },
    members: {

    }
};

export const fetchGameMapDetails = createAsyncThunk('game/fetchGameMapDetails', async () => {
    const res = await asyncRequest({ url: getGameMapInfo });
    return res;
});

const game = createSlice({
    name: 'game',
    initialState,
    setGameMap(state, action) {
        state.starredSteps = {};
        state.colouredSteps = new Set(action.colouredSteps);
        return state;
    },
    extraReducers: {
        [fetchGameMapDetails.fulfilled](state, action) {
            state.starredSteps = action.payload.starredSteps;
            state.colouredSteps = {
                red: new Set(action.payload.colouredSteps.red),
                blue: new Set(action.payload.colouredSteps.blue),
                yellow: new Set(action.payload.colouredSteps.yellow),
                green: new Set(action.payload.colouredSteps.green)
            }
            return state;
        }
    }
});

export const { setGameMap } = game.actions;
export default game.reducer;
