"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-horizontal-datepicker';
import './Calendar_week.css';

function Calendar_week() {
    const router = useRouter();
    const [date, setDate] = useState(new Date("2024-04-30"));
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [title, setTitle] = useState(''); // 일정 제목
    const [memo, setMemo] = useState(''); // 일정 메모
    const [isDDay, setIsDDay] = useState(false); // D-DAY 설정 여부
    const [editingEvent, setEditingEvent] = useState(null); // 현재 수정 중인 일정

    useEffect(() => {
        if (router.query && router.query.selectedDate) {
            const selectedDate = router.query.selectedDate;
            setDate(new Date(selectedDate));
        }
    }, [router.query]);

    useEffect(() => {
        const sampleEvents = [
            { id: 1, date: new Date("2024-04-30"), title: "수업", memo: "오전 10시 수업", isDDay: true, dDayCount: 0 },
            { id: 2, date: new Date("2024-04-30"), title: "스터디", memo: "오후 3시 스터디", isDDay: false }            //실제로는 DB에서 받아서 해야함 예시임 이건
        ];
        setEvents(sampleEvents);
    }, []);

    useEffect(() => {
        const filtered = events.filter(event => event.date.toDateString() === date.toDateString());
        setFilteredEvents(filtered);
    }, [date, events]);

    const selectedDay = (val) => {
        setDate(val);
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        const newEvent = {
            id: events.length + 1,
            date: date,
            title: title,
            memo: memo,
            isDDay: isDDay,
            dDayCount: isDDay ? Math.floor((date - new Date()) / (1000 * 60 * 60 * 24)) : null
        };
        setEvents([...events, newEvent]);
        document.getElementById('my_modal_3').close();
        setTitle('');
        setMemo('');
        setIsDDay(false);
    };

    const openEditModal = (event) => {
        setEditingEvent(event);
        setTitle(event.title);
        setMemo(event.memo);
        setIsDDay(event.isDDay);
        document.getElementById('edit_modal').showModal();
    };

    const handleEditEvent = (e) => {
        e.preventDefault();
        setEvents(events.map(ev => 
            ev.id === editingEvent.id ? { ...ev, title, memo, isDDay } : ev
        ));
        document.getElementById('edit_modal').close();
        setTitle('');
        setMemo('');
        setIsDDay(false);
    };

    const handleDeleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
        document.getElementById('edit_modal').close();
    };

    return (
        <div className="bg-base-100 min-h-screen font-sans" style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>나의 캘린더</h1>
            <div className="custom-date-selector flex justify-end mb-4">
                <button className="btn btn-sm bg-base-300 mr-12 mt-12" onClick={() => document.getElementById('my_modal_3').showModal()}>
                    일정 추가
                </button>
            </div>
            <DatePicker
                getSelectedDay={selectedDay}
                endDate={100}
                style={{marginTop: '20px'}}
                selectDate={date}
                labelFormat={"MMMM"}
                color={"#3b82f6"}          
            />
            {/* 등록된 일정 카드들 */}
            {filteredEvents.map((event) => (
                <div 
                    key={event.id} 
                    className="card bg-base-300 rounded-box my-8" 
                    onClick={() => openEditModal(event)} // 클릭 시 수정 모달 열기
                >
                    <div className="flex justify-between w-full p-4">
                        <div className="text-left">
                            <div style={{ fontWeight: 'bold' }}>{event.title}</div>
                            <div dangerouslySetInnerHTML={{ __html: event.memo.replace(/\n/g, '<br />') }}></div>
                        </div>
                        {event.isDDay && (
                            <div className="font-bold text-center">
                                D{event.dDayCount >= 0 ? `-${event.dDayCount}` : `+${Math.abs(event.dDayCount)}`}
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* 일정 추가 모달 */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-base-200">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
                        <h3 className="font-bold text-lg">일정 추가</h3>
                        <div className="py-4">
                            <div>
                                <span>선택된 날짜: </span>
                                <strong>{date.toLocaleDateString()}</strong>
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
                            <button className="btn btn-outline bg-base-300" onClick={handleAddEvent}>추가하기</button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* 일정 수정/삭제 모달 */}
            <dialog id="edit_modal" className="modal">
                <div className="modal-box bg-base-200">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('edit_modal').close()}>✕</button>
                        <h3 className="font-bold text-lg">일정 수정</h3>
                        <div className="py-4">
                            <div>
                                <span>선택된 날짜: </span>
                                <strong>{date.toLocaleDateString()}</strong>
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
                            <button className="btn btn-error text-white" onClick={() => handleDeleteEvent(editingEvent.id)}>삭제하기</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default Calendar_week;
