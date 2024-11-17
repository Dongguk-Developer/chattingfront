"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginChecker from "../LoginChecker";
import { CURRENT_BACKEND } from '../res/path';
import {CalendarIcon,HomeIcon,PlannerIcon} from "../components/icons.js"

const StudyPlanner = () => {
    const [selectedYear, setSelectedYear] = useState("년도");
    const [selectedMonth, setSelectedMonth] = useState("월");
    const [selectedDay, setSelectedDay] = useState("일");
    const [daysInMonth, setDaysInMonth] = useState(["년도/월을 선택하세요"]);
    const [plans, setPlans] = useState([]);
    const [tempPlan, setTempPlan] = useState("");
    const [tempMemo, setTempMemo] = useState("");
    const [tempDDay, setTempDDay] = useState("D-10");
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
    const router = useRouter();

    const changed_date = async() => {
      if(selectedYear=="년도"||selectedMonth=="월"||selectedDay=="일"){return;}
      const response = await fetch(CURRENT_BACKEND+"/studyplanner/search", {
        method: "POST",
        body: JSON.stringify({
          year: selectedYear,
          month: selectedMonth,
          day:selectedDay
        }),
        credentials: "include"
      }).then(async(res)=>{
        let response = await res.json();
        console.log(response)
        const formattedPlans = response.map((plan) => ({
          plan: plan.planner_schedule_name,
          memo: plan.planner_schedule_status,
          dDay: plan.planner_date,
          completed: false,
        }));
        setPlans((prevPlans) => [...prevPlans, ...formattedPlans]); // 기존 상태에 추가
        // setPlans([...plans, { plan: tempPlan, memo: tempMemo, dDay: tempDDay, completed: false }]);
        
      })
    }

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
    const handleYearSelect = async(year) => {
        setSelectedYear(`${year}년`);
        if (selectedMonth !== "월") {
            setDaysInMonth(calculateDaysInMonth(year, parseInt(selectedMonth)));
            await changed_date();
        }
    };

    // 월 선택 핸들러
    const handleMonthSelect = async(month) => {
        setSelectedMonth(`${month}월`);
        if (selectedYear !== "년도") {
            setDaysInMonth(calculateDaysInMonth(parseInt(selectedYear), month));
            await changed_date();
        }
    };

    const handleDaySelect = async(day) => {
      if(day=="년도/월을 선택하세요"){return;}
      setSelectedDay(`${day}일`);
      await changed_date();
    };

    const addPlan = async() => {
        if (tempPlan && tempMemo) {
            setPlans([...plans, { plan: tempPlan, memo: tempMemo, dDay: tempDDay, completed: false }]);
            const response = await fetch(CURRENT_BACKEND+"/studyplanner/create", {
              method: "POST",
              body: JSON.stringify({
                planner_year: selectedYear,
                planner_month: selectedMonth,selectedDay,
                planner_date: selectedDay,
                planner_schedule_name: tempPlan,
                planner_schedule_status:tempMemo
              }),
              credentials: "include"
            }).then(async(res)=>{
              let response = await res;
              console.log(response)
              
            })
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
    const PlannerIcon = ()=>{
      return (<svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.66663 17.5H18.3333"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
        />
        <path
          d="M1.66663 17.5H18.3333"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.83337 11.6666H3.33337V17.5H5.83337V11.6666Z"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <path
          d="M11.25 7.5H8.75V17.5H11.25V7.5Z"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <path
          d="M16.6666 2.5H14.1666V17.5H16.6666V2.5Z"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      </svg>)
    }
    const HomeIcon = ()=>{
      return (<svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.75 7.5V17.5H16.25V7.5L10 2.5L3.75 7.5Z"
          fill="#3B82F6"
          stroke="#3B82F6"
          style={{
            fill: "#3B82F6",
            fill: "color(display-p3 0.2314 0.5098 0.9647)",
            fillOpacity: 1,
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.91663 12.0834V17.5H12.0833V12.0834H7.91663Z"
          fill="white"
          stroke="white"
          style={{
            fill: "white",
            fillOpacity: 1,
            stroke: "white",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <path
          d="M3.75 17.5H16.25"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>)
    }
    const CalendarIcon = ()=>{
      return (<svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.25 2.5H3.75C3.05964 2.5 2.5 3.05964 2.5 3.75V16.25C2.5 16.9404 3.05964 17.5 3.75 17.5H16.25C16.9404 17.5 17.5 16.9404 17.5 16.25V3.75C17.5 3.05964 16.9404 2.5 16.25 2.5Z"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinejoin="bevel"
        />
        <path
          d="M2.5 9.16663H17.5"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinejoin="bevel"
        />
        <path
          d="M12.0834 9.16667V2.5"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinejoin="bevel"
        />
        <path
          d="M10.8334 2.5H13.3334"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinejoin="bevel"
        />
        <path
          d="M2.5 7.91663V10.4166"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinejoin="bevel"
        />
        <path
          d="M17.5 7.91663V10.4166"
          stroke="#3B82F6"
          style={{
            stroke: "#3B82F6",
            stroke: "color(display-p3 0.2314 0.5098 0.9647)",
            strokeOpacity: 1,
          }}
          strokeWidth={2}
          strokeLinejoin="bevel"
        />
      </svg>)
    }
    return (
      <>
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
                <li><a onClick={() => handleYearSelect(2026)}>2026</a></li>
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

            <button className="btn" onClick={() => {
              if(selectedYear!=="년도"&&selectedMonth!=="월"&&selectedDay!=="일")
              {document.getElementById('my_modal_1').showModal()}}}>추가하기</button>
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
          {/*
          
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
          */}
          {/* 플랜 리스트 */}
          <div className="flex w-full flex-col mt-4">
            <div className="divider"></div>
            {plans.map((plan, index) => (
              <>
              <button key={"key_"+index} className='btn flex justify-between items-center bg-gray-100 p-4 h-20 rounded-lg mb-4'>
                <div onClick={() => openEditModal(index)}>
                  <p className="font-bold">{plan.plan}</p>
                  <p className="text-sm text-gray-600">{plan.memo}</p> 
                </div>
                <div className='grow h-full' onClick={() => openEditModal(index)}></div>
                <div className="flex items-center gap-2"> 
                  <label htmlFor={index} className="font-bold text-lg">{plan.dDay}</label> 
                  <input id={index} type="checkbox" defaultChecked={plan.completed} className="checkbox" onChange={() => handleCheckboxToggle(index)} /> 
                </div> 
              </button> 
              </>
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
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t w-full h-30">
      <div className="flex justify-around py-4">
        <button className="flex flex-col items-center" onClick={()=>{location.href="/"}}>
          <HomeIcon/>
          <span className="text-sm text-blue-500">홈</span>
        </button>
        <button className="flex flex-col items-center" onClick={()=>{location.href="/calendar"}}>
          <CalendarIcon/>
          <span className="text-sm text-blue-500">캘린더</span>
        </button>
        <button className="flex flex-col items-center" onClick={()=>{location.href="/studyplanner"}}>
          <PlannerIcon/>
          <span className="text-sm text-blue-500">플래너</span>
        </button>
      </div>
    </nav>
      </>
    );
};

export default StudyPlanner;