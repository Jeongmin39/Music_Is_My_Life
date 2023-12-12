import React from "react";
import { Modal } from "antd";
import { CgCheckO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({title, isSuccessModal, setSuccess, isNavigate=true}) => {
    const navigate = useNavigate();

    const closeModal = () => {
        setSuccess(false);
        if(isNavigate) {
            navigate("/calendar")
        }
      };

    return (
        <Modal
            open={isSuccessModal}
            title={<><h2 style={{'font-family': 'Cafe24Supermagic-Bold'}}><CgCheckO style={{'marginBottom':'4px', 'color':'#18d660'}}/>&nbsp;{title}</h2></>}
            centered
            closable={false}
            maskClosable={false}
            footer={(_, {}) => (
                <>
                <button style={{'color':'white', 'backgroundColor':'#18d660'}} onClick={closeModal}>OK</button>
                </>
            )}>
        </Modal>
    )
}

export default SuccessModal;