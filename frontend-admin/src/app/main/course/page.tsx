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
    field: "courseName",
    headerName: "Course name",
    width: 250,
    editable: false,
    headerAlign: "center",
  },
  {
    field: "learners",
    headerName: "Learners",
    type: "number",
    width: 150,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
];

const rows = [
  { id: 1, courseName: "Snow", email: "Jon", learners: 1 },
  {
    id: 2,
    courseName: "Lannister",
    learners: 31,
  },
  { id: 3, courseName: "Lannister", learners: 31 },
  { id: 4, courseName: "Stark", learners: 11 },
  {
    id: 5,
    courseName: "Targaryen",
    learners: null,
    courseLearn: 30,
  },
  { id: 6, courseName: "Melisandre", learners: 150 },
  {
    id: 7,
    courseName: "Clifford",
    email: "Ferrara",
    learners: 44,
  },
  { id: 8, courseName: "Frances", learners: 360 },
  { id: 9, courseName: "Roxie", learners: 65 },
];

export default function CoursePage() {
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
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
