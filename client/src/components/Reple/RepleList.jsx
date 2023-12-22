import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RepleContent from './RepleContent'

const RepleList = (props) => {
    const [repleList, setRepleList] = useState([])

    useEffect(() => {
        let body = {
            postId: props.postId
        }
        axios.post("/api/reple/getreple", body)
            .then((res) => {
                if (res.data.success) {
                    setRepleList([...res.data.repleList])
                }
            })

    }, [props.postId])

    return (
        <>
            {repleList.map((reple, id) => {
                return (
                    <RepleContent reple={reple} key={id} />
                )
            })}
        </>
    )
}

export default RepleList