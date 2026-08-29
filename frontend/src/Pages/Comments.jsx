import React from "react";
import { MessageSquare } from "lucide-react";

const Comments = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 sm:p-8 transition-colors duration-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <MessageSquare size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Article Comments & Feedback
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
              Review and manage comments across your published articles.
            </p>
          </div>
        </div>

        <div className="py-16 text-center border border-dashed border-gray-200 dark:border-slate-800 rounded-xl">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-gray-700 dark:text-slate-300">
            No Recent Comments
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            When readers comment on your blogs, their thoughts and replies will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;

