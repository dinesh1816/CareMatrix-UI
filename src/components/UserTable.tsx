import React from "react";
import "./UserTable.css";
import { Lock, User } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Doctor" | "Patient";
  contact: string;
};

type Props = {
  users: User[];
};

const getBadgeClass = (role: string) => {
  switch (role) {
    case "Admin": return "badge purple";
    case "Doctor": return "badge green";
    case "Patient": return "badge blue";
    default: return "badge";
  }
};

const UserTable: React.FC<Props> = ({ users }) => {
  return (
    <div className="user-table">
      <div className="table-header">
        <span>ROLE</span>
        <span>ID</span>
        <span>CONTACT</span>
        <span>ACCESS</span>
        <span>ACTIONS</span>
      </div>
      {users.map((user, idx) => (
        <div className="table-row" key={idx}>
          <div className="user-info">
            <p className="name">{user.name}</p>
            <p className="email">{user.email}</p>
          </div>
          <span className={getBadgeClass(user.role)}>{user.role}</span>
          <span>{user.id}</span>
          <span>{user.contact}</span>
          <span><span className="lock-icon">🔒</span></span>
          <span className="view-detail">View Detail</span>
        </div>
      ))}
    </div>
  );
};

export default UserTable;
