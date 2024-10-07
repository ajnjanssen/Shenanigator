import React, { useState, useEffect } from "react";
import Divider from "../divider/Divider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/services/firebase";

interface ModalProps {
  shenanigan?: string;
  selectedUser?: string;
  users?: string[];
  id?: string;
}

function Modal({ shenanigan, selectedUser, users = [], id }: ModalProps) {
  const [editedShenanigan, setEditedShenanigan] = useState(shenanigan || "");
  const [editedUser, setEditedUser] = useState(selectedUser || "");

  useEffect(() => {
    setEditedShenanigan(shenanigan || "");
    setEditedUser(selectedUser || "");
  }, [shenanigan, selectedUser]);

  const handleSave = async () => {
    if (!id) return;

    const shenaniganRef = doc(db, "shenanigans", id);

    try {
      await updateDoc(shenaniganRef, {
        shenanigen: editedShenanigan,
        selectedUser: editedUser,
      });
      console.log("Document successfully updated!");
      (document.getElementById("my_modal_3") as HTMLDialogElement).close();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error btn-sm absolute right-2 top-2">
              Close
            </button>
          </form>
          <h3 className="font-bold text-lg">Shenanigan</h3>
          <p className="py-4">Foutje gemaakt? pas het eenvoudig aan 😃</p>
          <Divider />
          <label className="block text-sm font-semibold mb-4">Shenanigan</label>
          <textarea
            className="textarea textarea-bordered w-full mb-4"
            placeholder="Bio"
            value={editedShenanigan}
            onChange={(e) => setEditedShenanigan(e.target.value)}
          />

          <label className="block text-sm font-semibold mb-4">
            Selected user
          </label>
          <select
            className="select select-bordered w-full mb-4"
            value={editedUser}
            onChange={(e) => setEditedUser(e.target.value)}
          >
            <option key="placeholder" disabled value="">
              Select a user
            </option>
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary btn-wide w-full"
            onClick={handleSave}
          >
            Save changes
          </button>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
