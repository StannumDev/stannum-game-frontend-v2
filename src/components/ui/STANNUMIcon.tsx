interface Props{
    className: string;
    pathClassName: string;
}

interface Path{
  path: string
}

const paths:Array<Path> = [
  { path: "M484.65 644.435C479.05 644.435 473.558 642.928 468.604 639.805L163.094 447.69C148.987 438.86 144.787 420.337 153.618 406.23C162.448 392.231 180.97 387.923 195.078 396.754L454.497 559.9V419.045C454.497 402.461 467.958 389 484.542 389C501.126 389 514.587 402.461 514.587 419.045V614.283C514.587 625.267 508.664 635.282 499.08 640.559C494.665 643.251 489.603 644.435 484.65 644.435Z" },
  { path: "M595.041 732.197C578.457 732.197 564.996 718.736 564.996 702.152V506.914C564.996 495.93 570.919 485.915 580.503 480.638C590.087 475.362 601.825 475.685 611.086 481.5L916.597 673.615C930.704 682.445 934.904 700.967 926.073 715.074C917.243 729.182 898.72 733.381 884.613 724.551L625.194 561.404V702.26C625.194 718.736 611.732 732.197 595.041 732.197Z" },
]

export const STANNUMIcon = ({ className, pathClassName } :Props) => {
  return (
    <svg
      aria-describedby="Icono de STANNUM"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="125 350 830 420"
      fill="none"
      className={`${className} custom-svg`}
    >
      {
        paths.map(({path}:Path, i:number) => (
          <path key={`icon_${i}`} className={pathClassName} fillRule="nonzero" d={path} />
        ))
      }
    </svg>
  )
}