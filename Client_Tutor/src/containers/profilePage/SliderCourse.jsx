import React, { useRef } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import CardCourseProgress from "../../components/card/CardCourseProgress";

const options = {
  margin: 30,
  responsiveClass: true,
  nav: false, // Disable default nav
  dots: false,
  loop: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
  },
};

const SliderCourse = ({ user, dataCourse }) => {
  const carouselRef = useRef(null);


  const goToPrev = () => {
    carouselRef.current.prev();
  };

  const goToNext = () => {
    carouselRef.current.next();
  };
  return (
    <div>
      <div className="w-full flex items-center justify-between mb-5">
        <h3 className="font-semibold text-2xl">
          Hãy bắt đầu học thôi,{" "}
          <span className="text-primary">{user?.lastName}</span>
        </h3>
        {dataCourse?.courses?.length > 3 && (
          <div className="flex items-center justify-end gap-3">
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
          </div>
        )}
      </div>
      {dataCourse?.courses?.length > 3 ? (
        <OwlCarousel ref={carouselRef} className="owl-theme" {...options}>
          {dataCourse?.courses.map((course) => (
            <CardCourseProgress user={user} course={course} key={course._id} />
          ))}
        </OwlCarousel>
      ) : (
        <>
          <div className="w-full grid grid-cols-4 gap-5">
            {dataCourse?.courses.map((course) => (
              <CardCourseProgress
                user={user}
                course={course}
                key={course._id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default SliderCourse;
