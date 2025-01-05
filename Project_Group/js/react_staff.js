import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
}

const initialData: User[] = [
  { id: 1, name: 'Neymar', email: 'neymar@gmail.com', phone: '0102030405', address: '15/15 d20 Binh Thanh', date: '05/04/2018' },
  { id: 2, name: 'Neymar', email: 'neymar@gmail.com', phone: '0102030405', address: '15/15 d20 Binh Thanh', date: '05/04/2018' },
  { id: 3, name: 'Neymar', email: 'neymar@gmail.com', phone: '0102030405', address: '15/15 d20 Binh Thanh', date: '05/04/2018' },
];

const TableCRUD: React.FC = () => {
  const [data, setData] = useState<User[]>(initialData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
  });

  const handleDelete = (id: number) => {
    setData(data.filter((user) => user.id !== id));
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number) => {
    setData(data.map((user) => (user.id === id ? newUser : user)));
    setEditingId(null);
    setNewUser({ id: 0, name: '', email: '', phone: '', address: '', date: '' });
  };

  const handleAdd = () => {
    setData([...data, { ...newUser, id: data.length + 1 }]);
    setNewUser({ id: 0, name: '', email: '', phone: '', address: '', date: '' });
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">TÊN</th>
            <th className="border border-gray-300 p-2">EMAIL</th>
            <th className="border border-gray-300 p-2">SỐ ĐIỆN THOẠI</th>
            <th className="border border-gray-300 p-2">ĐỊA CHỈ</th>
            <th className="border border-gray-300 p-2">NGÀY</th>
            <th className="border border-gray-300 p-2">HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              {editingId === user.id ? (
                <>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="border border-gray-300 p-1"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="border border-gray-300 p-1"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                      className="border border-gray-300 p-1"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={newUser.address}
                      onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                      className="border border-gray-300 p-1"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="date"
                      value={newUser.date}
                      onChange={(e) => setNewUser({ ...newUser, date: e.target.value })}
                      className="border border-gray-300 p-1"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleSave(user.id)}
                      className="text-green-600 hover:underline"
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-300 p-2">{user.name}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{user.phone}</td>
                  <td className="border border-gray-300 p-2">{user.address}</td>
                  <td className="border border-gray-300 p-2">{user.date}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Thêm người dùng mới</h2>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Tên"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border border-gray-300 p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border border-gray-300 p-2"
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="border border-gray-300 p-2"
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            value={newUser.address}
            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            className="border border-gray-300 p-2"
          />
          <input
            type="date"
            value={newUser.date}
            onChange={(e) => setNewUser({ ...newUser, date: e.target.value })}
            className="border border-gray-300 p-2"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableCRUD;
