import { useEffect, useMemo, useState } from "react";
import useRequest from "../../../hooks/useRequest.js";

export default function DetailsComment({
  refresh, cityId
}) {
  const [comments, setComments] = useState([])
  const { request } = useRequest();

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
  }, [cityId, refresh, request, urlParams])

  return (
    <ul className="space-y-2 max-h-[90px] overflow-y-auto pr-2">

      {comments.length === 0 && <li className="text-amber-700 italic text-sm">No comments available.</li>}

      {comments
  .reverse()
  .map(comment => (
    <li
      key={comment._id}
      className="bg-white/90 px-3 py-2 rounded-xl shadow-sm border border-amber-200
                 flex justify-between text-xs break-words whitespace-pre-line
                 hover:bg-amber-50 transition"
    >
      {/* LEFT: Author + Text */}
      <div className="flex-1">
        <p className="text-slate-800 text-sm leading-snug">
          <span className="font-semibold text-amber-700">{comment.author?.email}:</span>{" "}
          {comment.message}
        </p>
      </div>

      {/* RIGHT: Timestamp */}
      <span className="text-[9px] text-slate-500 italic ml-3 whitespace-nowrap">
        {new Date(comment.createdAt).toLocaleString()}
      </span>
    </li>
  ))}


    </ul>
  );
}
