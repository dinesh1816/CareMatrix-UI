import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { Lock, User } from "lucide-react";
import FilterBar from "./FilterBar";
import UserTable from "./UserTable";

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Doctor" | "Patient";
  contact: string;
};

const mockUsers: User[] = [
  { id: "admin1", name: "System Administrator", email: "admin@example.com", role: "Admin", contact: "+1 (555) 000-0000" },
  { id: "1", name: "John Smith", email: "doctor@example.com", role: "Doctor", contact: "+1 (555) 987-6543" },
  { id: "2", name: "Jane Doe", email: "patient@example.com", role: "Patient", contact: "+1 (555) 123-4567" },
];

const AdminDashboard: React.FC = () => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);

  const handleFilter = (role: string, query: string) => {
    let results = mockUsers;

    if (role !== "All") {
      results = results.filter((u) => u.role.toLowerCase() === role.toLowerCase());
    }

    if (query.trim() !== "") {
      results = results.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.email.toLowerCase().includes(query.toLowerCase()) ||
          u.id.includes(query)
      );
    }

    setFilteredUsers(results);
  };

  return (
    <div className="admin-dashboard-container">
      <div className="header">
        <h1><User /> Admin Portal</h1>
      </div>
      <FilterBar onFilter={handleFilter} />
      <UserTable users={filteredUsers} />
    </div>
  );
};

export default AdminDashboard;
