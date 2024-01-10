// import { auth } from "@clerk/nextjs";
"use client";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { useGetAnalyticsCalculationQuery } from "@/redux/courses/service/courseServiceEndpoints";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectUserId } from "@/redux/auth/selector";
import { selectAnalytics } from "@/redux/courses/slice/selector";
import { LoadingSpinner } from "@/components/loading-spinner";

const AnalyticsPage = () => {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/");
  // }

  // const {
  //   data,
  //   totalRevenue,
  //   totalSales,
  // } = await getAnalytics(userId);

  const userId = useAppSelector(selectUserId);

  const { isLoading } = useGetAnalyticsCalculationQuery(
    userId,
    { refetchOnMountOrArgChange: true } // TODO: figure out what this means
  );

  const { data, totalRevenue, totalSales } = useAppSelector(selectAnalytics);

  console.log(data, totalRevenue, totalSales);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
            <DataCard label="Total Sales" value={totalSales} />
          </div>
          <Chart data={data} />
        </div>
      )}
    </>
  );
};

export default AnalyticsPage;
