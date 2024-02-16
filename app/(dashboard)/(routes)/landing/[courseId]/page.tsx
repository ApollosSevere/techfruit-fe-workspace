"use client";

import { z } from "zod";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/components/loading-spinner";
import { BookOpen } from "lucide-react";
import {
  useAddPurchaseMutation,
  useFindCourseByPublishedChaptersAndUserIdQuery,
} from "@/redux/courses/service/courseServiceEndpoints";
import { useAppSelector } from "@/redux/utils/hooks";
import { redirect, useRouter } from "next/navigation";
import { Course, Purchase } from "@/redux/courses/slice/types";
import { CourseProgress } from "@/components/course-progress";
import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { useMemo, useState } from "react";

import { addProgress } from "@/redux/courses/slice/selector";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { selectUser, selectUserId } from "@/redux/auth/selector";

import { RatingForm } from "../../teacher/courses/[courseId]/_components/review-form";

interface ReviewFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  rating: z.coerce.number(),
  comment: z.string().min(1, {
    message: "Review is required",
  }),
});

const LandingPage = ({ params }: { params: { courseId: string } }) => {
  // With redux, load the full thing here!
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const userId = useAppSelector(selectUserId);
  const [isLoadingGlobal, setIsLoading] = useState(false);
  const [addPurchase] = useAddPurchaseMutation();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const [addReviewToCourse] = useAddPurchaseMutation();

  const {
    isLoading,
    data: course,
    refetch,
  } = useFindCourseByPublishedChaptersAndUserIdQuery(
    {
      courseId: params.courseId,
      userId,
    },
    { refetchOnMountOrArgChange: true }
  );

  const {
    id: courseId,
    title,
    imageUrl,
    category,
    chapters,
    progress,
    price,
    purchases,
    description,
  }: Course = addProgress([course], userId)?.[0] || {};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // await axios.patch(`/api/courses/${courseId}`, values);
      // await editCourse({ courseId, values });
      toast.success("Course updated");
      toggleEdit();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);
      console.log(courseId, userId, user, course);

      await addPurchase({ courseId, data: { userId: userId } });

      const response = await axios.post(`/api/courses/${courseId}/checkout`, {
        user,
        course,
      });

      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const purchase = useMemo(
    () => purchases?.find((p: Purchase) => p.userId === userId?.toString()),
    [purchases]
  );

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    // redirect(`/courses/${course?.id}/chapters/${course?.chapters[0].id}`)
    <div className="w-full">
      <div className="flex w-11/12 pt-6 mx-auto gap-4">
        <div className="w-7/12 mr-4">
          {/* 70% width for the first section */}
          {/* Your content for the first section */}{" "}
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image fill className="object-cover" alt={title} src={imageUrl} />
          </div>
          <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-6 pt-0  mt-8">
            <div className="flex flex-col pt-2">
              <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                <div className="flex items-center gap-x-1 text-slate-500">
                  <IconBadge size="sm" icon={BookOpen} />
                  <span>
                    {chapters?.length}
                    {chapters?.length === 1 ? " Chapter" : " Chapters"}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-semibold cursor-auto pb-2 ">
                {title}
              </div>
              <p className="text-xs text-muted-foreground pb-2">
                {description}
              </p>
              <p className="text-xs text-muted-foreground ">{category?.name}</p>

              {progress !== null ? (
                <CourseProgress
                  variant={"default"}
                  size="sm"
                  value={progress}
                />
              ) : (
                <p className="text-md md:text-sm font-medium text-slate-700">
                  {formatPrice(price)}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-5/12 ">
          {/* 30% width for the second section */}
          {/* Your content for the second section */}
          <div className="border rounded-md p-6 text-secondary bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900 via-sky-950 to-gray-900">
            {purchase ? (
              <>
                <div className="mb-7">
                  <h4 className="font-semibold text-xl mb-4">
                    Continue where you left off.
                  </h4>
                  <p className="text-sm text-neutral-200">
                    Watch from the last completed chapter.
                  </p>
                </div>
                <button
                  onClick={() => {
                    router.push(
                      `/courses/${courseId}/chapters/${chapters[0].id}`
                    );
                  }}
                  className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full"
                  type="button"
                >
                  Continue watching
                </button>
              </>
            ) : (
              <>
                <div className="mb-7">
                  <h4 className="font-semibold text-xl mb-4">
                    Ready to start building?
                  </h4>
                  <p className="text-sm text-neutral-200">
                    Track your progress, watch with subtitles, change quality
                    &amp; speed, and more.
                  </p>
                </div>
                <button
                  onClick={onClick}
                  disabled={isLoadingGlobal}
                  className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full"
                  type="button"
                >
                  Enroll for {formatPrice(price)}
                </button>
              </>
            )}
          </div>

          <div>
            <div className="grid ">
              <div>
                <RatingForm
                  courseId={course.id || params.courseId}
                  purchased={purchase}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
