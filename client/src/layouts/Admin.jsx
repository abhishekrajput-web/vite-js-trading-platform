// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";

// // components

// import AdminNavbar from "../components/Admin/Navbars/AdminNavbar";
// import Sidebar from "../components/Admin/Sidebar/Sidebar";
// import HeaderStats from "../components/Admin/Headers/HeaderStats";
// import FooterAdmin from "../components/Admin/Footers/FooterAdmin";

// // views

// import Dashboard from "../views/admin/Dashboard";
// import Maps from "../views/admin/Maps";
// import Settings from "../views/admin/Settings";
// import Tables from "../views/admin/Tables";

// export default function Admin() {
//   return (
//     <>
//       <Sidebar />
//       <div className="relative md:ml-64 bg-blueGray-100">
//         <AdminNavbar />
//         {/* Header */}
//         <HeaderStats />
//         <div className="px-4 md:px-10 mx-auto w-full -m-24">
//           <Switch>
//             <Route path="/admin/dashboard" exact component={Dashboard} />
//             <Route path="/admin/maps" exact component={Maps} />
//             <Route path="/admin/settings" exact component={Settings} />
//             <Route path="/admin/tables" exact component={Tables} />
//             <Redirect from="/admin" to="/admin/dashboard" />
//           </Switch>
//           <FooterAdmin />
//         </div>
//       </div>
//     </>
//   );
// }



import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components

import AdminNavbar from "../components/Admin/Navbars/AdminNavbar";
import Sidebar from "../components/Admin/Sidebar/Sidebar";
import HeaderStats from "../components/Admin/Headers/HeaderStats";
import FooterAdmin from "../components/Admin/Footers/FooterAdmin";

// views

import Dashboard from "../views/admin/Dashboard";
import Maps from "../views/admin/Maps";
import Settings from "../views/admin/Settings";
import Tables from "../views/admin/Tables";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          </Routes>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}