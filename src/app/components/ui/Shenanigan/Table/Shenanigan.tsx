import React, { useState, useEffect } from "react";
import Level from "./ui/Level";
import Link from "next/link";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "@/app/services/firebase";

interface ShenaniganProps {
  counter: number;
  dateCreated: string;
  id: string;
  image: string;
  level: string;
  selectedUser: string;
  setByUser: string;
  setShenanigan: string;
  userId: string;
  userImage: string;
  userLevel: string;
  username: string;
  showEditButton?: boolean;
  onEditClick: () => void; // New prop
}

const Shenanigan: React.FC<ShenaniganProps> = ({
  counter,
  dateCreated,
  id,
  image,
  level,
  selectedUser,
  setByUser,
  setShenanigan,
  userId,
  userImage,
  userLevel,
  username,
  showEditButton = true,
  onEditClick,
}) => {
  const [vote, setVote] = useState<number>(0);

  const handleVote = async (voteType: number) => {
    if (vote === 0) {
      if (!id) {
        console.error("Shenanigan ID is undefined or null");
        return;
      }

      console.log("Shenanigan ID:", id); // Debugging line to ensure id is correct

      const shenaniganRef = doc(db, "shenanigans", id);

      try {
        await runTransaction(db, async (transaction) => {
          const docSnapshot = await transaction.get(shenaniganRef);
          if (!docSnapshot.exists()) {
            throw new Error("Shenanigan does not exist!");
          }

          const currentCounter = docSnapshot.data()?.counter || 0;
          transaction.update(shenaniganRef, {
            counter: currentCounter + voteType,
          });
        });

        setVote(voteType);
      } catch (error) {
        console.error("Error updating shenanigan counter:", error);
      }
    }
  };

  return (
    <tr className="hover">
      <td>
        <Link href={"/user/" + username}>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={userImage} alt="User avatar" />
              </div>
            </div>
            <div>
              <div className="font-bold">{username}</div>
              <Level userHasLevel={userLevel} />
            </div>
          </div>
        </Link>
      </td>
      <td>{setShenanigan}</td>
      <td>
        <button
          className="btn btn-xl btn-ghost text-xl w-fit"
          onClick={() => handleVote(-1)}
        >
          👎🏻
        </button>
        <div className="badge">{counter + vote}</div>
        <button
          className="btn btn-xl btn-ghost text-xl"
          onClick={() => handleVote(1)}
        >
          👍🏻
        </button>
      </td>
      <th>
        {showEditButton ? (
          <button
            onClick={onEditClick}
            className="btn btn-xl btn-ghost text-sm"
          >
            Bewerken ✏️
          </button>
        ) : null}
      </th>
    </tr>
  );
};

export default Shenanigan;
