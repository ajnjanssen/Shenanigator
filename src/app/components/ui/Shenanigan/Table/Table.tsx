import React from 'react'
import Shenanigan from './Shenanigan'
function Table() {
  return (
    <div className="overflow-x-auto bg-base-200 rounded-md">
  <table className="table">
    {/* head */}
    <thead>
      <tr >
        <th>Gebruiker</th>
        <th>Shenanigan</th>
        <th>Vote</th>
        <th>Down</th>
        <th>Up</th>
        <th>Bewerken</th>
      </tr>
    </thead>
    <tbody>
      <Shenanigan 
        user='Mart Bosgraaf' 
        userImage='https://vrijdagonline.nl/media/ma5nkqh4/multi-site-cms.jpg?width=960&height=768&format=webp&quality=90&v=1d9412a2b983ed0.jpg' 
        shenanigan='Draait weer takke herrie' 
        userLevel={1}
        counter={1}/>
        <Shenanigan 
        user='Alexander Janssen' 
        userImage='https://media.licdn.com/dms/image/D4E03AQH6ynMwg24Aew/profile-displayphoto-shrink_200_200/0/1707131738936?e=2147483647&v=beta&t=fTPoha3bOlYCv0EcwtlCgX5_qArMpsnUO9KHw-Rbdig' 
        shenanigan='Zingt foute liedjes terwijl hij de afwas doet' 
        userLevel={3}
        counter={3}/>
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
      <th>Gebruiker</th>
        <th>Shenanigan</th>
        <th>Counter</th>
       
      </tr>
    </tfoot>
    
  </table>
</div>
  )
}

export default Table