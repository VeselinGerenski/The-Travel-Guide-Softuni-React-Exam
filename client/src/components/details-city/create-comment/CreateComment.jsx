
import { useState } from "react";
import useForm from "../../../hooks/useForm.js";
import useRequest from "../../../hooks/useRequest.js";

export default function CreateComment({
    user,
    onCreate,
    cityId,
}) {
    const { request } = useRequest();
    const [coolDown, setCoolDown] = useState(false);
    const [coolDownMsg, setCoolDownMsg] = useState("");

    const commentHandler = async ({ comment },formData, {setValues}) => {
        if (coolDown) {
            setCoolDownMsg('Please wait few seconds before posting another comment.');
            return;
        }

        try {
            await request('/data/comments', 'POST', {
                message: comment,
                cityId: cityId,
                createdAt: new Date().toISOString()
            });

            onCreate();
           
            setValues((state) => ({
                ...state,
                comment: ''
            }));
            setCoolDown(true)

            setTimeout(() => {
                setCoolDown(false)
                setCoolDownMsg("")
            }, 6000);

        } catch (err) {
            alert(err.message)
        }
    }

    const { register, formAction } = useForm(commentHandler, {
        comment: ''
    })

    return (
        <form
            action={formAction}
            className="mt-2 flex gap-2">
            <input
                type="text"
                placeholder="Write a comment..."
                required
                disabled={!user}
                {...register('comment')}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            {coolDownMsg && (
                <p className="text-[12px] text-center text-slate-700 mb-2">
                    {coolDownMsg}
                </p>
            )}
            <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-amber-600 text-white text-xs hover:bg-amber-500 transition shadow cursor-pointer"
            >
                Post
            </button>
        </form>
    );
}