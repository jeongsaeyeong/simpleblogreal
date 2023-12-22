import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const RepleWrite = (props) => {
    const [reple, setReple] = useState("")
    const user = useSelector((state) => state.user)

    const SubmitHandeler = (e) => {
        e.preventDefault();

        if (!reple) {
            return alert("댓글 내용을 작성해주세요.")
        }

        let body = {
            reple: reple,
            uid: user.uid,
            postId: props.postId
        }

        axios.post("/api/reple/submit", body)
            .then((res) => {
                if (res.data.success) {
                    alert("댓글 작성이 완료되었습니다.")
                    window.location.reload();
                } else {
                    alert("댓글 작성이 실패하였습니다.")
                }
            })
    }

    return (
        <>
            <form>
                <input
                    style={{ border: "1px solid #000000", padding: "10px" }}
                    type="text"
                    value={reple}
                    onChange={(e) => {
                        setReple(e.currentTarget.value)
                    }}
                />
                <button
                    style={{ border: "1px solid #000000", padding: "10px" }}
                    onClick={(e) => {
                        SubmitHandeler(e)
                    }}
                >댓글 쓰기</button>
            </form>
        </>
    )
}

export default RepleWrite