"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import {
  useDeleteDocumentItemMutation,
  useEditChapterMutation,
} from "@/redux/courses/service/courseServiceEndpoints";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [editChapter, { isSuccess, error }] = useEditChapterMutation();
  const [deleteChapter, { isLoading: deleteLoading }] =
    useDeleteDocumentItemMutation();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        // await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
        toast.success("Chapter unpublished");
      } else {
        // await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
        toast.success("Chapter published");
      }
      console.log(isPublished);

      await editChapter({
        courseId,
        chapterId,
        values: { isPublished: !isPublished },
      });

      // router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      // await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      deleteChapter({
        courseId,
        documentItemName: "chapters",
        itemId: chapterId,
      });

      toast.success("Chapter deleted");
      // router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
