import { cn } from "../../../../../app/utils/cn";
import { useSwiper } from "swiper/react";

interface SliderOptionProps {
  isActive: boolean;
  month: string;
  index: number;
}

export function SliderOption({ isActive, month, index }: SliderOptionProps) {
  const swiper = useSwiper();
  return (
    <button
      className={cn(
        "w-full rounded-full h-12 text-sm text-gray-800 tracking-[-0.5px] font-medium cursor-pointer",
        isActive && "bg-white"
      )}
      onClick={() => swiper.slideTo(index)}
    >
      {month}
    </button>
  );
}
