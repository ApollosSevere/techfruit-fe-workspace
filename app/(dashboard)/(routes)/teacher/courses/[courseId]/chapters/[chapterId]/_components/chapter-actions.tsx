"use client";

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

  const [editChapter, { isLoading: editLoading }] = useEditChapterMutation();
  const [deleteChapter, { isLoading: deleteLoading }] =
    useDeleteDocumentItemMutation();

  const onClick = async () => {
    try {
      if (isPublished) {
        toast.success("Chapter unpublished");
      } else {
        toast.success("Chapter published");
      }
      console.log(isPublished);

      await editChapter({
        courseId,
        chapterId,
        values: { isPublished: !isPublished },
      });
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    try {
      await deleteChapter({
        courseId,
        documentItemName: "chapters",
        itemId: chapterId,
      });

      toast.success("Chapter deleted");
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || editLoading || deleteLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={editLoading || deleteLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
