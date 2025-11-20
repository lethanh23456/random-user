import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser, addUser, updateUser } from '../redux/usersSlice';
import UserModal from './UserModal';
import styles from './UserList.module.css';

export default function UserList() {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.users);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (list.length === 0 && status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [list.length, status, dispatch]);

  const handleSaveUser = (formData) => {
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, data: formData }));
    } else {
      const newUser = {
        ...formData,
        id: Date.now().toString(),
        avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random&size=128`,
      };
      dispatch(addUser(newUser));
    }
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>

      <div className={styles.headerContainer}>
        <button className={styles.btnAdd} onClick={() => { setEditingUser(null); setModalOpen(true); }}>
          + Thêm Mới
        </button>
      </div>

      {status === 'loading' && <p>Đang tải dữ liệu...</p>}

      <div className={styles.grid}>
        {list.map((user) => (
          <div key={user.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <img src={user.avatar} alt="avatar" className={styles.avatar} />
              <div className={styles.nameGroup}>
                <h3 className={styles.name}>{user.firstName} {user.lastName}</h3>
                <p className={styles.subInfo}>{user.age} tuổi • {user.gender === 'male' ? 'Nam' : 'Nữ'}</p>
              </div>
            </div>

            <div className={styles.body}>
              <div className={styles.row}><span className={styles.label}>Email:</span> {user.email}</div>
              <div className={styles.row}><span className={styles.label}>Phone:</span> {user.phone}</div>
              <div className={styles.row}><span className={styles.label}>Địa chỉ:</span> {user.city}, {user.country}</div>
            </div>

            <div className={styles.footer}>
              <button className={styles.btnEdit} onClick={() => { setEditingUser(user); setModalOpen(true); }}>Sửa</button>
              <button className={styles.btnDelete} onClick={() => { if (window.confirm('Xóa user này?')) dispatch(deleteUser(user.id)); }}>Xóa</button>
            </div>
          </div>
        ))}
      </div>

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveUser}
        currentUser={editingUser}
      />
    </div>
  );
}
