import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Avarta from 'react-avatar'
import axios from 'axios';
import firebase from '../../firebase.js'

const UserPage = () => {

    const [currentImage, setCurrentImage] = useState("");
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isLoading && !user.accessToken) {
            navigate("/login");
        } else {
            setCurrentImage(user.photoURL)
        }
    }, [user])

    // 네이버 클라우드 이미지 변경

    const ImageUpload = (e) => {
        const formData = new FormData();
        formData.append("file", (e.target.files[0]));
        axios
            .post("/api/user/profile/image", formData)
            .then((response) => {
                setCurrentImage(response.data.filePath);
            })
    }

    const SaveProfile = async (e) => {
        e.preventDefault();

        try {
            await firebase.auth().currentUser.updateProfile({
                photoURL: currentImage
            })
        } catch (err) {
            return alert("저장 실패")
        }

        let body = {
            photoURL: currentImage,
            uid: user.uid
        }

        axios.post("/api/user/profile/update", body)
            .then((res) => {
                if (res.data.success) {
                    alert("프로필 저장 성공")
                    window.location.reload();
                } else {
                    return alert("프로필 저장에 실패했습니다.")
                }
            })
    }

    return (
        <div className='mypage'>
            <form>
                <label>
                    <input type='file' accept='image/*' onChange={(e) => ImageUpload(e)} />
                    <Avarta
                        size="100"
                        round={true}
                        src={currentImage}
                    />
                </label>
                <button onClick={(e) => SaveProfile(e)}>저장하기</button>
            </form>
        </div>
    )
}
export default UserPage