"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const StudyPlanner = () => {
    const [selectedYear, setSelectedYear] = useState("년도");
    const [selectedMonth, setSelectedMonth] = useState("월");
    const [selectedDay, setSelectedDay] = useState("일");
    const [plans, setPlans] = useState([]);
    const [tempPlan, setTempPlan] = useState("");
    const [tempMemo, setTempMemo] = useState("");
    const [tempDDay, setTempDDay] = useState("D-10");
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(null); // 선택된 플랜의 인덱스
    const router = useRouter();

    const handleYearSelect = (year) => {
        setSelectedYear(`${year}년`);
    };

    const handleMonthSelect = (month) => {
        setSelectedMonth(`${month}월`);
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
          
          {/* 뒤로 가기 버튼과 "나의 플래너"를 수평으로 정렬 */}
          <div className="flex flex-row items-center justify-between w-full px-4 mb-2">
            <button onClick={handleBackClick} className="btn btn-ghost">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.41 10.58L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.58Z" fill="black"/>
              </svg>
            </button>
            
            <a className="btn btn-ghost text-xl mx-auto">나의 플래너</a>
          </div>

          {/* 년도와 월을 수평으로 정렬 */}
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
                <li><a onClick={() => handleMonthSelect(1)}>1</a></li>
                <li><a onClick={() => handleMonthSelect(2)}>2</a></li>
              </ul>
            </div>

            {/* 일 드롭다운 */}
            <div className="dropdown dropdown-bottom flex-1">
              <div tabIndex={0} role="button" className="btn bg-transparent text-xl text-black m-1 w-full border-none">
                {selectedDay}
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a onClick={() => handleDaySelect(1)}>1</a></li>
                <li><a onClick={() => handleDaySelect(2)}>2</a></li>
              </ul>
            </div>

            {/* 추가하기 버튼 */}
            <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>추가하기</button>

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
          </div>

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
                  <input type="checkbox" defaultChecked className="checkbox" />
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
