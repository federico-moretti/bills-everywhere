import React from 'react';

const directionMap = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

type IconChevronProps = {
  color: string;
  direction: 'top' | 'right' | 'bottom' | 'left';
};
function IconChevron(props: IconChevronProps) {
  const { color, direction } = props;

  const style = React.useMemo(
    () => ({
      transform: `rotate(${directionMap[direction]}deg)`,
      transition: 'transform 0.2s',
    }),
    [direction]
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      style={style}
    >
      <path d="M18 15L12 9 6 15"></path>
    </svg>
  );
}

export default IconChevron;
