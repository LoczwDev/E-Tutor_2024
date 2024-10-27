import React, { useState, useEffect } from "react";
import "../../assets/css/ant.css";
import { Collapse, Checkbox, Slider, InputNumber, Row, Col } from "antd";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { CiFilter } from "react-icons/ci";
import { MainLayout } from "../../components/layouts/MainLayout";
import SectionLayout from "../../components/layouts/SectionLayout";
import FormSearch from "../../components/FormSearch";
import CardCourse from "../../components/card/CardCourse";
import { useGetAllCategory } from "../../hooks/useCategory";
import Loading from "../../components/loader/Loading";
import { useGetAllCourses } from "../../hooks/useCourses";

const { Panel } = Collapse;
const formatPrice = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
};

const CoursesFilterPage = () => {
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000000);
  const [subCategory, setSubCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [countPage, setCountPage] = useState(1);

  const { data: dataCourse, isLoading: isLoadingCourse } = useGetAllCourses(
    "",
    countPage,
    10,
    minPrice,
    maxPrice,
    subCategory,
    selectedDuration ? selectedDuration.min : 0,
    selectedDuration ? selectedDuration.max : 365,
    selectedRating || 0,
    selectedLevel ? selectedLevel.value : "",
    sortOrder
  );

  let countFilter = 0;

  const filters = [
    subCategory,
    selectedRating,
    selectedLevel,
    minPrice !== 0,
    maxPrice !== 20000000,
    selectedDuration,
  ];

  filters.forEach((filter) => {
    if (filter) {
      countFilter += 1;
    }
  });

  const { data: dataCategory, isLoading: isLoadingCategory } =
    useGetAllCategory();

  const handlePriceChange = (value) => {
    setPriceRange(value);
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleMinPriceChange = (value) => {
    if (value < maxPrice) {
      setMinPrice(value);
      setPriceRange([value, priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (value) => {
    if (value > minPrice) {
      setMaxPrice(value);
      setPriceRange([priceRange[0], value]);
    }
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(selectedLevel === level ? null : level);
  };

  const handleDurationChange = (duration) => {
    const isSelected =
      selectedDuration &&
      selectedDuration.min === duration.min &&
      selectedDuration.max === duration.max;
    setSelectedDuration(isSelected ? null : duration);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const ratings = [
    { title: "5 sao", value: 5 },
    { title: "4 sao trở lên", value: 4 },
    { title: "3 sao trở lên", value: 3 },
    { title: "2 sao trở lên", value: 2 },
    { title: "1 sao trở lên", value: 1 },
  ];

  const levels = [
    { title: "Tất cả level", value: "all" },
    { title: "Mới bắt đầu", value: "Mới bắt đầu" },
    { title: "Trung cấp", value: "Trung cấp" },
    { title: "Chuyên gia", value: "Chuyên gia" },
  ];

  const durations = [
    { title: "6-12 Months", min: 180, max: 360 },
    { title: "3-6 Months", min: 90, max: 180 },
    { title: "1-3 Months", min: 30, max: 90 },
    { title: "1-4 Weeks", min: 7, max: 28 },
    { title: "1-7 Days", min: 1, max: 7 },
  ];

  return (
    <MainLayout>
      <SectionLayout>
        <>
          <div className="w-full border-b border-gray1">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 border border-primary text-primary px-2 py-2.5">
                  <CiFilter /> Filter
                  <div className="text-center text-white bg-primary text-sm inline py-0.5 px-2 w-[24px]">
                    {countFilter}
                  </div>
                </div>
                <FormSearch />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-gray7 font-normal text-xs">
                  Sắp xếp theo:
                </label>
                <form className="max-w-sm mx-auto">
                  <select
                    id="sort-by"
                    className="bg-transparent p-2.5 border border-gray1 text-gray9 text-sm outline-none"
                    value={sortOrder || ""}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="">Sort by</option>
                    <option value="price-asc">Giá:thấp tới cao</option>
                    <option value="price-desc">Giá: cao tới thấp</option>
                    <option value="rating-desc">Mua nhiều</option>
                  </select>
                </form>
              </div>
            </div>
            <div className="w-full flex items-center justify-between py-3">
              <div className="flex items-center">
                <span>Suggestion:</span>
                <div className="w-full truncate line-clamp-1 ml-1 text-primary">
                  {subCategory}
                  {selectedRating && `${selectedRating} sao`}
                  {selectedLevel && ` ${selectedLevel.title}`}
                  {minPrice !== 0 && ` ${minPrice}`}
                  {maxPrice !== 20000000 && ` ${maxPrice}`}
                  {selectedDuration &&
                    selectedDuration.title &&
                    ` ${selectedDuration.title}`}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-5 py-10">
            <div className="w-1/4">
              <Collapse
                defaultActiveKey={["Category"]}
                className="mb-3"
                accordion
              >
                <Panel
                  header="Danh mục"
                  className="custom-category-1"
                  key="Category"
                >
                  <Collapse
                    defaultActiveKey={[dataCategory?.category[0]?.title]}
                    accordion
                  >
                    {dataCategory?.category?.map((category) => (
                      <Panel
                        header={category.title}
                        className="custom-category-2"
                        key={category.title}
                      >
                        {category.subCategory?.length > 0 ? (
                          category.subCategory.map((item) => (
                            <Checkbox
                              key={item.title}
                              value={item.title}
                              checked={item.title === subCategory}
                              onChange={() => setSubCategory(item.title)}
                            >
                              {item.title}
                            </Checkbox>
                          ))
                        ) : (
                          <span>Chưa có giáo viên</span>
                        )}
                      </Panel>
                    ))}
                  </Collapse>
                </Panel>
              </Collapse>
              <Collapse
                defaultActiveKey={["Rating"]}
                className="mb-3"
                accordion
              >
                <Panel
                  header="Đánh giá"
                  className="custom-category-1"
                  key="Rating"
                >
                  {ratings.map((rating) => (
                    <Checkbox
                      key={rating.value}
                      checked={selectedRating === rating.value}
                      onChange={() => handleRatingChange(rating.value)}
                    >
                      {rating.title}
                    </Checkbox>
                  ))}
                </Panel>
              </Collapse>
              <Collapse defaultActiveKey={["Level"]} className="mb-3" accordion>
                <Panel
                  header="Cấp dộ khóa học"
                  className="custom-category-1"
                  key="CourseLevel"
                >
                  {levels.map((level) => (
                    <Checkbox
                      key={level.value}
                      checked={selectedLevel?.value === level.value}
                      onChange={() => handleLevelChange(level)}
                    >
                      {level.title}
                    </Checkbox>
                  ))}
                </Panel>
              </Collapse>
              <Collapse defaultActiveKey={["Price"]} className="mb-3" accordion>
                <Panel
                  header="Giá tiền"
                  className="custom-category-1"
                  key="Price"
                >
                  <Slider
                    range
                    min={0}
                    max={20000000}
                    defaultValue={priceRange}
                    onChange={handlePriceChange}
                    value={priceRange}
                  />
                  <div className="w-full flex justify-between gap-1">
                    <Col>
                      <InputNumber
                        min={0}
                        max={maxPrice}
                        className="w-1/2 !m-0"
                        value={minPrice}
                        formatter={formatPrice}
                        onChange={handleMinPriceChange}
                      />
                    </Col>
                    <Col>
                      <InputNumber
                        min={minPrice}
                        max={20000000}
                        className="w-1/2 !m-0"
                        value={maxPrice}
                        formatter={formatPrice}
                        onChange={handleMaxPriceChange}
                      />
                    </Col>
                  </div>
                </Panel>
              </Collapse>
              <Collapse
                defaultActiveKey={["Duration"]}
                className="mb-3"
                accordion
              >
                <Panel
                  header="Thời gian"
                  className="custom-category-1"
                  key="Duration"
                >
                  {durations.map((duration) => (
                    <Checkbox
                      key={duration.title}
                      checked={
                        selectedDuration &&
                        selectedDuration.min === duration.min &&
                        selectedDuration.max === duration.max
                      }
                      onChange={() => handleDurationChange(duration)}
                    >
                      {duration.title}
                    </Checkbox>
                  ))}
                </Panel>
              </Collapse>
            </div>
            <div className="relative w-3/4">
              {isLoadingCourse || isLoadingCategory ? (
                <div className="w-full flex items-center justify-center h-[40vh]">
                  <Loading />
                </div>
              ) : (
                <div>
                  {dataCourse?.courses?.length > 0 ? (
                    <>
                      <div className="w-full grid grid-cols-3 gap-3 mb-32">
                        {dataCourse?.courses?.map((item, index) => (
                          <CardCourse key={index} item={item} />
                        ))}
                      </div>
                      {dataCourse?.courses?.length > 10 && (
                        <div className="w-full flex items-center justify-center">
                          <Stack spacing={2}>
                            <Pagination
                              sx={{
                                "& .MuiPaginationItem-root": {
                                  color: "#333",
                                },
                                "& .MuiPaginationItem-root.Mui-selected": {
                                  backgroundColor: "#FF6636",
                                  color: "white",
                                },
                                "& .MuiPaginationItem-ellipsis": {
                                  color: "#FF6636",
                                },
                              }}
                              className="!text-[40px]"
                              onChange={(event, value) => {
                                setCountPage(value);
                              }}
                              count={10}
                              color="primary"
                            />
                          </Stack>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full bg-warning/20 text-gray7 text-center text-base p-2">
                      Hiện tại vẫn chưa có khóa học phù hợp, bạn hay chọn khóa
                      học khác nhé!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      </SectionLayout>
    </MainLayout>
  );
};

export default CoursesFilterPage;
