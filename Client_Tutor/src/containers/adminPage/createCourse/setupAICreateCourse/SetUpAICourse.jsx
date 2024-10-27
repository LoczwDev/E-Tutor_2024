import React, { useEffect, useState } from "react";
import StepCreateAI from "./StepCreateAI";
import ChooseCategory from "./ChooseCategory";
import SetupDescCourse from "./SetupDescCourse";
import SetupOptions from "./SetupOptionsCourse";
import axios from "axios";
import { useCreateCourse } from "../../../../hooks/useCourses";
import { useNavigate } from "react-router-dom";
import LoaderCreateCourse from "../../../../components/loader/LoaderCreateCourse";
import { toast } from "sonner";
import Loader from "../../../../components/loader/Loader";
import { FaArrowLeftLong } from "react-icons/fa6";

const SetUpAICourse = ({ checkCreateCourses, setCheckCreateCourses }) => {
  const navigate = useNavigate();
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    data: createdCourseData,
  } = useCreateCourse();
  const [courseData, setCourseData] = useState(null);
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isErrorAI, setIsErrorAI] = useState(false);
  const [dataCourseSetup, setdataCourseSetup] = useState({
    name: "",
    topic: "",
    category: "",
    subCategory: "",
    level: "",
    durations: "",
    typeDurations: "Ngày",
    numberCurriculum: "",
    autoSuggest: false,
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdataCourseSetup((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateCourseStructure = async () => {
    const apiKey = "AIzaSyAysrrK-OlOtw7uKoLV8_qxdQYPIjLqfZU";
    const name = dataCourseSetup.name;
    const category = dataCourseSetup.category;
    const subCategory = dataCourseSetup.category;
    const topic = dataCourseSetup.topic;
    const durations = dataCourseSetup.durations;
    const typeDurations = dataCourseSetup.typeDurations;
    const numberCurriculum = dataCourseSetup.numberCurriculum;
    const description = dataCourseSetup.desc;
    const level = dataCourseSetup.level;
    const autoSuggest = dataCourseSetup.autoSuggest;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Đầu tiên, dựa vào tên khóa học là:${name}, chủ đề (topic) của khóa học là ${topic} ngành nghề của khóa học (category) là ${category}, loại danh mục (subCatgegory) là: ${subCategory} cấp độ học của học viên là ${level}, mô tả cơ bản của khóa học ${description} và trường autoSuggest là ${autoSuggest},Sau đó, hãy gợi ý cho tôi các trường dữ liệu dạng Key value theo định dạng JSON. Bao gồm: các giá trị đã đề cập trước đó, bạn có thể sữa chúng cho hay hơn là topic, desc và bạn hãy viết lại desc cho nó dài ra nhé ít nhất củng khoảng 500 không cần phân dòng từ hơn nhé có thể là 3 đoạn mô tả, nhưng các trường name, level, category, subCategory (danh mục) thì phải giữ nguyên giá trị tôi đưa cho bạn nhé và bao gồm các trường mới là: một key durations với value là ${durations}, một key typeDurations với value là ${typeDurations}, một mảng mảng benefits chứa 4 đoạn text nói lên lợi ý của khóa học này, một mảng mảng audience chứa 4 đoạn text nói lên những đối tượng nên tham gia, một mảng mảng requirements chứa 4 đoạn text nói lên điều kiện phải có trước khi tham gia vào khóa học này, một mảng curriculumData chứa ${numberCurriculum} đối tượng, mỗi đối tượng gồm 1 trường title chứa tên phần đó và một mảng lectures chứa các đối tượng lecture, trong lecture bạn hãy cho tôi các trường title nói lên tên của bài giảng phần đó, trường desc và notes nếu trường autoSuggest true thì giúp tôi gợi ý các đoạn text trường desc chứa mô tả dài khoảng 300 từ cho các bài học đó và trường notes chứa ghi chú nên để ý cũng là 1 đoạn dài khoảng 200 từ cho mỗi bài học đó, còn nếu autoSuggest false thì trường desc và notes là 1 chuổi rỗng, trường video là một chuổi rỗng, và một trường attachFiles là một mãng rỗng . Nên nhớ đừng trả về bất cứ văn bản dư thừa nào chỉ cần JSON Key:value`,
            },
          ],
        },
      ],
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const jsonString = response.data.candidates[0].content.parts[0].text
        .replace("```json\n", "")
        .replace("```", "");

      const data = JSON.parse(jsonString);
      setCourseData(data);
    } catch (error) {
      console.error(
        "Có lỗi xảy ra khi gọi API:",
        error.response ? error.response.data : error.message
      );
      setIsErrorAI(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setIsErrorAI(false);
    }
  };

  const handleCreateCourse = () => {
    generateCourseStructure();
  };

  useEffect(() => {
    if (courseData) {
      setIsErrorAI(false);
      console.log(courseData, "test");

      mutate({ courseData: courseData });
    }
  }, [courseData]);

  useEffect(() => {
    if (isLoading || isPending || isSuccess) {
      setIsLoader(true);
    }
  }, [isLoading, isPending, isSuccess]);

  useEffect(() => {
    if (isSuccess && createdCourseData && courseData && !isPending) {
      setdataCourseSetup({
        name: "",
        topic: "",
        category: "",
        subCategory: "",
        level: "",
        durations: "",
        typeDuration: "day",
        numberCurriculum: "",
        autoSuggest: false,
        desc: "",
      });
      setCourseData(null);
      setActive(0);
      setIsLoading(false);
      setIsErrorAI(false);
      toast.success("Bước đầu thành công!");
      toast.info("Chờ tý, mình sẽ chuyển bạn đi tới bước tiếp theo");
      setTimeout(() => {
        setIsLoader(false);
        const courseId = createdCourseData?.courses._id;
        navigate(`/admin/manager-course/edit/${courseId}`);
      }, 3000);
    }
  }, [isSuccess, courseData, createdCourseData, isPending, isLoading]);

  useEffect(() => {
    if (isError || isErrorAI) {
      toast.error("Có lỗi trong quá trình xử lý");
    }
  }, [isError]);
  return (
    <>
      {isLoader && <Loader />}
      <div className="w-full p-5">
        <div className="w-full bg-white shadow-section">
          <div className="flex items-center gap-3 py-3 px-10">
            <div
              onClick={() => setCheckCreateCourses(!checkCreateCourses)}
              className="cursor-pointer bg-gray5 text-white hover:text-gray7 px-5 py-1 rounded-lg overflow-hidden flex items-center justify-center"
            >
              <FaArrowLeftLong fontSize={20} />
            </div>
            <span className="text-base">Trở lại</span>
          </div>

          <h3 className="text-center pt-10 text-primary font-semibold text-3xl">
            Tạo Khóa học
          </h3>
          <div className="w-full flex items-center justify-center top-18 right-0">
            <StepCreateAI active={active} setActive={setActive} />
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="w-[1000px] p-5 overflow-hidden">
              {active === 0 && (
                <ChooseCategory
                  active={active}
                  setActive={setActive}
                  handleChange={handleChange}
                  setdataCourseSetup={setdataCourseSetup}
                  dataCourseSetup={dataCourseSetup}
                />
              )}
              {active === 1 && (
                <SetupDescCourse
                  active={active}
                  setActive={setActive}
                  handleChange={handleChange}
                  setdataCourseSetup={setdataCourseSetup}
                  dataCourseSetup={dataCourseSetup}
                />
              )}
              {active === 2 && (
                <SetupOptions
                  active={active}
                  setActive={setActive}
                  handleChange={handleChange}
                  setdataCourseSetup={setdataCourseSetup}
                  dataCourseSetup={dataCourseSetup}
                  handleCreateCourse={handleCreateCourse}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetUpAICourse;
