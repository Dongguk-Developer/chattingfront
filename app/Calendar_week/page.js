"use client"; // 클라이언트 컴포넌트로 설정
import React, { useEffect, useState } from 'react';
import './Calendar_week.css'; // 캘린더 커스텀 CSS

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

function Calendar_week() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState([]); // 일정 저장을 위한 상태
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
  const [title, setTitle] = useState(''); // 제목 상태
  const [memo, setMemo] = useState(''); // 메모 상태
  const [isDDay, setIsDDay] = useState(false); // D-DAY 상태

  // 주간 날짜 계산
  const getWeekDates = (date) => {
    const startOfWeek = date.getDate() - date.getDay(); // 일요일 날짜
    return Array.from({ length: 7 }, (_, i) => {
      const weekDate = new Date(date.setDate(startOfWeek + i));
      return weekDate;
    });
  };

  const weekDates = getWeekDates(new Date(currentWeek));

  const handleNextWeek = () => {
    setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)));
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)));
  };

  const handleAddEvent = (date) => {
    const event = {
      title,
      memo,
      date: date,
      isDDay,
      dDayCount: calculateDDay(date),
    };
    const newEvents = [...events, event];
    setEvents(newEvents);
    
    // 로컬 스토리지에 저장
    localStorage.setItem('events', JSON.stringify(newEvents));

    resetForm();
    document.getElementById('event_modal').close(); // 모달 닫기
  };

  const calculateDDay = (eventDate) => {
    const todayDate = new Date();
    const diffTime = eventDate - todayDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const resetForm = () => {
    setTitle(''); // 제목 초기화
    setMemo(''); // 메모 초기화
    setIsDDay(false); // D-DAY 초기화
  };

  return (
    <div className="weekly-calendar" style={{ textAlign: 'center' }}>
      <h2>주간 캘린더</h2>
      <div className="flex justify-between mb-4">
        <button onClick={handlePreviousWeek} className="btn btn-ghost">이전 주</button>
        <button onClick={handleNextWeek} className="btn btn-ghost">다음 주</button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {weekDates.map((date, index) => (
          <div 
            key={index} 
            className="day-tile bg-base-300 p-4 rounded-lg cursor-pointer"
            onClick={() => {
              setSelectedDate(date);
              document.getElementById('event_modal').showModal(); // 일정 추가 모달 열기
            }} // 클릭 시 일정 추가 모달 열기
          >
            <div className="day-name">{daysOfWeek[index]}</div>
            <div className="day-date">{date.getDate()}</div>
          </div>
        ))}
      </div>

      {/* 일정 추가 모달 */}
      <dialog id="event_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('event_modal').close()}>✕</button>
            <h3 className="font-bold text-lg">일정 추가</h3>
            <div className="py-4">
              <div>
                <span>선택된 날짜: </span>
                <strong>{selectedDate && selectedDate.toLocaleDateString()}</strong>
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
              <button className="btn" onClick={() => handleAddEvent(selectedDate)}>추가하기</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* 등록된 일정 표시 */}
      <div className="events-section mt-4">
        <h3>등록된 일정</h3>
        {events.map((event, index) => (
          <div key={index} className="event-card bg-base-300 p-2 my-2 rounded-lg">
            <div><strong>{event.title}</strong></div>
            <div>{event.memo}</div>
            {event.isDDay && (
              <div className="font-bold">
                D{event.dDayCount >= 0 ? `-${event.dDayCount}` : `+${Math.abs(event.dDayCount)}`}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar_week;
