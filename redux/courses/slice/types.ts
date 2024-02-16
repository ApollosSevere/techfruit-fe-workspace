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


        // <div key={review.id} className="mt-6 border bg-slate-100 rounded-md p-4">
        //     <div className="font-medium flex items-center justify-between">
        //     @ {review.user_name}
        //     <Rating value={review.rating} />
        //     <p className=""="text-xs text-muted-foreground mt-4">
        //         {date.split(" ").splice(1).join(" ")}
        //     </p>
        //     {/* <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
        //         <svg
        //         xmlns="http://www.w3.org/2000/svg"
        //         width="24"
        //         height="24"
        //         viewBox="0 0 24 24"
        //         fill="none"
        //         stroke="currentColor"
        //         stroke-width="2"
        //         stroke-linecap="round"
        //         stroke-linejoin="round"
        //         className="h-4 w-4 mr-2"
        //         >
        //         <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
        //         <path d="m15 5 4 4"></path>
        //         </svg>
        //         Edit description
        //     </button> */}
        //             <p className="text-sm mt-2">{review.comment}</p>
        //     {course.reviews.length > 1 && <hr />}
        //     </div>
    
        // </div>