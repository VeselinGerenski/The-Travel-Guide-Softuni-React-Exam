import { useEffect, useMemo, useState } from "react";
import useRequest from "../../../hooks/useRequest.js";
import { useUserContext } from "../../../contexts/UserContext.js";

export default function DetailsComment({ refresh, cityId, refreshHandler }) {
  const [comments, setComments] = useState([]);
  const { request } = useRequest();
  const { user } = useUserContext();

  const [editCommentId, setEditCommentId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Build params for fetching comments
  const urlParams = useMemo(() => {
    return new URLSearchParams({
      where: `cityId="${cityId}"`,
      load: 'author=_ownerId:users'
    });
  }, [cityId]);

  // Fetch comments
  useEffect(() => {
    request(`/data/comments?${urlParams.toString()}`)
      .then(result => setComments(result))
      .catch(err => console.error("Failed to fetch comments", err));
  }, [refresh, request, urlParams]);

  // Input handler
  const changeHandler = (e) => {
    setEditValue(e.target.value);
  };

  // Save edited comment
  const editCommentHandler = async () => {
    try {
      const oldComment = comments.find(c => c._id === editCommentId);

      const updated = {
        ...oldComment,
        message: editValue
      };

      await request(`/data/comments/${editCommentId}`, "PUT", updated);

      setEditCommentId(null);
      setEditValue("");
      refreshHandler();
    } catch (err) {
      alert(err.message);
    }
  };

  // Start editing a specific comment
  const startEdit = (comment) => {
    setEditCommentId(comment._id);
    setEditValue(comment.message);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditCommentId(null);
    setEditValue("");
  };

  // Delete handler
  const deleteCommentHandler = async (commentId) => {
    const isConfirmed = confirm("Are you sure you want to delete this comment?");
    if (!isConfirmed) return;

    try {
      await request(`/data/comments/${commentId}`, "DELETE");
      refreshHandler();
    } catch (err) {
      alert("Unable to delete comment.");
      console.error(err);
    }
  };

  return (
    <ul className="space-y-2 max-h-[8em] overflow-y-auto pr-2">
      {comments.length === 0 && (
        <li className="text-amber-700 italic text-sm">
          No comments available.
        </li>
      )}

      {[...comments].reverse().map(comment => {
        const isOwner = user?._id === comment._ownerId;

        return (
          <li
            key={comment._id}
            className="bg-white/90 px-3 py-2 rounded-xl shadow-sm border border-amber-200
               flex justify-between items-start text-xs hover:bg-amber-50 transition min-h-[3rem]"
          >
            {/* LEFT: Author + Comment */}
            <div className="flex-1 mr-4 mt-0.3 min-w-0">
              <p className="text-slate-800 text-sm break-words">
                <span className="font-semibold text-amber-700">{comment.author?.email}</span>
                <br />
                {editCommentId === comment._id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={changeHandler}
                    className="border px-1 py-0.5 rounded text-xs w-full"
                  />
                ) : (
                  comment.message
                )}
              </p>
            </div>

            {/* RIGHT: Timestamp + Buttons */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-[9px] text-slate-500 italic whitespace-nowrap">
                {new Date(comment.createdAt).toLocaleString()}
              </span>

              {isOwner && (
                <div className="flex gap-1">
                  {editCommentId === comment._id ? (
                    <>
                      <button
                        onClick={editCommentHandler}
                        className="text-green-700 text-[12px] px-1 py-0.5 hover:underline cursor-pointer"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 text-[12px] px-1 py-0.5 hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(comment)}
                        className="text-blue-700 text-[12px] px-1 py-0.5 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteCommentHandler(comment._id)}
                        className="text-red-800 text-[12px] px-1 py-0.5 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
