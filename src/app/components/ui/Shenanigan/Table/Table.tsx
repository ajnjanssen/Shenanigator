import React, { useEffect, useState } from "react";
import Shenanigan from "./Shenanigan";
import Modal from "@/app/components/ui/modal/Modal";
import { auth, db } from "@/app/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

interface User {
  name?: string;
  image?: string;
  level?: number;
  avatar?: string;
}

interface ShenaniganData {
  level: string;
  image: string;
  id: string;
  userId: string;
  username: string;
  userImage: string;
  userLevel: string;
  counter: number;
  setShenanigan: string;
  dateCreated: string;
  setByUser: string;
  selectedUser: string;
}

function Table() {
  const [user] = useAuthState(auth);
  const [shenanigans, setShenanigans] = useState<ShenaniganData[]>([]);
  const [selectedShenanigan, setSelectedShenanigan] =
    useState<ShenaniganData | null>(null);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const getShenanigans = async () => {
      const querySnapshot = await getDocs(collection(db, "shenanigans"));
      const usersSnapshot = await getDocs(collection(db, "Users"));
      const usersData: Record<string, User> = usersSnapshot.docs.reduce(
        (acc, userDoc) => {
          const userData = userDoc.data() as User;
          acc[userData.name || ""] = userData; // Use name as the key
          return acc;
        },
        {} as Record<string, User>
      );

      const shenanigansData: ShenaniganData[] = querySnapshot.docs.map(
        (doc) => {
          const shenanigan = doc.data();
          const user = usersData[shenanigan.selectedUser] || {}; // Lookup by name
          return {
            id: doc.id,
            userId: shenanigan.user,
            username: user.name || "Unknown",
            level: user.level?.toString() || "Unknown",
            image: user.image || "",
            userImage: user.avatar || "",
            userLevel: user.level?.toString() || "Unknown",
            counter: shenanigan.counter,
            setShenanigan: shenanigan.shenanigen,
            dateCreated: shenanigan.dateCreated.toDate().toString(),
            setByUser: shenanigan.setByUser,
            selectedUser: shenanigan.selectedUser,
          };
        }
      );

      setShenanigans(shenanigansData);
      setUsers(Object.keys(usersData));
    };

    getShenanigans();
  }, [user?.uid]);

  const handleEditClick = (shenanigan: ShenaniganData) => {
    setSelectedShenanigan(shenanigan);
    (document.getElementById("my_modal_3") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="overflow-x-auto bg-base-200 rounded-md">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>User</th>
            <th>Shenanigan</th>
            <th className="pl-8">Votes</th>
            <th className="pl-8">Edit</th>
          </tr>
        </thead>
        <tbody>
          {shenanigans.map((shenanigan) => (
            <Shenanigan
              key={shenanigan.id}
              id={shenanigan.id}
              userImage={shenanigan.userImage}
              setShenanigan={shenanigan.setShenanigan}
              userLevel={shenanigan.userLevel}
              counter={shenanigan.counter}
              showEditButton={
                user !== null && user?.uid === shenanigan.setByUser
              }
              user={shenanigan.userId}
              username={shenanigan.username}
              onEditClick={() => handleEditClick(shenanigan)}
            />
          ))}
        </tbody>
      </table>
      {selectedShenanigan && (
        <Modal
          shenanigan={selectedShenanigan.setShenanigan}
          selectedUser={selectedShenanigan.selectedUser}
          users={users}
          id={selectedShenanigan.id}
        />
      )}
    </div>
  );
}

export default Table;
