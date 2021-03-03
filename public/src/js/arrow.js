const isRightDir = (idx, targetIdx) => {
  const length = 16;
  const rightDir = Math.abs(idx - targetIdx);
  const leftDir = targetIdx > idx ? length + idx - targetIdx : length - idx + targetIdx;
  return rightDir > leftDir;
};

//dir이 true이면 시계방향
const getAngle = ({ targetIdx, dir = true }) => {
  const defaultAngle = 11.5;
  const oneAngle = 360 / 16;
  let angle = defaultAngle + targetIdx * oneAngle;
  return dir ? angle : angle - 360;
};
