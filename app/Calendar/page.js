"use client"; // 클라이언트 컴포넌트로 설정
import React, { useState, useEffect } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // 캘린더 커스텀 CSS

export default function Calendar() {
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

  const handleAddEvent = () => {
    const event = {
      title,
      memo,
      date: selectedDate,
      isDDay,
      dDayCount: calculateDDay(selectedDate),
    };
    const newEvents = [...events, event];
    setEvents(newEvents);
    
    // 로컬 스토리지에 저장
    localStorage.setItem('events', JSON.stringify(newEvents));
    
      // visibleEventsCount를 늘려서 즉시 더보기 버튼이 나타나게 함
      if (newEvents.length > visibleEventsCount) {
        setVisibleEventsCount(prevCount => prevCount + 1);
      }

      resetForm();
      document.getElementById('my_modal_3').close(); // 모달 닫기
    };
  
  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
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

  const handleDeleteEvent = (index) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents)); // 로컬 스토리지 업데이트
  };
  

  const openEditModal = (index) => {
    const eventToEdit = events[index];
    setEditingIndex(index);
    setTitle(eventToEdit.title);
    setMemo(eventToEdit.memo);
    setIsDDay(eventToEdit.isDDay);
    document.getElementById('edit_modal').showModal(); // 수정 모달 열기
  };

  const handleEditEvent = () => {
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
    
    // 로컬 스토리지에 저장
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    
    resetForm();
    setEditingIndex(null);
    document.getElementById('edit_modal').close(); // 수정 모달 닫기
  };


  return (
    <div className="calendar-container">
      <h2>나의 캘린더</h2>

      <div className="custom-date-selector flex items-center justify-between mb-4">
        <div className="flex items-center">
          <select value={selectedYear} onChange={handleYearChange} className="font-bold text-xl p-2 mr-2">
            {years.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
          <select value={selectedMonth} onChange={handleMonthChange} className="font-bold text-xl p-2">
            {months.map(month => (
              <option key={month} value={month}>{month + 1}월</option>
            ))}
          </select>
        </div>
        <button className="btn btn-sm mr-4" onClick={() => document.getElementById('my_modal_3').showModal()}>
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
      />

      <div className="divider" style={{ width: '100%' }}></div>

      {/* 등록된 일정 카드들 */}
      {events.slice(0, visibleEventsCount).map((event, index) => (
        <div 
            key={index} 
            className="card bg-base-300 rounded-box my-2" 
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
                    D{event.dDayCount >= 0 ? `-${event.dDayCount}` : `+${Math.abs(event.dDayCount)}`}
                </div>
                )}
            </div>
            </div>
        </div>
      ))}

      {/* 더보기 버튼 */}
      {events.length > visibleEventsCount && (
        <button className="btn btn-ghost btn-sm" onClick={handleShowMore}>
          더보기
        </button>
      )}

      {/* 일정 추가 모달 */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
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
              <button className="btn" onClick={handleAddEvent}>추가하기</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* 수정 모달 */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
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
              <button className="btn" onClick={handleEditEvent}>수정하기</button>
              <button className="btn btn-error" onClick={() => handleDeleteEvent(editingIndex)}>삭제하기</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}