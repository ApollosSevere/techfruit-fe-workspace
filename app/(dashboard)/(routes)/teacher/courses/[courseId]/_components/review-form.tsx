import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAddReviewToCourseMutation } from "@/redux/courses/service/courseServiceEndpoints";
import { Course, Purchase } from "@/redux/courses/slice/types";
import { RatingSystem } from "./rating-system";
import { selectUserId, selectUsername } from "@/redux/auth/selector";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectAllCourseData } from "@/redux/courses/slice/selector";
import { Rating } from "./rating";

interface ReviewFormProps {
  purchased: Purchase | undefined;
  courseId: string;
}

const formSchema = z.object({
  comment: z.string().min(1, {
    message: "Comment is required",
  }),
});

export const RatingForm = ({ purchased, courseId }: ReviewFormProps) => {
  const ratingNum = 5;
  const userId = useAppSelector(selectUserId);
  const [rating, setRating] = useState<number>(0);
  const senderUsername = useAppSelector(selectUsername);

  const course = useAppSelector(selectAllCourseData);
  const [addReviewToCourse] = useAddReviewToCourseMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await addReviewToCourse({
        courseId,
        review: {
          userId,
          user_name: senderUsername,
          rating,
          comment: values.comment,
        },
      });

      toast.success("Review Added");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {purchased && (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
          <div className="text-2xl font-semibold cursor-auto mb-4 ">
            Leave a review
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <RatingSystem
                rating={rating}
                setRating={setRating}
                numOfStars={5}
              />

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="e.g. 'Give this course a review...'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      <div className="text-2xl font-semibold cursor-auto mb-4 mt-8 ">
        Reviews
      </div>

      {[...course?.reviews]
        ?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        ?.map((review, index) => {
          const reviewDate = new Date(review.createdAt);
          const date = reviewDate.toDateString();
          const time = reviewDate.toLocaleTimeString();

          return (
            <div key={review.id} className=" border rounded-md p-4 mb-4">
              <div className="font-medium flex items-center gap-4">
                <span>@{review.user_name}</span>
                <Rating value={review.rating} />
              </div>

              <p className="text-sm .text-slate-200 mt-2">{review.comment}</p>

              <p className="text-xs text-muted-foreground mt-4">
                {`${date.split(" ").splice(1).join(" ")} ${time}`}
              </p>
            </div>
          );
        })}
    </>
  );
};
