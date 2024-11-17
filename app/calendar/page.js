"use client"; // 클라이언트 컴포넌트로 설정
import React, { useState, useEffect } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // 캘린더 커스텀 CSS
import Image from "next/image";
import Link from "next/link";
import LoginChecker from "../LoginChecker";
import { CURRENT_BACKEND } from '../res/path';
import {CalendarIcon,HomeIcon,PlannerIcon} from "../components/icons.js"


function CalendarPage({user,setUserData}) {
  const [date, setDate] = useState(new Date()); // 선택된 날짜
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
  const [selectedDate, setSelectedDate] = useState(date); // 선택된 날짜
  const [events, setEvents] = useState([]); // 일정 저장을 위한 상태
  const [title, setTitle] = useState(''); // 제목 상태
  const [memo, setMemo] = useState(''); // 메모 상태
  const [isDDay, setIsDDay] = useState(false); // D-DAY 상태
  const [editingIndex, setEditingIndex] = useState(null); // 수정할 일정의 인덱스
  const [visibleEventsCount, setVisibleEventsCount] = useState(4); // 보여줄 일정 개수 상태
  const [showAlert, setShowAlert] = useState(false); // 알림 상태
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const today = new Date(); // 오늘 날짜

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedYear(newDate.getFullYear());
    setSelectedMonth(newDate.getMonth());
    setSelectedDate(newDate); // 선택된 날짜 업데이트
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value);
    setSelectedYear(newYear);
    setDate(new Date(newYear, selectedMonth, Math.min(date.getDate(), new Date(newYear, selectedMonth + 1, 0).getDate()))); // 해당 월의 마지막 날짜를 고려하여 일 설정
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value);
    setSelectedMonth(newMonth);
    setDate(new Date(selectedYear, newMonth, Math.min(date.getDate(), new Date(selectedYear, newMonth + 1, 0).getDate()))); // 해당 월의 마지막 날짜를 고려하여 일 설정
  };

  const handleAddEvent = async() => {
    const event = {
      title,
      memo,
      date: selectedDate,
      isDDay,
      dDayCount: calculateDDay(selectedDate),
    };
    
    
    const res = await fetch(CURRENT_BACKEND+"/calender/create", {
      method: "POST",
      body: JSON.stringify({
        title:title,
        memo:memo,
        date: selectedDate,
        isdday:isDDay}),
        credentials: "include",  // 쿠키를 포함하여 요청
      })
    const newEvents = [...events, event];
    setEvents(newEvents);
      // 로컬 스토리지에 저장
    // localStorage.setItem('events', JSON.stringify(newEvents));
    console.log('저장된 날짜:', selectedDate.toISOString()); // 로그 추가

    // visibleEventsCount를 늘려서 즉시 더보기 버튼이 나타나게 함
    if (newEvents.length > visibleEventsCount) {
      setVisibleEventsCount(prevCount => prevCount + 1);
    }

    resetForm();
    document.getElementById('my_modal_3').close(); // 모달 닫기
  };
  
  useEffect(() => {
    // const savedEvents = localStorage.getItem('events');
    const get_events = async()=>{

      const res = await fetch(CURRENT_BACKEND+"/calender/getall", {
        method: "POST",
        credentials: "include",  // 쿠키를 포함하여 요청
        }).then(async(res)=>{
          let response = await res.json();
          // console.log(response)
          let event_dates = []
          for(let i=0;i<response.length;i++){
            event_dates.push(
              {
                "id":response[i].id,
                "date":new Date(response[i].date+"T00:00:00.000Z"),
                "title":response[i].title,
                "memo":response[i].memo,
                "isDDay":response[i].isDDay,
                "dDayCount": calculateDDay(new Date(response[i].date+"T00:00:00.000Z"))
              }
            )
          }
          const field = "dDayCount"
          const ascending = true
          event_dates = event_dates.sort((a, b) => {
            if (a[field] < b[field]) return ascending ? -1 : 1;
            if (a[field] > b[field]) return ascending ? 1 : -1;
            return 0;
          });
          console.log(event_dates)
          setEvents(event_dates)
          // console.log(res.status);
        })
    }
    get_events()
    // if (savedEvents) {
    //   setEvents(JSON.parse(savedEvents));
    // }
  }, []);

  const handleShowMore = () => {
    setVisibleEventsCount(prevCount => prevCount + 5); // 5개씩 늘리기
    if (visibleEventsCount + 5 >= events.length) {
      document.querySelector('.calendar-container').classList.add('expanded'); // 모든 이벤트가 표시되면 확장
    }
  };

  const resetForm = () => {
    setTitle(''); // 제목 초기화
    setMemo(''); // 메모 초기화
    setIsDDay(false); // D-DAY 초기화
  };

  const calculateDDay = (eventDate) => {
    const todayDate = new Date();
    const diffTime = eventDate - todayDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const years = Array.from({ length: 50 }, (_, i) => selectedYear - 25 + i);
  const months = Array.from({ length: 12 }, (_, i) => i);

  // 일정 삭제 함수
  const handleDeleteEvent = async(index) => {
    console.log(events[index])
    const res = await fetch(CURRENT_BACKEND+"/calender/delete", {
      method: "POST",
      body: JSON.stringify({calender_id:events[index].id}),
        credentials: "include",  // 쿠키를 포함하여 요청
      })
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
    // localStorage.setItem('events', JSON.stringify(newEvents)); // 로컬 스토리지 업데이트
  };
  

  const openEditModal = (index) => {
    const eventToEdit = events[index];
    setEditingIndex(index);
    setTitle(eventToEdit.title);
    setMemo(eventToEdit.memo);
    setIsDDay(eventToEdit.isDDay);
    setSelectedDate(eventToEdit.date);
    document.getElementById('edit_modal').showModal(); // 수정 모달 열기
  };

  const handleEditEvent = async() => {
    const updatedEvent = {
      title,
      memo,
      date: selectedDate,
      isDDay,
      dDayCount: calculateDDay(selectedDate),
    };

    const updatedEvents = [...events];
    updatedEvents[editingIndex] = updatedEvent; // 수정된 일정으로 업데이트
    setEvents(updatedEvents);
    
    const res = await fetch(CURRENT_BACKEND+"/calender/update", {
      method: "POST",
      body: JSON.stringify({
        id:events[editingIndex].id,
        title:title,
        memo:memo,
        date: selectedDate,
        isdday:isDDay}),
        credentials: "include",  // 쿠키를 포함하여 요청
      })
    resetForm();
    setEditingIndex(null);
    document.getElementById('edit_modal').close(); // 수정 모달 닫기
  };

  const handleDateClick = (value) => {
    // 클릭한 날짜를 로컬 스토리지에 저장
    // localStorage.setItem('selectedDate', value.toISOString());
    const eventsForDate = events.filter(event => {
      const eventDate = new Date(event.date);
      console.log(event)
      // console.log(value.toDateString())
      // console.log(eventDate.toDateString() === value.toDateString())
      return eventDate.toDateString() === value.toDateString();
    });
    // return;
    if (eventsForDate.length > 0) {
      // value.setDate(value.getDate() + 1);
      // 일정이 있을 경우 페이지 이동
      // window.location.href = `/calendar_week?date=${value.toISOString()}`; // 일정이 있을 경우 페이지 이동
    } else {
      // 일정이 없을 경우 알림 표시
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1000); // 2초 후 알림 숨기기
    }
  };

  return (
    <div className="bg-base-100 min-h-screen font-sans" style={{ textAlign: 'center', marginBottom: '20px',paddingBottom:"10rem" }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold',marginTop:"4rem"}}>나의 캘린더</h1> {/* 중앙에 위치한 텍스트 */}

      {showAlert && (
        <div role="alert" className="alert alert-error text-error-content cursor-pointer" style={{
            width:"20rem",
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
        }} onClick={()=>{setShowAlert(false);}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-white"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className='text-[#FFF]'>선택한 날짜에 일정이 없습니다.</span>
        </div>
      )}

      <div className="custom-date-selector flex items-center justify-between mb-4 text-base-content">
        <div className="flex items-center">
          <select value={selectedYear} onChange={handleYearChange} className="font-bold text-xl p-2 ml-8 mr-4">
            {years.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
          <select value={selectedMonth} onChange={handleMonthChange} className="font-bold text-xl mr-4 p-2">
            {months.map(month => (
              <option key={month} value={month}>{month + 1}월</option>
            ))}
          </select>
        </div>
        <button className="btn btn-sm mr-12" onClick={() => document.getElementById('my_modal_3').showModal()}>
          일정 추가
        </button>
      </div>

      <ReactCalendar
        onChange={handleDateChange}
        value={date}
        locale="en-US"
        showNavigation={false}
        tileClassName={({ date }) => {
          const isToday = date.toDateString() === today.toDateString();
          const isSelectedDate = date.toDateString() === selectedDate.toDateString();
          return isToday ? 'react-calendar__tile--now' : (isSelectedDate ? 'react-calendar__tile--selected' : '');
        }}
        activeStartDate={new Date(selectedYear, selectedMonth)}
        onClickDay={handleDateClick}
      />

      <div className="divider" style={{ width: '100%' }}></div>

            {/* 등록된 일정 카드들 */}
          {sortedEvents.slice(0, visibleEventsCount).map((event, index) => (
          <div 
            key={index} 
            className="card bg-base-300 rounded-box my-4 text-base-content" 
            onClick={() => openEditModal(index)} // 클릭 시 수정 모달 열기
          >
          <div className="flex justify-between w-full">
            <div className="flex-1 text-left">
              <div style={{ fontWeight: 'bold' }}>{event.title}</div>
              <div style={{ fontWeight: 'normal' }} dangerouslySetInnerHTML={{ __html: event.memo.replace(/\n/g, '<br />') }}></div>
            </div>
            <div className="flex items-center ml-2">
              {event.isDDay && (
                <div className="font-bold mr-2">
                  D{event.dDayCount >= 0 ? `-${event.dDayCount}` : `+${Math.abs(event.dDayCount)}`}        {/* 디데이 계산 */}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* 더보기 버튼 */}
      {events.length > visibleEventsCount && (
        <button className="btn btn-ghost btn-sm text-base-content" onClick={handleShowMore}>
          더보기
        </button>
      )}

      {/* 일정 추가 모달 */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-base-200 text-base-content">
          <form method="dialog">
            <button className="btn btn-sm F absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
            <h3 className="font-bold text-lg">일정 추가</h3>
            <div className="py-4">
              <div>
                <span>선택된 날짜: </span>
                <strong>{selectedDate.toLocaleDateString()}</strong>
              </div>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                className="input input-bordered w-full mt-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="메모를 입력하세요"
                className="textarea textarea-bordered w-full mt-2"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
              <label className="label cursor-pointer">
                <span className="label-text">D-DAY로 설정하기</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isDDay}
                  onChange={() => setIsDDay(!isDDay)}
                />
              </label>
            </div>
            <div className="modal-action">
              <button className="btn btn-outline bg-base-300 text-base-content" onClick={handleAddEvent}>추가하기</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* 수정 모달 */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box bg-base-200">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('edit_modal').close()}>✕</button>
            <h3 className="font-bold text-lg">일정 수정</h3>
            <div className="py-4">
              <div>
                <span>선택된 날짜: </span>
                <strong>{selectedDate.toLocaleDateString()}</strong>
              </div>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                className="input input-bordered w-full mt-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="메모를 입력하세요"
                className="textarea textarea-bordered w-full mt-2"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
              <label className="label cursor-pointer">
                <span className="label-text">D-DAY로 설정하기</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isDDay}
                  onChange={() => setIsDDay(!isDDay)}
                />
              </label>
            </div>
            <div className="modal-action">
              <button className="btn btn-info text-white" onClick={handleEditEvent}>수정하기</button>
              <button className="btn btn-error text-white" onClick={() => handleDeleteEvent(editingIndex)}>삭제하기</button>
            </div>
          </form>
        </div>
      </dialog>
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
    </div>
  );
}
export default function Page() {
  const [userData, setUserData] = useState(null);
  
return (
  <LoginChecker setUserData={setUserData}>
  {!userData?<div className="absolute h-screen w-screen z-50 bg-white bg-opacity-50">
  <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col h-screen justify-center">
      <div className="text-4xl font-extrabold text-blue-600 tracking-wide">
        Loading...
      </div>
    </div>
  </div>
</div>:<CalendarPage user={userData} setUserData={setUserData} />

}
</LoginChecker>

);
}