import React, { useEffect, useState } from "react";
import Shenanigan from "./Shenanigan";
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

  useEffect(() => {
    const getShenanigans = async () => {
      const querySnapshot = await getDocs(collection(db, "shenanigans"));
      const usersSnapshot = await getDocs(collection(db, "Users"));
      const users: Record<string, User> = usersSnapshot.docs.reduce(
        (acc, userDoc) => {
          const userData = userDoc.data() as User;
          acc[userData.name || ""] = userData; // Use name as the key
          return acc;
        },
        {} as Record<string, User>
      ); // Add index signature to the type of acc

      const shenanigansData: ShenaniganData[] = querySnapshot.docs.map(
        (doc) => {
          const shenanigan = doc.data();
          const user = users[shenanigan.selectedUser] || {}; // Lookup by name
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
      console.log("Final shenanigans data with user details:", shenanigansData);
    };

    getShenanigans();
  }, [user?.uid]); // React to changes in user's UID

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
              userImage={shenanigan.userImage}
              shenanigan={shenanigan.setShenanigan}
              userLevel={shenanigan.userLevel}
              counter={shenanigan.counter}
              showEditButton={
                user !== null && user?.uid === shenanigan.setByUser
              } // Show edit button if the logged in user set the shenanigan
              user={shenanigan.userId}
              username={shenanigan.username}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
