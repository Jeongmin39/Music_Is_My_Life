import React from "react";
import { Modal } from "antd";
import { IoIosInformationCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FailModal = ({title, isFailModal, setFail, toNavigate}) => {
    const navigate = useNavigate();

    const closeModal = () => {
        setFail(false);
        navigate(toNavigate)
    };

    return (
        <Modal
            open={isFailModal}
            title={<><h2 style={{'font-family': 'Cafe24Supermagic-Bold'}}><IoIosInformationCircle style={{'marginBottom':'4px', 'color':'red'}}/>&nbsp;{title}</h2></>}
            centered
            closable={false}
            maskClosable={false}
            footer={(_, {}) => (
                <>
                <button style={{'color':'white', 'backgroundColor':'red'}} onClick={closeModal}>OK</button>
                </>
            )}>
        </Modal>
    )
}

export default FailModal;