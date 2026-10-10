import yinYangImage from "@/assets/equilibrio-yinyang.png";

export function EquilibrioMark() {
  return (
    <span className="equilibrio-mark" aria-hidden="true">
      <span className="equilibrio-mark__depth" />
      <img
        src={yinYangImage}
        alt=""
        width={72}
        height={72}
        className="equilibrio-mark__image"
      />
    </span>
  );
}
