import React from "react";

// components

import Table from "../../components/Common/CardTable"; 
// import Table2 from "../../components/Common/Table";
export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <Table />
          {/* <Table2/> */}
        </div>
      </div>
    </>
  );
}
