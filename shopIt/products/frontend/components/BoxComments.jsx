import { useState } from "react";
import { createComment } from "../api/products";

function BoxComments({ productId, comments }) {
    const [localComments, setLocalComments] = useState(comments);
    const [comment, setComment] = useState("");

    async function handleComment(event) {
        event.preventDefault();

        if (!comment.trim) {
            return;
        }

        try {
            const newComment = await createComment(productId, comment);
            console.log("Created Comment", newComment);

            setLocalComments(prevComments => [
                ...prevComments,
                newComment
            ]);

            setComment("");

        } catch (error) {
            console.error("Failed to create a Comment: ", error);
        }

    }

    return (
        <div className="d-flex flex-column p-4">
            <h4 className="mb-5 mt-1">Opinions</h4>

            <div id="boxComments" className="list-group mb-5">
                {localComments.map(comment => (
                    <div key={comment.id} className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <p className="card-text mb-0">{comment.comment}</p>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleComment} className="d-flex flex-column gap-3">
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Leave Your Comment Here!"
                />

                <button type="submit" className="btn btn-dark">
                    Review this Product
                </button>
            </form>
        </div>
    );
}

export { BoxComments };