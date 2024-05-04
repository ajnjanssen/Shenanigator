import React from 'react';
import Level from './ui/Level';


interface ShenaniganProps {
  user: string;
  userImage: string;
  userLevel: number;  // Now correctly typed as a number
  shenanigan: string;
  counter: number;
}

const Shenanigan: React.FC<ShenaniganProps> = ({ user, userImage, userLevel, shenanigan, counter }) => {
  return (
    <tr className="hover">
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={userImage} alt="User avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold">{user}</div>
            <Level userHasLevel={userLevel.toString()} />
          </div>
        </div>
      </td>
      <td>{shenanigan}</td>
      <td>
      <div className="badge">
        {counter}
      </div>
        </td>
      <th>
        <button className="btn btn-sm btn-ghost w-full">👎🏻</button>
      </th>
      <th>
        <button className="btn btn-sm btn-ghost w-full">👍🏻</button>
      </th>
      <th>
        <button className="btn btn-sm btn-ghost w-full">Bewerken ✏️</button>
      </th>
    </tr>
  );
};


export default Shenanigan;
