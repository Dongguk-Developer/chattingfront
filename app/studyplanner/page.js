"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const StudyPlanner = () => {
    const [selectedYear, setSelectedYear] = useState("년도");
    const [selectedMonth, setSelectedMonth] = useState("월");
    const [selectedDay, setSelectedDay] = useState("일");
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [plans, setPlans] = useState([]);
    const [tempPlan, setTempPlan] = useState("");
    const [tempMemo, setTempMemo] = useState("");
    const [tempDDay, setTempDDay] = useState("D-10");
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
    const router = useRouter();

    // 윤년인지 체크하는 함수
    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    // 선택된 년도와 월에 따라 일수를 계산하는 함수
    const calculateDaysInMonth = (year, month) => {
        if (!year || !month) return [];

        const daysInEachMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return Array.from({ length: daysInEachMonth[month - 1] }, (_, i) => i + 1);
    };

    // 년도 선택 핸들러
    const handleYearSelect = (year) => {
        setSelectedYear(`${year}년`);
        if (selectedMonth !== "월") {
            setDaysInMonth(calculateDaysInMonth(year, parseInt(selectedMonth)));
        }
    };

    // 월 선택 핸들러
    const handleMonthSelect = (month) => {
        setSelectedMonth(`${month}월`);
        if (selectedYear !== "년도") {
            setDaysInMonth(calculateDaysInMonth(parseInt(selectedYear), month));
        }
    };

    const handleDaySelect = (day) => {
        setSelectedDay(`${day}일`);
    };

    const addPlan = () => {
        if (tempPlan && tempMemo) {
            setPlans([...plans, { plan: tempPlan, memo: tempMemo, dDay: tempDDay, completed: false }]);
            setTempPlan("");
            setTempMemo("");
            document.getElementById('my_modal_1').close();
        }
    };

    const openEditModal = (index) => {
        setSelectedPlanIndex(index);
        const plan = plans[index];
        setTempPlan(plan.plan);
        setTempMemo(plan.memo);
        setTempDDay(plan.dDay);
        document.getElementById('my_modal_2').showModal();
    };

    const updatePlan = () => {
        if (selectedPlanIndex !== null) {
            const updatedPlans = [...plans];
            updatedPlans[selectedPlanIndex] = {
                ...updatedPlans[selectedPlanIndex],
                plan: tempPlan,
                memo: tempMemo,
                dDay: tempDDay,
            };
            setPlans(updatedPlans);
            setSelectedPlanIndex(null);
            document.getElementById('my_modal_2').close();
        }
    };

    const deletePlan = () => {
        if (selectedPlanIndex !== null) {
            setPlans(plans.filter((_, index) => index !== selectedPlanIndex));
            setSelectedPlanIndex(null);
            document.getElementById('my_modal_2').close();
        }
    };

    const handleCheckboxToggle = (index) => {
        setPlans(plans.map((plan, i) =>
          i === index ? { ...plan, completed: !plan.completed } : plan
        ));
    };

    const handleBackClick = () => {
        router.push("/");
    };

    return (
      <div className="navbar bg-base-100 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-row items-center justify-between w-full px-4 mb-2">
            <button onClick={handleBackClick} className="btn btn-ghost">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.41 10.58L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.58Z" fill="black"/>
              </svg>
            </button>
            <a className="btn btn-ghost text-xl mx-auto">나의 플래너</a>
          </div>

          <div className="flex flex-row w-full justify-center gap-4">
            {/* 년도 드롭다운 */}
            <div className="dropdown dropdown-bottom flex-1">
              <div tabIndex={0} role="button" className="btn bg-transparent text-xl text-black m-1 w-full border-none">
                {selectedYear}
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a onClick={() => handleYearSelect(2024)}>2024</a></li>
                <li><a onClick={() => handleYearSelect(2025)}>2025</a></li>
              </ul>
            </div>

            {/* 월 드롭다운 */}
            <div className="dropdown dropdown-bottom flex-1">
              <div tabIndex={0} role="button" className="btn bg-transparent text-xl text-black m-1 w-full border-none">
                {selectedMonth}
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {[...Array(12)].map((_, i) => (
                  <li key={i + 1}><a onClick={() => handleMonthSelect(i + 1)}>{i + 1}</a></li>
                ))}
              </ul>
            </div>

            {/* 일 드롭다운 */}
            <div className="dropdown dropdown-bottom flex-1">
              <div tabIndex={0} role="button" className="btn bg-transparent text-xl text-black m-1 w-full border-none">
                {selectedDay}
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {daysInMonth.map((day) => (
                  <li key={day}><a onClick={() => handleDaySelect(day)}>{day}</a></li>
                ))}
              </ul>
            </div>

            <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>추가하기</button>
          </div>

          {/* 추가 모달 */}
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">플랜 추가하기</h3>
              <label className="input input-bordered flex items-center gap-2 mt-4">
                <input type="text" className="grow" placeholder="플랜적기" value={tempPlan} onChange={(e) => setTempPlan(e.target.value)} />
              </label>
              <label className="input input-bordered flex items-center gap-2 mt-4">
                <input type="text" className="grow" placeholder="메모하기" value={tempMemo} onChange={(e) => setTempMemo(e.target.value)} />
              </label>
              <div className="modal-action">
                <button className="btn" onClick={addPlan}>추가하기</button>
                <button className="btn bg-red-500 text-white" onClick={() => document.getElementById('my_modal_1').close()}>Close</button>
              </div>
            </div>
          </dialog>

          {/* 플랜 리스트 */}
          <div className="flex w-full flex-col mt-4">
            <div className="divider"></div>
            {plans.map((plan, index) => (
              <button  
                key={index}
                className="btn flex items-center justify-between bg-gray-100 p-4 h-20 rounded-lg mb-4" 
                onClick={() => openEditModal(index)} 
              > 
                <div> 
                  <p className="font-bold">{plan.plan}</p> 
                  <p className="text-sm text-gray-600">{plan.memo}</p> 
                </div> 
                <div className="flex items-center gap-2"> 
                  <span className="font-bold text-lg">{plan.dDay}</span> 
                  <input type="checkbox" defaultChecked={plan.completed} className="checkbox" onChange={() => handleCheckboxToggle(index)} /> 
                </div> 
              </button> 
            ))}

            {/* 수정 모달 */}
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">플랜 수정하기</h3>
                <label className="input input-bordered flex items-center gap-2 mt-4">
                  <input type="text" className="grow" placeholder="플랜적기" value={tempPlan} onChange={(e) => setTempPlan(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2 mt-4">
                  <input type="text" className="grow" placeholder="메모하기" value={tempMemo} onChange={(e) => setTempMemo(e.target.value)} />
                </label>
                <div className="modal-action">
                  <button className="btn" onClick={updatePlan}>수정하기</button>
                  <button className="btn bg-red-500 text-white" onClick={deletePlan}>삭제하기</button>
                  <button className="btn" onClick={() => document.getElementById('my_modal_2').close()}>닫기</button>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    );
};

export default StudyPlanner;
