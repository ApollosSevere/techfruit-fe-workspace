"use client";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { useGetAnalyticsCalculationQuery } from "@/redux/courses/service/courseServiceEndpoints";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectUserId } from "@/redux/auth/selector";
import { selectAnalytics } from "@/redux/courses/slice/selector";
import { LoadingSpinner } from "@/components/loading-spinner";
import FaqComponent from "./_components/FaqComponent";
import { faqs } from "./_components/faqsData";

const AnalyticsPage = () => {
  const userId = useAppSelector(selectUserId);

  const { isLoading } = useGetAnalyticsCalculationQuery(userId);

  const { data, totalRevenue, totalSales } = useAppSelector(selectAnalytics);

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
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <FaqComponent faqs={faqs} />
          </div>

          {/* <Chart data={data} /> */}
        </div>
      )}
    </>
  );
};

export default AnalyticsPage;
