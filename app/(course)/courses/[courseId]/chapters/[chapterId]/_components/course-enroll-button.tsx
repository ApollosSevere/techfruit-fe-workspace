"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { selectUser } from "@/redux/auth/selector";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectAllCourseData } from "@/redux/courses/slice/selector";
import { useAddPurchaseMutation } from "@/redux/courses/service/courseServiceEndpoints";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoadingGlobal, setIsLoading] = useState(false);

  const user = useAppSelector(selectUser);
  const course = useAppSelector(selectAllCourseData);
  const [addPurchase, { isLoading, isSuccess, error }] =
    useAddPurchaseMutation();

  // console.log("userrrrr: ", user);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await addPurchase({ courseId, data: { userId: user.uuid } });

      // const response = await axios.post(`/api/courses/${courseId}/checkout`, {
      //   test: "Workkkkeddd!",
      //   user,
      //   course,
      // });

      // window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoadingGlobal}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};
