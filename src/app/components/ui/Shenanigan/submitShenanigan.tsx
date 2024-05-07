import { db } from "@/app/services/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
  assignedUser: string;
  byUser: string;
}

const NewItem: React.FC = () => {
  const [itemName, setItemName] = useState("");
  const [byUser, setByUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState(""); // State to hold the selected user's name
  const [users, setUsers] = useState<Item[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Users"));
        const fetchedUsers = querySnapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            } as unknown as Item)
        );
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const dateCreated = new Date();

    if (!byUser) {
      console.error("No user selected");
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "Users", byUser));
      if (!userDoc.exists()) {
        console.error("User not found");
        return;
      }

      const newDocRef = doc(collection(db, "shenanigans"));
      await setDoc(newDocRef, {
        setByUser: byUser,
        shenanigen: itemName,
        user: byUser,
        counter: 0,
        dateCreated,
        selectedUser: selectedUserName, // Use the name of the selected user
      });

      setItemName("");
      setByUser("");
      setSelectedUserName(""); // Reset selected user name
    } catch (error) {
      console.error("Error processing the form", error);
    }
  };

  return (
    <div className="w-full p-4 bg-base-200 my-4 rounded-md">
      <form
        className="flex items-center justify-end gap-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="Shenanigan"
            className="input input-bordered w-full"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
          <select
            className="select select-bordered"
            value={byUser}
            onChange={(e) => {
              const selectedId = e.target.value;
              setByUser(selectedId);
              const selectedUser = users.find((user) => user.id === selectedId);
              setSelectedUserName(selectedUser ? selectedUser.name : "");
            }}
          >
            <option key="placeholder" disabled value="">
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Shenanigan
        </button>
      </form>
    </div>
  );
};

export default NewItem;
