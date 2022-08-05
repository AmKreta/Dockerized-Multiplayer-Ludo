import { useSelector } from 'react-redux';

export default function (pawnId) {
    const moveablePawns = useSelector(state => state.game.moveablePawns);
    const isMoveable = moveablePawns?.has && moveablePawns.has(pawnId);
    return isMoveable;
}