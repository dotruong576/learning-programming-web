"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SideMenu from "~/components/sideMenu";

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "fullName",
    headerName: "Full name",
    width: 250,
    editable: false,
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
    editable: false,
    headerAlign: "center",
  },
  {
    field: "course",
    headerName: "Course participated",
    type: "number",
    width: 150,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "courseLearn",
    headerName: "Learning courses",
    type: "number",
    width: 150,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
];

const rows = [
  { id: 1, fullName: "Snow", email: "Jon", course: 14, courseLearn: 30 },
  {
    id: 2,
    fullName: "Lannister",
    email: "Cersei",
    course: 31,
    courseLearn: 30,
  },
  { id: 3, fullName: "Lannister", email: "Jaime", course: 31, courseLearn: 30 },
  { id: 4, fullName: "Stark", email: "Arya", course: 11, courseLearn: 30 },
  {
    id: 5,
    fullName: "Targaryen",
    email: "Daenerys",
    course: null,
    courseLearn: 30,
  },
  { id: 6, fullName: "Melisandre", email: null, course: 150, courseLearn: 30 },
  {
    id: 7,
    fullName: "Clifford",
    email: "Ferrara",
    course: 44,
    courseLearn: 30,
  },
  { id: 8, fullName: "Frances", email: "Rossini", course: 36, courseLearn: 30 },
  { id: 9, fullName: "Roxie", email: "Harvey", course: 65, courseLearn: 30 },
];

export default function UserPage() {
  return (
    <div className={"flex flex-row"}>
      <SideMenu />
      <Box sx={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
