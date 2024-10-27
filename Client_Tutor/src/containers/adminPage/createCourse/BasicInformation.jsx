import { useEffect, useState } from "react";
import { TfiMoney } from "react-icons/tfi";
import { BsPercent } from "react-icons/bs";
import styled from "../../../constants/styles/styles";
import { DatePicker, InputNumber, Select } from "antd";
import moment from "moment/moment";
import { toast } from "sonner";
import { useGetAllCategory } from "../../../hooks/useCategory";
import customToast from "../../../components/toasterProvider/customToast";

const BasicInformation = ({
  handleChangeStep,
  step,
  data,
  setData,
  setCheckValue,
  checkValue,
}) => {
  const { data: dataCategory, isLoading: isLoadingCategory } =
    useGetAllCategory();
  const [dataSubcategory, setdataSubcategory] = useState(null);
  useEffect(() => {
    if (data?.category && !isLoadingCategory) {
      const subCategoryFind =
        dataCategory?.category.find((item) => item.title === data.category) ||
        null;
      setdataSubcategory(subCategoryFind?.subCategory || []);
    }
  }, [data, isLoadingCategory]);
  const countCheckValue = () => {
    let count = 0;
    if (data.name) count++;
    if (data.topic) count++;
    if (data.price) count++;
    if (data.category) count++;
    if (data.subCategory) count++;
    if (data.language) count++;
    if (data.level) count++;
    if (data.durations) count++;
    setCheckValue(count);
  };

  const onChangeInputAnt = (value, name) => {
    setData({
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      [name]: value,
    });
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "estimatedPrice" && value > data.price) {
      setData({
        estimatedPrice: data.price,
      });
    }
  };
  useEffect(() => {
    const price = data.price || 0;
    const estimatedPrice = data.estimatedPrice || 0;
    const promotion =
      price === 0 || estimatedPrice === 0
        ? 0
        : ((price - estimatedPrice) / price) * 100;
    setData({
      promotion: promotion.toFixed(2),
    });
  }, [data.price, data.estimatedPrice]);
  useEffect(() => {
    countCheckValue();
  }, [data]);

  const handleDateChange = (date) => {
    setData({
      dayExpiry: date ? date.format("YYYY-MM-DD") : null,
    });
  };

  const handleSelectChange = (name, value) => {
    setData({
      [name]: value,
    });
  };
  const handleNextStep = () => {
    countCheckValue();
    if (data.estimatedPrice && !data.dayExpiry) {
      toast.error("Bạn phải chọn ngày hạn khuyến mãi nhé!");
      return;
    }
    if (checkValue < 8) {
      customToast.error("Bạn kiểm tra các giá trị lại nhé!");
      // CustomToast.success("Thành công");
      return;
    } else {
      handleChangeStep(step + 1);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full border-b border-gray1 px-7 py-5">
        <h3 className="font-semibold text-2xl">Thông tin cơ bản</h3>
      </div>
      <div className="px-7 py-5">
        <div className="w-full mb-4">
          <div className="flex items-center gap-2">
            <label className={styled.label}>Tên khóa học</label>
          </div>
          <div className="relative flex items-center justify-between">
            <input
              type="text"
              name="name"
              value={data.name || ""}
              onChange={handleChange}
              className={styled.input}
              placeholder="Tiêu đề khóa học của bạn"
            />
            <span className="absolute right-5 text-xs text-gray-500 ml-2">
              0/80
            </span>
          </div>
        </div>
        <div className="w-full mb-4">
          <div className="flex items-center gap-2">
            <label className={styled.label}>Chủ đề khóa học</label>
          </div>
          <div className="relative flex items-center justify-between">
            <input
              type="text"
              name="topic"
              value={data.topic || ""}
              onChange={handleChange}
              className={styled.input}
              placeholder="Những gì chủ yếu được dạy trong khóa học của bạn?"
            />
            <span className="absolute right-5 text-xs text-gray-500 ml-2">
              0/80
            </span>
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-5 mb-4">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Giá</label>
            </div>
            <div className="relative flex items-center justify-between text-gray5">
              <span className="absolute left-3 text-primary z-50">
                <TfiMoney fontSize={20} />
              </span>
              <InputNumber
                name="price"
                max={20000000}
                value={data?.price}
                placeholder="Nhập giá khóa học"
                className={`custom-input-number !pl-6 !text-primary focus-within:ring-2 focus-within:ring-primary`}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/\./g, "")}
                onChange={(value) => onChangeInputAnt(value, "price")}
              />
              <span className="absolute right-5">VND</span>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Khuyến mãi (tự động)</label>
            </div>
            <div className="relative flex items-center justify-between text-gray5">
              <span className="absolute left-3 text-primary">
                <BsPercent fontSize={20} />
              </span>
              <input
                type="number"
                name="promotion"
                value={data.promotion || ""}
                readOnly
                disabled
                className={`${styled.input} pl-10`}
                placeholder="Khuyến mãi của bạn"
              />
              <span className="absolute right-5">OFF</span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-5 mb-4">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Giá khuyến mãi</label>
            </div>
            <div className="relative flex items-center justify-between text-gray5">
              <span className="absolute left-3 text-primary z-50">
                <TfiMoney fontSize={20} />
              </span>
              <InputNumber
                name="estimatedPrice"
                value={data.estimatedPrice}
                max={data.price}
                disabled={!data.price}
                className={`custom-input-number !pl-6 !text-primary focus-within:ring-2 focus-within:ring-primary`}
                placeholder="Giá khuyến mãi của bạn"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/\./g, "")}
                onChange={(value) => onChangeInputAnt(value, "estimatedPrice")}
                onBlur={handleBlur}
              />
              <span className="absolute right-5">VND</span>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center gap-2">
              <label className={styled.label}>
                Ngày hết hạn giảm giá (tùy chọn)
              </label>
            </div>
            <div className="relative flex items-center justify-between text-gray5">
              <DatePicker
                name="dayExpiry"
                className={`${styled.input}`}
                disabled={
                  !data.estimatedPrice || data.estimatedPrice === data.price
                }
                placeholder="DD-MM-YYYY"
                value={data.dayExpiry ? moment(data.dayExpiry) : null}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-5 mb-4">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Danh mục cấp 1</label>
            </div>
            <Select
              showSearch
              id="category"
              name="category"
              value={data.category}
              onChange={(value) => handleSelectChange("category", value)}
              className="custom-select"
              placeholder="Chọn danh mục cấp 1"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={
                dataCategory?.category?.map((item) => ({
                  value: item.title,
                  label: item.title,
                })) || []
              }
            />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Danh mục cấp 2</label>
            </div>
            <Select
              showSearch
              id="subCategory"
              name="subCategory"
              value={data.subCategory}
              onChange={(value) => handleSelectChange("subCategory", value)}
              className="custom-select"
              disabled={dataSubcategory?.length < 0}
              placeholder="Chọn danh mục cấp 2"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={
                dataSubcategory?.map((item) => ({
                  value: item.title,
                  label: item.title,
                })) || []
              }
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-5 mb-4">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Ngôn ngữ</label>
            </div>
            <Select
              showSearch
              id="language"
              name="language"
              value={data.language || null}
              onChange={(value) => handleSelectChange("language", value)}
              className="custom-select"
              placeholder="Chọn ngôn ngữ"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "Tiếng việt", label: "Tiếng việt" },
                { value: "Tiếng anh", label: "Tiếng anh" },
              ]}
            />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Ngôn ngữ phụ đề (nếu có)</label>
            </div>
            <Select
              showSearch
              id="subLanguage"
              name="subLanguage"
              value={data.subLanguage || "Tiếng việt"}
              onChange={(value) => handleSelectChange("subLanguage", value)}
              className="custom-select"
              placeholder="Chọn ngôn ngữ phụ đề"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "Tiếng việt", label: "Tiếng việt" },
                { value: "Tiếng anh", label: "Tiếng anh" },
              ]}
            />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Trình độ</label>
            </div>
            <Select
              showSearch
              id="level"
              name="level"
              value={data.level}
              onChange={(value) => handleSelectChange("level", value)}
              className="custom-select"
              placeholder="Chọn trình độ"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "Cơ bản", label: "Cơ bản" },
                { value: "Trung cấp", label: "Trung cấp" },
                { value: "Nâng cao", label: "Nâng cao" },
                { value: "Chuyên nghiệp", label: "Chuyên nghiệp" },
              ]}
            />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Thời lượng</label>
            </div>
            <div className="relative flex items-center justify-between text-gray5">
              {/* Input for the duration number */}
              <input
                type="number"
                name="durations"
                value={data.durations || undefined}
                onChange={handleChange}
                className={`${styled.input}`}
                placeholder="Nhập thời gian"
              />
              {/* Select for Day, Week, Month */}
              <Select
                showSearch
                id="typeDuration"
                name="typeDuration"
                value={data.typeDurations || "day"}
                onChange={(value) => handleSelectChange("typeDurations", value)}
                defaultValue="Day"
                className="absolute right-0 !w-[120px] custom-select"
              >
                <Select.Option value="day">Ngày</Select.Option>
                <Select.Option value="week">Tuần</Select.Option>
                <Select.Option value="month">Tháng</Select.Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Navigate */}
      <div className="w-full flex items-center justify-between px-7 py-5">
        <button
          type="button"
          disabled={step === 1}
          onClick={() => handleChangeStep(step - 1)}
          className={styled.buttonTran}
        >
          Quay lại
        </button>
        <button onClick={handleNextStep} className={styled.buttonPrimary}>
          Lưu & Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;
