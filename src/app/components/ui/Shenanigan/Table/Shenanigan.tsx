import React from "react";
import Level from "./ui/Level";
import Link from "next/link";

interface ShenaniganProps {
  user: string;
  userImage: string;
  userLevel: string; // Now correctly typed as a number
  shenanigan: string;
  counter: number;
  username: string;
  showEditButton?: boolean;
}

const Shenanigan: React.FC<ShenaniganProps> = ({
  user,
  userImage,
  userLevel,
  shenanigan,
  counter,
  username,

  showEditButton = true,
}) => {
  return (
    <tr className="hover">
      <td>
        <Link href={"/user/" + user}>
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
      <td>{shenanigan}</td>
      <td>
        <div className="badge">{counter}</div>
      </td>
      <th>
        <button className="btn btn-sm btn-ghost w-full">👎🏻</button>
      </th>
      <th>
        <button className="btn btn-sm btn-ghost w-full">👍🏻</button>
      </th>
      <th>
        {showEditButton ? (
          <button className="btn btn-sm btn-ghost w-full">Bewerken ✏️</button>
        ) : null}
      </th>
    </tr>
  );
};

export default Shenanigan;
