import React from "react";

function UserTableHeader({headers}) {
  return (
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {headers.map(header => {
            return <th scope="col" class="px-6 py-3">
            {header}
          </th>
        })}
      </tr>
    </thead>
  );
}

export default UserTableHeader;
