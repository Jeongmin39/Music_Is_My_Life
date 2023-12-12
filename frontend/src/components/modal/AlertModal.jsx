import React from "react";
import { Modal } from "antd";
import { IoWarningOutline } from "react-icons/io5";

const AlertModal = ({title, isAlertModal, setAlert}) => {
    const closeModal = () => {
        setAlert(false);
      };

    return (
        <Modal
            open={isAlertModal}
            title={<><h2 style={{fontFamily: 'Cafe24Supermagic-Bold'}}><IoWarningOutline style={{marginBottom:'4px', color:'orange'}}/>&nbsp;{title}</h2></>}
            centered
            closable={false}
            maskClosable={false}
            footer={(_, {}) => (
                <>
                <button style={{color:'white', backgroundColor:'orange'}} onClick={closeModal}>OK</button>
                </>
            )}>
        </Modal>
    )
}

export default AlertModal;