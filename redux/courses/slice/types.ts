"use client"

export interface Course {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  isPublished: boolean;
  categoryId: string | null;
  category: Category;
  chapters: Chapter[];
  attachments: Attachment[];
  purchases: Purchase[];
  progress: number | null;
  createdAt: Date;
  updatedAt: Date;
  reviews: Rating[];
}

export type Category = {
  id: string;
  name: string;
} ;


export interface Attachment {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  muxData: MuxData;
  courseId: string;
  userProgress: UserProgress[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MuxData {
  id: string;
  assetId: string;
  playbackId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Purchase {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: string;
  userId: string;
  user_name: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StripeCustomer {
  id: string;
  userId: string;
  stripeCustomerId: string;
  createdAt: Date;
  updatedAt: Date;
}
