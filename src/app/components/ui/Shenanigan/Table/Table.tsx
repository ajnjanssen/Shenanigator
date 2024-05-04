import React, { useEffect, useState } from "react";
import Shenanigan from "./Shenanigan";
import { auth, db } from "@/app/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Table() {
  const [user] = useAuthState(auth);
  const [shenanigans, setShenanigans] = useState<
    {
      username: any;
      userImage: string;
      counter: number;
      userLevel: string;
      shenanigan: string;
      userId: string;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    const getShenanigans = async () => {
      const querySnapshot = await getDocs(collection(db, "shenanigans"));
      const shenanigansData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        user: doc.data().userId, // Add the missing userId property
        image: "", // Add the missing userImage property
        counter: 0, // Add the missing counter property
        level: "", // Add the missing userLevel property
        username: "", // Add the missing username property
        shenanigan: "", // Add the missing shenanigan property
        ...doc.data(),
      }));
      setShenanigans(shenanigansData);
    };

    getShenanigans();
    console.log(user?.uid); // Log the user's UID with null check
  }, []); // Dependency array is empty to ensure this runs only once

  return (
    <div className="overflow-x-auto bg-base-200 rounded-md">
      <table className="table">
        <thead>
          <tr>
            <th>Gebruiker</th>
            <th>Shenanigan</th>
            <th>Votes</th>
            <th>Down</th>
            <th>Up</th>
            <th>Bewerken</th>
          </tr>
        </thead>

        <tbody>
          {shenanigans.map((shenanigan) => (
            <Shenanigan
              key={shenanigan.id}
              userImage={shenanigan.image}
              shenanigan={shenanigan.shenanigan}
              userLevel={shenanigan.level}
              counter={shenanigan.counter}
              showEditButton={user !== null && user?.uid === shenanigan.userId} // Add null check for 'user' variable
              user={shenanigan.userId.toString()}
              username={shenanigan.username.toString()}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Gebruiker</th>
            <th>Shenanigan</th>
            <th>Votes</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
