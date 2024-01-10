import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
  isLoading: boolean;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
  isLoading,
}: InfoCardProps) => {
  return (
    <div
      className={`border rounded-md flex items-center transition-all gap-x-2 p-3 ${
        isLoading ? "animate-pulse bg-slate-100 h-[74px] p-0" : ""
      }`}
    >
      {!isLoading && (
        <>
          <IconBadge variant={variant} icon={Icon} />
          <div>
            <p className="font-medium">{label}</p>
            <p className="text-gray-500 text-sm">
              {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
