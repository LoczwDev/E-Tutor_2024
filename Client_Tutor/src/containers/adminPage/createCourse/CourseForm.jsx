import { useEffect, useState } from "react";
import "../../../assets/css/quillEditor.css";
import BasicInformation from "./BasicInformation";
import AdvanceInformation from "./AdvanceInformation";
import Curriculum from "./Curriculum";
import PublishCourse from "./PublishCourse";
import { LuLayers } from "react-icons/lu";
import { LuCalendarPlus } from "react-icons/lu";
import { LuAirplay } from "react-icons/lu";
import { LuCheckCircle } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../../components/loader/Loader";
import { editCourse, upploadCourse } from "../../../services/coursesService";
import { toast } from "sonner";
import { IoCheckmarkDone } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useSingleCourse } from "../../../hooks/useCourses";
import Loading from "../../../components/loader/Loading";

const CourseForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useSingleCourse(courseId);

  const [checkValue, setCheckValue] = useState({
    basicInfo: 0,
    advanceInfo: 0,
    curriculum: 0,
    publish: 0,
  });
  const dataTabs = [
    {
      id: 1,
      name: "Thông tin cơ bản",
      icon: <LuLayers />,
      quantity: checkValue?.basicInfo,
      count: 8,
    },
    {
      id: 2,
      name: "Thông tin nâng cao",
      icon: <LuCalendarPlus />,
      quantity: checkValue?.advanceInfo,
      count: 6,
    },
    {
      id: 3,
      name: "Chương trình",
      icon: <LuAirplay />,
      quantity: checkValue?.curriculum,
      count: 3,
    },
    {
      id: 4,
      name: "Xuất bản",
      icon: <LuCheckCircle />,
      quantity: checkValue?.publish,
      count: 2,
    },
  ];
  const [courseData, setCourseData] = useState({
    name: "",
    topic: "",
    category: "",
    subCategory: "",
    price: "",
    estimatedPrice: "",
    promotion: "",
    language: "",
    subLanguage: "",
    level: "basic",
    durations: "",
    typeDuration: "",
    dayExpiry: "",
    thumbnail: "",
    trailer: "",
    desc: "",
    benefits: null,
    audience: null,
    requirements: null,
    curriculumData: null,
    welcomeMessage: "",
    congratulationsMessage: "",
    tutors: [],
  });

  useEffect(() => {
    if (data && !isLoading) {
      setCourseData((prevData) => ({
        ...prevData,
        name: data.course?.name || "",
        topic: data.course?.topic || "",
        category: data.course?.category || "",
        subCategory: data.course?.subCategory || "",
        price: data.course?.price || "",
        estimatedPrice: data.course?.estimatedPrice || "",
        promotion: data.course?.promotion || "",
        language: data.course?.language || "",
        subLanguage: data.course?.subLanguage || "",
        level: data.course?.level || "",
        durations: data.course?.durations || "",
        typeDurations: data.course?.typeDurations || "",
        dayExpiry: data.course?.dayExpiry || null,
        thumbnail: data.course?.thumbnail?.url || "",
        trailer: data.course?.trailer?.url || "",
        desc: data.course?.desc || "",
        benefits: data.course?.benefits || null,
        audience: data.course?.audience || null,
        requirements: data.course?.requirements || null,
        curriculumData: data.course?.curriculumData || null,
        welcomeMessage: data.course?.welcomeMessage || "",
        congratulationsMessage: data.course?.congratulationsMessage || "",
        tutors: [], // Initialize tutors as needed
      }));
    }
  }, [data, isLoading, courseId]);

  const handleCheckValue = (section, count) => {
    setCheckValue((prevCount) => ({
      ...prevCount,
      [section]: count,
    }));
  };

  const updateCourseData = (newData) => {
    setCourseData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ courseId, data }) => {
      return editCourse({ courseId, data });
    },
    onSuccess: (data) => {
      toast.success("Cập nhật thành công");
      navigate("/admin/manager-courses");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [step, setStep] = useState(1);

  // const handleChangTab = (numberStep) => {
  //   setStep(numberStep);
  // };
  const handleChangeStep = (numberStep) => {
    setStep(numberStep);
  };

  const handlePublish = () => {
    mutate({ courseId: courseId, data: courseData });
  };

  return (
    <>
      {isPending && <Loader />}
      {!isLoading ? (
        <div className="w-full bg-white shadow-section">
          <div className="w-full bg-white flex items-center justify-between h-12 border-b border-gray1 sticky z-50 top-[89px]">
            {dataTabs.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-center gap-5 w-1/4 font-medium text-base h-full text-center cursor-pointer capitalize hover:text-primary/90 duration-300 ${
                  step === item.id
                    ? "border-b-2 border-primary text-gray9"
                    : "text-gray6"
                }`}
                onClick={() => handleChangTab(item.id)}
              >
                <div className="flex items-center gap-1">
                  <span>{item.icon}</span>
                  {item.name}
                </div>
                <div className="w-12 flex items-center justify-end">
                  {item.quantity === item.count ? (
                    <div className="text-success">
                      <IoCheckmarkDone />
                    </div>
                  ) : item.quantity === 0 ? (
                    <div>
                      <div className="text-warning">/{item.count}</div>
                    </div>
                  ) : item.id === 3 ? (
                    <div
                      className={`${item.quantity > item.count ? "text-success" : "text-primary"}`}
                    >
                      {item.quantity}/{item.count}
                    </div>
                  ) : (
                    <div className="text-primary">
                      {item.quantity}/{item.count}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Content */}
          <div className="w-full">
            {step === 1 && (
              <BasicInformation
                handleChangeStep={handleChangeStep}
                step={step}
                data={courseData}
                setData={(data) => updateCourseData(data)}
                setCheckValue={(count) => handleCheckValue("basicInfo", count)}
                checkValue={checkValue.basicInfo}
              />
            )}
            {step === 2 && (
              <AdvanceInformation
                handleChangeStep={handleChangeStep}
                step={step}
                data={courseData}
                setData={(data) => updateCourseData(data)}
                setCheckValue={(count) =>
                  handleCheckValue("advanceInfo", count)
                }
                checkValue={checkValue.advanceInfo}
              />
            )}
            {step === 3 && (
              <Curriculum
                handleChangeStep={handleChangeStep}
                step={step}
                data={courseData}
                setData={(data) => updateCourseData(data)}
                setCheckValue={(count) => handleCheckValue("curriculum", count)}
                checkValue={checkValue.curriculum}
              />
            )}
            {step === 4 && (
              <PublishCourse
                handleChangeStep={handleChangeStep}
                step={step}
                handlePublish={handlePublish}
                data={courseData}
                setData={(data) => updateCourseData(data)}
                setCheckValue={(count) => handleCheckValue("publish", count)}
                checkValue={checkValue.publish}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full relative flex items-center justify-center h-[80vh]">
          <Loading />
        </div>
      )}
    </>
  );
};

export default CourseForm;
