"use client"; //client side rendering

export default function OpenModal() {
  return (
    <button className="btn" onClick={() => my_modal_1.showModal()}>
      open modal
    </button>
  );
}
