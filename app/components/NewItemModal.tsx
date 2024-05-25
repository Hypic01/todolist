import React, { useState } from "react";

const NewItemModal = () => {
  const [newItem, setNewItem] = useState("");

  const newItemHandle = (e) => {
    setNewItem(e.target.value);
  };

  return (
    <>
      <button
        className="btn w-max self-center"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        <h1 className="">Add Item</h1>
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-6">Add Item</h3>
          <input
            type="text"
            value={newItem}
            onChange={newItemHandle}
            className="h-[40px] w-full p-4"
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={addItemHandle} className="btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NewItemModal;
