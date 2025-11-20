import React, { useState, useEffect } from 'react';
import styles from './UserModal.module.css';

export default function UserModal({ isOpen, onClose, onSave, currentUser }) {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    city: '', country: '', age: '', gender: 'male'
  });

  useEffect(() => {
    if (isOpen) {
      if (currentUser) {
        setFormData(currentUser);
      } else {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          country: '',
          age: '',
          gender: 'male'
        });
      }
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          {currentUser ? 'Cập nhật User' : 'Thêm User Mới'}
        </div>

        <form onSubmit={handleSubmit}>

          <div className={styles.row}>
            <div className={`${styles.formGroup} ${styles.flex1}`}>
              <label className={styles.label}>Họ (First Name)</label>
              <input required name="firstName" value={formData.firstName} onChange={handleChange} className={styles.input} />
            </div>

            <div className={`${styles.formGroup} ${styles.flex1}`}>
              <label className={styles.label}>Tên (Last Name)</label>
              <input required name="lastName" value={formData.lastName} onChange={handleChange} className={styles.input} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Số điện thoại</label>
            <input name="phone" value={formData.phone} onChange={handleChange} className={styles.input} />
          </div>

          <div className={styles.row}>
            <div className={`${styles.formGroup} ${styles.flex1}`}>
              <label className={styles.label}>Thành phố</label>
              <input name="city" value={formData.city} onChange={handleChange} className={styles.input} />
            </div>

            <div className={`${styles.formGroup} ${styles.flex1}`}>
              <label className={styles.label}>Quốc gia</label>
              <input name="country" value={formData.country} onChange={handleChange} className={styles.input} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={`${styles.formGroup} ${styles.w100}`}>
              <label className={styles.label}>Tuổi</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className={styles.input} />
            </div>

            <div className={`${styles.formGroup} ${styles.flex1}`}>
              <label className={styles.label}>Giới tính</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className={styles.input}>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.btnCancel}>Hủy bỏ</button>
            <button type="submit" className={styles.btnSave}>
              {currentUser ? 'Lưu thay đổi' : 'Tạo mới'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
