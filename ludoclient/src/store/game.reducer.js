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
    pawns: {},
    gameroomId: null,
    members: {},
    positionMap: {
        setting: false,
        steps: {
            //step_index-coordinates
        },
        home: {
            // id-coordinate
            red: {},
            blue: {},
            yellow: {},
            green: {}
        },
        destination: {
            // id-coordinate
            red: {},
            blue: {},
            yellow: {},
            green: {}
        }
    },
    dieLoced: true,
    diceTopFace: 6,
    activeColor: null,
    moveablePawns: null
};

export const fetchGameMapDetails = createAsyncThunk('game/fetchGameMapDetails', async () => {
    const res = await asyncRequest({ url: getGameMapInfo });
    return res;
});

const game = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameRoomId(state, action) {
            state.gameroomId = action.payload;
            return state;
        },
        setInitialPawnsPosition(state, action) {
            state.pawns = action.payload;
            return state;
        },
        mapHomeCoordinates(state, action) {
            const { color, positions } = action.payload;
            const pawns = state.pawns[color];
            Object.keys(pawns).forEach((pawnId, index) => {
                state.positionMap.home[pawnId] = positions[index];
            });
            return state;
        },
        mapStepsCoordinates(state, action) {
            const stepMap = action.payload;
            Object.assign(state.positionMap.steps, stepMap);
            return state;
        },
        movePawn(state, action) {
            const { pawnId, stepIndex, movedPawnColor } = action.payload;
            state.pawns[movedPawnColor][pawnId] = stepIndex;
            return state;
        },
        setActiveColor(state, action) {
            const activeColor = action.payload;
            state.activeColor = activeColor;
            return state;
        },
        setMoveablePawns(state, action) {
            const moveablePawns = action.payload;
            state.moveablePawns = moveablePawns;
            return state;
        }
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

export const {
    setGameMap,
    setInitialPawnsPosition,
    setGameRoomId,
    mapHomeCoordinates,
    mapStepsCoordinates,
    movePawn,
    setActiveColor,
    setMoveablePawns
} = game.actions;
export default game.reducer;
