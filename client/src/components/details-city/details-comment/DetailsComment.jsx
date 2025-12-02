import { useEffect, useMemo, useState } from "react";
import useRequest from "../../../hooks/useRequest.js";
import { useUserContext } from "../../../contexts/UserContext.js";

export default function DetailsComment({
  refresh, cityId, onDelete,
}) {
  const [comments, setComments] = useState([])
  const { request } = useRequest();
  const { user } = useUserContext();

  const urlParams = useMemo(() => {
    return new URLSearchParams({
      where: `cityId="${cityId}"`,
      load: 'author=_ownerId:users'
    });
  }, [cityId]);

  useEffect(() => {
    request(`/data/comments?${urlParams.toString()}`)
      .then(result => {
        setComments(result)
      })
  }, [cityId, refresh, request, urlParams]);

  const deleteCommentHandler = async (commentId) => {
    const isConfirmed = confirm("Are you sure you want to delete this comment?");
    if (!isConfirmed) return;

    try {
      await request(`/data/comments/${commentId}`, 'DELETE',);

      onDelete()
    } catch (err) {
      alert("Unable to delete comment.");
      console.error(err);
    }
  };


  return (
    <ul className="space-y-2 max-h-[7.2em] overflow-y-auto pr-2">

      {comments.length === 0 && (
        <li className="text-amber-700 italic text-sm">
          No comments available.
        </li>
      )}

      {comments.reverse().map(comment => {
        const isOwner = user?._id === comment._ownerId;

        return (
          <li
            key={comment._id}
            className="bg-white/90 px-3 py-2 rounded-xl shadow-sm border border-amber-200
           flex justify-between items-start text-xs hover:bg-amber-50 transition min-h-[3rem]"
          >
            {/* LEFT: Author + Text */}
            <div className="flex-1 mr-4 mt-0.3 min-w-0">
              <p className="text-slate-800 text-sm  break-words">
                <span className="font-semibold text-amber-700">{comment.author?.email}:</span>{" "}
                {comment.message}
              </p>
            </div>

            {/* RIGHT: Timestamp + Actions */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-[9px] text-slate-500 italic whitespace-nowrap">
                {new Date(comment.createdAt).toLocaleString()}
              </span>

              {isOwner && (
                <div className="flex gap-1">
                  <button className="text-blue-700 text-[12px] px-1 py-0.5 rounded hover:underline cursor-pointer">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCommentHandler(comment._id)}
                    className="text-red-800 text-[12px] px-1 py-0.5 rounded hover:underline cursor-pointer">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
