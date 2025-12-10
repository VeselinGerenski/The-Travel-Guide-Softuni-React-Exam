import { useEffect, useMemo, useState } from "react";
import useRequest from "../../../hooks/useRequest.js";
import { useUserContext } from "../../../contexts/UserContext.js";

export default function useComments(cityId, refresh, refreshHandler) {
  const [comments, setComments] = useState([]);
  const { request } = useRequest();
  const { user } = useUserContext()

  const [editCommentId, setEditCommentId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Build params for fetching comments
  const urlParams = useMemo(() => {
    return new URLSearchParams({
      where: `cityId="${cityId}"`,
      load: "author=_ownerId:users",
    });
  }, [cityId]);

  // Fetch comments
  useEffect(() => {
    if (!cityId) return;

    request(`/data/comments?${urlParams.toString()}`)
      .then((result) => setComments(result))
      .catch((err) => console.error("Failed to fetch comments", err));
  }, [cityId, refresh, request, urlParams]);

  // Input handler for edit
  const changeHandler = (e) => {
    setEditValue(e.target.value);
  };

  // Save edited comment
  const editCommentHandler = async () => {
    try {
      const oldComment = comments.find((c) => c._id === editCommentId);
      if (!oldComment) return;

      const updated = {
        ...oldComment,
        message: editValue,
        editedAt: Date.now(),
      };

      await request(`/data/comments/${editCommentId}`, "PUT", updated);

      setComments(prev =>
        prev.map(comment =>
          comment._id === editCommentId
            ? { ...comment, message: editValue, editedAt: Date.now() }
            : comment
        )
      );

      setEditCommentId(null);
      setEditValue("");

      // Either trigger parent refresh or patch locally
      if (typeof refreshHandler === "function") {
        refreshHandler();
      } else {
        setComments((prev) =>
          prev.map((c) =>
            c._id === editCommentId ? { ...c, message: editValue } : c
          )
        );
      }
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

      if (typeof refreshHandler === "function") {
        refreshHandler();
      } else {
        setComments((prev) => prev.filter((c) => c._id !== commentId));
      }
    } catch (err) {
      alert("Unable to delete comment.");
      console.error(err);
    }
  };

  return {
    comments,
    user,
    editCommentId,
    editValue,
    changeHandler,
    editCommentHandler,
    startEdit,
    cancelEdit,
    deleteCommentHandler,
  };
}
