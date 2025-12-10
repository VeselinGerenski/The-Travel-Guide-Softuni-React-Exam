import useComments from "./useComments.js";

export default function DetailsComment({ refresh, cityId, refreshHandler }) {
  const {
    comments,
    user,
    editCommentId,
    editValue,
    changeHandler,
    editCommentHandler,
    startEdit,
    cancelEdit,
    deleteCommentHandler,
  } = useComments(cityId, refresh, refreshHandler);

  return (
    <ul className="space-y-2 max-h-[8em] overflow-y-auto pr-2">

      {comments.length === 0 && (
        <li className="text-amber-700 italic text-sm">
          No comments available.
        </li>
      )}

      {[...comments].reverse().map((comment) => {
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
                <span className="font-semibold text-amber-700">
                  {comment.author?.email}
                </span>
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
              <span className="text-[10px] text-slate-500 italic whitespace-nowrap">
                {comment.editedAt
                  ? `(Edited) ${new Date(comment.editedAt).toLocaleString()}`
                  : new Date(comment.createdAt).toLocaleString()}
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
