import React, { useEffect, useState } from "react";
import Shenanigan from "./Shenanigan";
import { auth, db } from "@/app/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { set } from "firebase/database";

function Table() {
  const [user] = useAuthState(auth);
  const [shenanigans, setShenanigans] = useState<
    {
      level: string;
      image: string;
      id: string;
      userId: string;
      username: any;
      userImage: string;
      userLevel: string;
      counter: number;
      setShenanigan: string;
      dateCreated: any;
      setByUser: string;
      selectedUser: string;
    }[]
  >([]);

  useEffect(() => {
    const getShenanigans = async () => {
      const querySnapshot = await getDocs(collection(db, "shenanigans"));
      const shenanigansData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        userId: doc.data().user, // Add the missing userId property
        username: doc.data().user, // Add the missing username property
        // userImage: "", // Add the missing userImage property
        userLevel: "", // Add the missing userLevel property
        counter: doc.data().counter, // Access the 'counter' property using the '.data()' method
        setShenanigan: doc.data().shenanigen, // Access the 'shenanigan' property using the '.data()' method
        dateCreated: doc.data().dateCreated, // Access the 'dateCreated' property using the '.data()' method
        setByUser: user?.uid || "", // Add null check for 'user' variable and provide a default value of ""
        selectedUser: doc.data().selectedUser, // Access the 'selectedUser' property using the '.data()' method
      }));
      setShenanigans(shenanigansData);
      console.log(shenanigansData);
    };

    getShenanigans();
    console.log(user?.uid); // Log the user's UID with null check
  }, []); // Dependency array is empty to ensure this runs only once

  return (
    <div className="overflow-x-auto bg-base-200 rounded-md">
      <table className="table table-zebra">
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
              shenanigan={shenanigan.setShenanigan}
              userLevel={shenanigan.level}
              counter={shenanigan.counter}
              showEditButton={user !== null && user?.uid === shenanigan.userId} // Add null check for 'user' variable
              user={shenanigan.userId}
              username={shenanigan.selectedUser}
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
