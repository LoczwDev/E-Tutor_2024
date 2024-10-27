import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { formatDurationModify } from "../../hooks/formatDuration";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import parse from "html-react-parser";
import { useDeleteCourseNote, useUpdateCourseNote } from "../../hooks/useUser";
import styled from "../../constants/styles/styles";

const ContainerEditNote = ({
  data,
  courseId,
  lectureId,
  refetch,
  handleRunVideoNote,
  setDurationVideoActive,
}) => {
  // const quillRef = useRef();
  // const [checkEdit, setCheckEdit] = useState(false);
  // const [checkDelete, setCheckDelete] = useState(false);
  // const [textNote, setTextNote] = useState("");
  // useEffect(() => {
  //   if (data) {
  //     setTextNote(data?.textNote);
  //   }
  // }, [data]);

  // console.log(data);

  // const {
  //   mutate: mutateEditCourseNote,
  //   isPending: isPendingEditCourseNote,
  //   isSuccess,
  // } = useUpdateCourseNote();
  // const {
  //   mutate: mutateDeleteCourseNote,
  //   isPending: isPendingDeleteCourseNote,
  //   isSuccess: isSuccessDeleteCourseNote,
  // } = useDeleteCourseNote();

  // const handleEditCourseNote = async () => {
  //   await mutateEditCourseNote({
  //     courseId,
  //     lectureId,
  //     noteId: data._id,
  //     textNote,
  //   });
  // };

  // const handleDeleteCourseNote = () => {
  //   if (!courseId || !lectureId || !data._id) {
  //     console.error("Missing required parameters:", {
  //       courseId,
  //       lectureId,
  //       noteId: data._id,
  //     });
  //     return;
  //   }

  //   console.log("Deleting note:", { courseId, lectureId, noteId: data._id });

  //   mutateDeleteCourseNote({
  //     courseId,
  //     lectureId,
  //     noteId: data._id,
  //   });
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     refetch();
  //     setCheckEdit(false);
  //   }
  // }, [isSuccess]);

  // useEffect(() => {
  //   if (isSuccessDeleteCourseNote) {
  //     refetch();
  //     setCheckDelete(false);
  //   }
  // }, [isSuccessDeleteCourseNote]);

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[1300px] mt-5">
      {data && data?.length <= 0 ? (
        <div className="w-full">
          <div className="text-sm text-center bg-warning/20">
            Chưa có ghi chú trong khoá học này
          </div>
        </div>
      ) : (
        // <div className="w-full">
        //   <div className="text-lg font-medium flex items-center gap-2">
        //     <span className="ml-1 bg-primary p-1 text-white text-xs font-bold">
        //       {formatDurationModify(Number(data?.timeNoteLecture).toFixed(0))}
        //     </span>
        //     <div
        //       className="cursor-pointer"
        //       onClick={() =>
        //         handleRunVideoNote(lectureId, data?.timeNoteLecture)
        //       }
        //     >
        //       {data?.titleLecture}
        //     </div>
        //   </div>
        //   <div className="w-fullpx-7 py-8">
        //     <div className="w-full">
        //       <div className="w-full flex items-center justify-between">
        //         <h3 className="block font-medium text-lg mb-1">Nội dung</h3>
        //         <div className="flex items-center gap-5">
        //           <button
        //             onClick={() => setCheckEdit(!checkEdit)}
        //             className="text-success"
        //           >
        //             <CiEdit fontSize={20} />
        //           </button>
        //           <div className="relative">
        //             <button
        //               onClick={() => setCheckDelete(!checkDelete)}
        //               className="text-error mt-1.5"
        //             >
        //               <AiOutlineDelete fontSize={20} />
        //             </button>
        //             {checkDelete && (
        //               <div className="absolute p-3 w-max h-max -top-[50px] right-0 bg-white shadow-tooltip">
        //                 <div className="text-sm text-center py-3">
        //                   Xoá ghi chú này
        //                 </div>
        //                 <div className="w-full text-sm flex items-center gap-3 justify-center">
        //                   <button
        //                     onClick={() => setCheckDelete(false)}
        //                     className={`bg-gray1 text-white hover:bg-opacity-80 px-3`}
        //                   >
        //                     Hủy
        //                   </button>
        //                   <button
        //                     onClick={handleDeleteCourseNote}
        //                     className={`bg-error text-white hover:bg-opacity-80 px-3`}
        //                   >
        //                     Xóa
        //                   </button>
        //                 </div>
        //               </div>
        //             )}
        //           </div>
        //         </div>
        //       </div>
        //       {!checkEdit ? (
        //         <div className="w-full p-3 bg-gray0 mt-1">
        //           {data?.textNote ? parse(data?.textNote) : ""}
        //         </div>
        //       ) : (
        //         <div className="w-full">
        //           <ReactQuill
        //             ref={quillRef}
        //             theme="snow"
        //             value={textNote}
        //             onChange={setTextNote}
        //             placeholder="Nhập mô tả khóa học của bạn"
        //             className="w-full flex flex-col bg-transparent overflow-hidden text-gray6 border border-gray1"
        //             modules={{
        //               toolbar: [
        //                 [{ header: [1, 2, false] }],
        //                 ["bold", "italic", "underline", "strike"],
        //                 [{ list: "ordered" }, { list: "bullet" }],
        //                 ["clean"],
        //               ],
        //             }}
        //             formats={[
        //               "header",
        //               "bold",
        //               "italic",
        //               "underline",
        //               "strike",
        //               "list",
        //               "bullet",
        //               "link",
        //               "image",
        //             ]}
        //           />
        //           <div className="w-full flex items-center gap-3 justify-end">
        //             <button
        //               onClick={() => setCheckEdit(false)}
        //               className={`${styled.buttonGray}`}
        //             >
        //               Hủy bỏ
        //             </button>
        //             <button
        //               onClick={handleEditCourseNote}
        //               className={`${styled.buttonPrimary}`}
        //             >
        //               Chỉnh sửa
        //             </button>
        //           </div>
        //         </div>
        //       )}
        //     </div>
        //   </div>
        // </div>
        <div className="w-full flex flex-col gap-3">
          {data?.map((item) => (
            <ItemEditNote
              key={item._id}
              data={item}
              courseId={courseId}
              lectureId={lectureId}
              refetch={refetch}
              handleRunVideoNote={handleRunVideoNote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContainerEditNote;

const ItemEditNote = ({
  data,
  courseId,
  lectureId,
  refetch,
  handleRunVideoNote,
}) => {
  const quillRef = useRef();
  const [checkEdit, setCheckEdit] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const [textNote, setTextNote] = useState("");
  useEffect(() => {
    if (data) {
      setTextNote(data?.textNote);
    }
  }, [data]);

  console.log(data);

  const {
    mutate: mutateEditCourseNote,
    isPending: isPendingEditCourseNote,
    isSuccess,
  } = useUpdateCourseNote();
  const {
    mutate: mutateDeleteCourseNote,
    isPending: isPendingDeleteCourseNote,
    isSuccess: isSuccessDeleteCourseNote,
  } = useDeleteCourseNote();

  const handleEditCourseNote = async () => {
    await mutateEditCourseNote({
      courseId,
      lectureId,
      noteId: data._id,
      textNote,
    });
  };

  const handleDeleteCourseNote = () => {
    if (!courseId || !lectureId || !data._id) {
      console.error("Missing required parameters:", {
        courseId,
        lectureId,
        noteId: data._id,
      });
      return;
    }

    console.log("Deleting note:", { courseId, lectureId, noteId: data._id });

    mutateDeleteCourseNote({
      courseId,
      lectureId,
      noteId: data._id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setCheckEdit(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDeleteCourseNote) {
      refetch();
      setCheckDelete(false);
    }
  }, [isSuccessDeleteCourseNote]);

  return (
    <div className="w-full">
      <div className="text-lg font-medium flex items-center gap-2">
        <span className="ml-1 bg-primary p-1 text-white text-xs font-bold">
          {formatDurationModify(Number(data?.timeNoteLecture).toFixed(0))}
        </span>
        <div
          className="cursor-pointer"
          onClick={() => handleRunVideoNote(lectureId, data?.timeNoteLecture)}
        >
          {data?.titleLecture}
        </div>
      </div>
      <div className="w-fullpx-7 py-8">
        <div className="w-full">
          <div className="w-full flex items-center justify-between">
            <h3 className="block font-medium text-lg mb-1">Nội dung</h3>
            <div className="flex items-center gap-5">
              <button
                onClick={() => setCheckEdit(!checkEdit)}
                className="text-success"
              >
                <CiEdit fontSize={20} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setCheckDelete(!checkDelete)}
                  className="text-error mt-1.5"
                >
                  <AiOutlineDelete fontSize={20} />
                </button>
                {checkDelete && (
                  <div className="absolute p-3 w-max h-max -top-[50px] right-0 bg-white shadow-tooltip">
                    <div className="text-sm text-center py-3">
                      Xoá ghi chú này
                    </div>
                    <div className="w-full text-sm flex items-center gap-3 justify-center">
                      <button
                        onClick={() => setCheckDelete(false)}
                        className={`bg-gray1 text-white hover:bg-opacity-80 px-3`}
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleDeleteCourseNote}
                        className={`bg-error text-white hover:bg-opacity-80 px-3`}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!checkEdit ? (
            <div className="w-full p-3 bg-gray0 mt-1">
              {data?.textNote ? parse(data?.textNote) : ""}
            </div>
          ) : (
            <div className="w-full">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={textNote}
                onChange={setTextNote}
                placeholder="Nhập mô tả khóa học của bạn"
                className="w-full flex flex-col bg-transparent overflow-hidden text-gray6 border border-gray1"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "list",
                  "bullet",
                  "link",
                  "image",
                ]}
              />
              <div className="w-full flex items-center gap-3 justify-end">
                <button
                  onClick={() => setCheckEdit(false)}
                  className={`${styled.buttonGray}`}
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleEditCourseNote}
                  className={`${styled.buttonPrimary}`}
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
