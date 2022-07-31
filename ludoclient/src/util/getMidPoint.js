export default function (boundingRect) {
    const { top, left, bottom, right, } =
        boundingRect;
    const midPoint = {};
    midPoint.y = (bottom + top) / 2;
    midPoint.x = (right + left) / 2;
    return midPoint;
}