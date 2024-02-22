"use client";

import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import {
  useDeleteCourseMutation,
  useEditCourseMutation,
} from "@/redux/courses/service/courseServiceEndpoints";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();

  const [editCourse, { isLoading: isEditing }] = useEditCourseMutation();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const onClick = async () => {
    try {
      await editCourse({ courseId, values: { isPublished: !isPublished } });

      if (isPublished) {
        toast.success("Course unpublished");
      } else {
        toast.success("Course published");
        confetti.onOpen();
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    try {
      await deleteCourse(courseId);

      toast.success("Course deleted");
      router.push(`/teacher/courses`);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isEditing || isDeleting}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isEditing || isDeleting}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
