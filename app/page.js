import Image from "next/image";
import Link from "next/link";
import OpenModal from "./client";

// 각 페이지에 대한 컴포넌트
function Home() {
  return <h2>스터디히어로 - 메인 페이지</h2>;
}

function Login() {
  return <h2>로그인 페이지</h2>;
}

function Settings() {
  return <h2>설정 페이지 (MBTI, 관심 분야 선택)</h2>;
}

function Calendar() {
  return <h2>캘린더 페이지</h2>;
}

function StudyPlanner() {
  return <h2>스터디 플래너 페이지</h2>;
}

function Rankings() {
  return <h2>랭킹 페이지</h2>;
}

function Profile() {
  return <h2>프로필 페이지</h2>;
}

function Chat() {
  return <h2>채팅 페이지</h2>;
}

export default function Page() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="p-4">
        <button className="btn btn-primary">primary</button>
        <button className="btn btn-secondary">secondary</button>
        <button className="btn btn-accent">accent</button>
      </div>

      <div className="p-4" data-theme="cupcake">
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
      </div>

      <div className="tabs tabs-lifted p-4">
        <button className="tab">Tab 1</button>
        <button className="tab tab-active">Tab 2</button>
        <button className="tab">Tab 3</button>
        <button className="tab"></button>
      </div>

      <div className="p-4">
        <input type="checkbox" className="toggle" />
        <input type="checkbox" className="toggle toggle-primary" />
        <input type="checkbox" className="toggle toggle-secondary" />
        <input type="checkbox" className="toggle toggle-accent" />
        <br />
        <input type="checkbox" className="checkbox" />
        <input type="checkbox" className="checkbox-primary checkbox" />
        <input type="checkbox" className="checkbox-secondary checkbox" />
        <input type="checkbox" className="checkbox-accent checkbox" />
        <br />
        <input type="radio" name="radio" className="radio" />
        <input type="radio" name="radio" className="radio-primary radio" />
        <input type="radio" name="radio" className="radio-secondary radio" />
        <input type="radio" name="radio" className="radio-accent radio" />
      </div>

      <div className="card m-4 w-80 shadow">
        <figure>
          <img src="https://picsum.photos/id/103/500/250" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">DaisyUI Card</h2>
          <p>
            Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit
            sit necessitatibus.
          </p>
        </div>
      </div>

      <details className="dropdown m-4">
        <summary className="btn m-1">open/close dropdown</summary>
        <ul className="dropdown-content menu z-[2] w-52 rounded-box bg-base-200 p-2">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </details>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>

      <ul className="steps my-4 w-full">
        <li className="step step-primary">Register</li>
        <li className="step step-primary">Choose plan</li>
        <li className="step">Purchase</li>
        <li className="step">Receive Product</li>
      </ul>
    </div>
  );
}
