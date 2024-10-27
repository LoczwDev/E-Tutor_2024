import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import styled from "../../../constants/styles/styles";
import ActiveCategory from "./ActiveCategory";
import {
  useDeleteCategory,
  useGetAllCategory,
} from "../../../hooks/useCategory";
import Loading from "../../../components/loader/Loading";
import { Edit, Trash2 } from "lucide-react";
import customToast from "../../../components/toasterProvider/customToast";

const CategoryTable = () => {
  const [checkAdd, setCheckAdd] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);
  const [tooltipItem, setTooltipItem] = useState(null);

  const [dataAllCategory, setDataAllCategory] = useState();
  const [dataSingleCategory, setDataSingleCategory] = useState(null);
  const { data, isLoading, refetch } = useGetAllCategory();
  const { mutate: mutateDeleteCategory, isSuccess } = useDeleteCategory();

  useEffect(() => {
    if (data && !isLoading) {
      setDataAllCategory(data);
    }
  }, [data, isLoading]);
  const columns = [
    { field: "title", headerName: "Tên danh mục", flex: 1 },
    {
      field: "imgCategory",
      headerName: "Ảnh danh mục",
      flex: 0.5,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.title}
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    { field: "subCategory", headerName: "Số danh mục nhỏ", flex: 0.5 },
    { field: "created_at", headerName: "Thời gian tạo", flex: 0.5 },
    {
      field: "",
      headerName: "Hành động",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="relative w-full h-full flex justify-start items-center gap-5">
            <div className="relative flex items-center justify-center">
              <div
                className="cursor-pointer"
                onClick={() => setTooltipItem(params.row.id)}
              >
                <Trash2 size={18} className="text-red-400 hover:text-red-300" />
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div
                onClick={() => handleEdit(params.row.id)}
                className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                <Edit size={18} />
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const rows = useMemo(() => {
    if (!dataAllCategory) return [];

    return dataAllCategory.category.map((item, index) => {
      const createdAtDate = new Date(item.createdAt);

      return {
        id: item._id,
        title: item.title,
        imgCategory: item.imgCategory.url,
        subCategory: item.subCategory.length,
        created_at:
          item?.createdAt && !isNaN(createdAtDate)
            ? createdAtDate.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "",
      };
    });
  }, [dataAllCategory]);

  const handleDelete = () => {
    mutateDeleteCategory({ categoryId: tooltipItem });
    setTooltipItem(null);
  };
  const handleEdit = (id) => {
    const categoryToEdit = dataAllCategory?.category.find(
      (item) => item._id === id
    );
    if (categoryToEdit) {
      setCheckAdd(true);
      setDataSingleCategory({
        id: categoryToEdit._id,
        title: categoryToEdit.title,
        imgCategory: categoryToEdit.imgCategory,
        subCategory: categoryToEdit.subCategory,
        color: categoryToEdit.color || "#ffffff",
      });
    }
    setCheckEdit(true);
    setCheckAdd(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setTooltipItem(null);
      customToast.success("Xóa danh mục thành công!");
      refetch();
    }
  }, [isSuccess]);

  return (
    <motion.div
      className="bg-[#fff] backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {!checkAdd ? (
        <>
          <div className="w-full flex items-center justify-between">
            <h3 className="text-xl font-medium">Bảng Danh Mục</h3>
            <button
              onClick={() => setCheckAdd(true)}
              className={`${styled.buttonPrimary10} !rounded-xl`}
            >
              Thêm
            </button>
          </div>
          <Box>
            <Box
              height="50vh"
              overflowY="auto"
              className="!scrollbar-thin"
              sx={{
                bgcolor: "transparent",
              }}
            >
              {isLoading ? (
                <div className="relative w-full h-[50vh] flex items-center justify-center">
                  <Loading />
                </div>
              ) : (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  localeText={{
                    noRowsLabel: "Không có dữ liệu",
                    columnMenuSortAsc: "Sắp xếp tăng dần",
                    columnMenuSortDesc: "Sắp xếp giảm dần",
                    columnMenuFilter: "Lọc",
                    columnMenuHideColumn: "Ẩn cột",
                    columnMenuShowColumns: "Hiện cột",
                    footerRowSelected: (count) =>
                      `${count.toLocaleString()} hàng được chọn`,
                    MuiTablePagination: {
                      labelRowsPerPage: "Số hàng trên mỗi trang:",
                    },
                  }}
                  sx={{
                    bgcolor: "transparent",
                    color: "#1D2026",
                    borderColor: "transparent",
                    "& .MuiCheckbox-root": {
                      color: "red",
                      "&.Mui-checked": {
                        color: "#FF6636",
                      },
                    },
                    "& .MuiDataGrid-cell": {
                      color: "#1D2026",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "transparent !important",
                      zIndex: 100,
                    },
                    "& .MuiDataGrid-columnHeader": {
                      backgroundColor: "transparent !important",

                      "& .MuiDataGrid-columnHeaderTitle": {
                        textAlign: "left",
                        fontSize: "0.75rem",
                        fontWeight: "500 !important",
                        color: "#1F2937",
                        textTransform: "uppercase",
                      },
                    },
                    "& .MuiDataGrid-root": {
                      backgroundColor: "transparent !important",
                    },
                    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
                      {
                        outline: "none",
                      },
                    "&:active": {
                      outline: "none",
                    },
                    "&.Mui-selected": {
                      outline: "none",
                    },
                  }}
                />
              )}
            </Box>
          </Box>
        </>
      ) : (
        <div className="w-full">
          <ActiveCategory
            setCheckAdd={setCheckAdd}
            checkEdit={checkEdit}
            setCheckEdit={setCheckEdit}
            refetch={refetch}
            data={dataSingleCategory}
          />
        </div>
      )}
      {tooltipItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-center">
              Xoá ghi chú này?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setTooltipItem(null)}
                className="bg-gray-300 text-black hover:bg-opacity-80 px-4 py-2 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white hover:bg-red-400 px-4 py-2 rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CategoryTable;
