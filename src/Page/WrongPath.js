import React from "react";
import { Link } from "react-router-dom";

export default function WrongPath() {
    return (
        <div>
            올바른 주소가 아니예요 :/
            <Link to="/">홈으로 돌아가기</Link>
        </div>
    );
}
