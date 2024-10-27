import React, { useRef } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import CardCourse from "../../components/card/CardCourse";
import SectionLayout from "../../components/layouts/SectionLayout";
import { useGetAllCourses } from "../../hooks/useCourses";
import { Link } from "react-router-dom";
import CardSkeleton from "../../components/skeletons/CardSkeleton";

const SectionTopCourses = () => {
  // const options = {
  //   margin: 15,
  //   responsiveClass: true,
  //   nav: false,
  //   dots: false,
  //   loop: false,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     600: {
  //       items: 2,
  //     },
  //     1000: {
  //       items: 4,
  //     },
  //   },
  // };
  const { data, isLoading } = useGetAllCourses();
  // const carouselRef = useRef(null);

  // const goToPrev = () => {
  //   carouselRef.current.prev();
  // };

  // const goToNext = () => {
  //   carouselRef.current.next();
  // };
  return (
    <div className="bg-gray0">
      <SectionLayout>
        <div className="w-full text-center">
          <h3 className="text-gray9 text-3xl font-semibold capitalize">
            Các khóa học mới
          </h3>
          {/* <div className="flex items-center justify-end gap-3 mb-3">
            <button
              onClick={goToPrev}
              className="flex items-center justify-center gap-2 w-max bg-primary/10 capitalize text-primary hover:bg-primary/50 hover:text-white duration-300 py-2.5 px-4"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={goToNext}
              className="flex items-center justify-center gap-2 w-max bg-primary/10 capitalize text-primary hover:bg-primary/50 hover:text-white duration-300 py-2.5 px-4"
            >
              <FaArrowRight />
            </button>
          </div> */}

          {!isLoading ? (
            <div className="w-full grid grid-cols-4 gap-3 my-10">
              {data?.courses?.slice(0, 9).map((item, index) => (
                <CardCourse key={index} item={item} />
              ))}
            </div>
          ) : (
            <div className="w-full grid grid-cols-4 gap-3 my-10">
              {Array(4)
                .fill()
                .map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
            </div>
          )}
          {/* {!isLoading && data?.courses?.length > 3 && (
            <OwlCarousel ref={carouselRef} className="owl-theme" {...options}>
              {data?.courses.map((course, index) => (
                <CardCourse key={index} item={course} />
              ))}
            </OwlCarousel>
          )} */}

          <div className="w-max mx-auto my-5">
            <Link
              to={"/list-courses"}
              className="w-max flex items-center text-center gap-3 capitalize bg-primary/10 text-primary hover:bg-primary/80 hover:text-primary duration-300 py-2.5 px-4"
            >
              Nhiều hơn <FaArrowRightLong />
            </Link>
          </div>
        </div>
      </SectionLayout>
    </div>
  );
};

export default SectionTopCourses;
