import React, {useState} from "react";
import {useRecoilState} from "recoil";
import {selectedMonth, selectedYear} from "../../mainPage/PlaylistPage.jsx";

import {Select, Space} from 'antd';

const DropButton = ({years = [],months=[]}) => {

    const today = new Date();
    const [_selectedMonth, setSelectedMonth] = useRecoilState(selectedMonth)
    const [_selectedYear, setSelectedYear] = useRecoilState(selectedYear)

    const handleYearChange = (value) => {
        setSelectedYear(value);
    };
    const handleMonthChange = (value) => {
        setSelectedMonth(value);
    };

    return (

        <div>
            <Space wrap>
                <Select
                    defaultValue={today.getFullYear()}
                    style={{
                        width: 90,
                    }}
                    onChange={handleYearChange}
                    options={years.map((year) => ({
                        label: year+'년',
                        value: year,
                    }))}
                />
                <Select
                    listHeight={150}
                    style={{
                        width: 80
                    }}
                    defaultValue={today.getMonth()+1}
                    onChange={handleMonthChange}
                    options={months.map((month) => ({
                        label: month+'월',
                        value: month,
                    }))}
                />
            </Space>


        </div>
    )
}
export default DropButton;
