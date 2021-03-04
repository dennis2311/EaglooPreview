import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { toastErrorMessage } from "../../Util/ToastMessages";
import { server } from "../../Util/server";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FeedbackDialog({ feedbackOpen, setFeedbackOpen }) {
    const email = window.localStorage.getItem("email");

    const [feedbackContent, setFeedbackContent] = useState("");

    function closeFeedback() {
        setFeedbackOpen(false);
    }

    async function submitFeedback() {
        if (feedbackContent !== "") {
            try {
                const { data } = await axios.post(`${server}/api/feedback`, {
                    email,
                    content: feedbackContent,
                });
                if (data.success) {
                    setFeedbackContent("");
                    setFeedbackOpen(false);
                    toast.success(
                        `😍 피드백이 등록되었습니다. 소중한 의견 감사합니다!`
                    );
                } else {
                    toastErrorMessage(data.message);
                }
            } catch (err) {
                toastErrorMessage(
                    "서버 통신 중 오류가 발생했습니다. 나중에 다시 시도해주세요"
                );
            }
        }
    }

    return (
        <Dialog
            open={feedbackOpen}
            onClose={closeFeedback}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">피드백 제공하기</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    이글루 서비스를 이용해주셔서 감사합니다. 서비스를
                    이용하시면서 좋았던 점이나 불편했던 점을 적어주시면 반영하여
                    더 나은 시버스를 제공할 수 있도록 노력하겠습니다.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    value={feedbackContent}
                    onChange={(e) => {
                        setFeedbackContent(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            submitFeedback();
                        }
                    }}
                    id="name"
                    label="내용"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeFeedback} color="primary">
                    취소
                </Button>
                <Button onClick={submitFeedback} color="primary">
                    피드백 남기기
                </Button>
            </DialogActions>
        </Dialog>
    );
}
