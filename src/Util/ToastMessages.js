import React from "react";
import { toast } from "react-toastify";

export function toastLoginSuccessMessage(email) {
    toast(
        <div>
            <span role="img" aria-label="smile-face">
                😀
            </span>
            &nbsp; 어서오세요 {email}님!
            <br />
            &emsp; 오늘도 이글루와 공부해 볼까요?
        </div>,
        { pauseOnHover: false }
    );
}

export function toastErrorMessage(message) {
    toast.error(`😥 ${message}`);
}

export function servicePreparingMessage() {
    toast.warn("😥 서비스 준비 중입니다");
}
