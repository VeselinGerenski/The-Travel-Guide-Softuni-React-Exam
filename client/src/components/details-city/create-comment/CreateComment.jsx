export default function CreateComment() {
    return (
        <form className="mt-2 flex gap-2">
            <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-amber-600 text-white text-xs hover:bg-amber-500 transition shadow"
            >
                Post
            </button>
        </form>
    );
}