import React, { useEffect, useState } from "react";
import { CiAlignRight } from "react-icons/ci";
import Joyride, { EVENTS, STATUS } from "react-joyride";

const TourGuide = ({ start, setStartTour, onTourEnd }) => {
  const [progress, setProgress] = useState(1);
  const totalSteps = 6;

  useEffect(() => {
    if (start) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [start]);

  const generateSteps = (val) => [
    {
      content: (
        <div className="p-3">
          <p className="text-start font-medium">
            Chào cậu! Mình là Miu - hướng dẫn viên tại E-tutor, mình sẽ đưa cậu
            đi thăm quan và giới thiệu cho cậu hiểu rõ hơn về chúng tớ nhé. Đi
            thôi!
          </p>
          {/* <label className="flex items-center mt-4">
            <input type="checkbox" className="mr-2" />
            Nghe giọng Miu ^_^
          </label> */}
          <div className="absolute bottom-[34px] left-[47%] text-sm text-neutral-400">
            {val}/{totalSteps}
          </div>
        </div>
      ),
      locale: {
        next: "Theo tớ",
      },
      styles: {
        options: {
          width: 420,
        },
      },
      placement: "center",
      target: "body",
    },
    {
      content: (
        <div className="p-3">
          <p className="text-start font-medium">
            Đây là khu vực trung tâm của màn hình này, toàn bộ nội dung các bài
            học như là video, hình ảnh, văn bản sẽ được hiển thị ở đây Hữu Lộc
            nhé ^^
          </p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val}/{totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 420,
        },
        tooltip: {
          left: "700px",
          top: "300px",
        },
      },
      //   placement:"right",
      target: "#step-1",
    },
    {
      content: (
        <div className="p-3">
          <p className="text-start font-medium">
            Tiếp theo là khu vực quan trọng không kém, đây là danh sách các bài
            học tại khóa này. Cậu sẽ rất thường xuyên tương tác tại đây để
            chuyển bài học và làm bài tập đấy (●'◡'●)
          </p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val}/{totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 420,
        },
        tooltip: {
          left: "-550px",
          top: "200px",
        },
      },

      target: "#step-2",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Next.js Links</p>
          <p className="mr-2 text-sm">
            Đây là bài học đầu tiên dành cho cậu, khi học xong bài học này Miu
            sẽ đánh "Tích cam" bên cạnh để đánh dấu cậu đã hoàn thành bài học
            nhé!
          </p>
          <div className="absolute bottom-[30px] left-[8%] text-sm text-neutral-400">
            {val}/{totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 420,
        },
      },
      placement: "top",
      target: "#step-3",
    },
    {
      content: (
        <div className="p-3">
          <p className="text-start font-medium">
            Đây là bài học số 2, theo mặc định các bài học tại E-tutor đều bị
            khóa. Khi cậu hoàn thành bài học phía trước thì bài sau sẽ tự động
            được mở. Mà lúc học cậu đừng có tua video, vì sẽ không được tính là
            hoàn thành bài học đâu đấy nhé ^^
          </p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val}/{totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 420,
        },
        tooltip: {},
      },

      target: "#step-4",
    },
    {
      content: (
        <div className="p-3">
          <p className="text-start font-medium">
            Tại E-tutor có một chức năng rất đặc biệt, đó là chức năng "Tạo ghi
            chú". Khi học sẽ có nhiều lúc cậu muốn ghi chép lại đó, tại E-tutor
            cậu sẽ không cần tốn giấy mực để làm việc này đâu. Thả tim nào
            (●'◡'●)
          </p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val}/{totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 420,
        },
        tooltip: {
          left: "-550px",
          top: "200px",
        },
      },

      target: "#step-5",
    },
    {
      content: (
        <div className="p-3">
          <p className="text-start font-medium">
            Và đây là khu vực dành cho việc hỏi đáp, trao đổi trong mỗi bài học.
            Nếu có bài học nào hay thì cậu bình luận một lời động viên vào đây
            cũng được nhé. Miu sẽ rất vui và cảm thấy biết ơn đấy －O－
          </p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val}/{totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 420,
        },
        tooltip: {
          left: "-550px",
          top: "200px",
        },
      },

      target: "#step-6",
    },
  ];

  const [{ run, steps }, setState] = useState({
    run: start,
    stepIndex: 0,
    steps: generateSteps(progress),
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      steps: generateSteps(progress),
    }));
  }, [progress]);

  useEffect(() => {
    if (start) {
      setState((prevState) => ({
        ...prevState,
        run: true,
        stepIndex: 0,
      }));
    }
  }, [start]);

  const handleJoyrideCallback = (data) => {
    const { status, type, index } = data;

    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ steps, run: false, stepIndex: 0 });
      setStartTour(false);
      onTourEnd();
      document.body.classList.remove("no-scroll");
    } else if ([EVENTS.STEP_BEFORE].includes(type)) {
      setProgress(index + 1);
    }
  };

  return (
    <Joyride
      continuous
      callback={handleJoyrideCallback}
      run={run}
      steps={steps}
      scrollToFirstStep
      hideCloseButton={true}
      disableCloseOnEsc
      disableOverlayClose
      spotlightPadding={10}
      showProgress
      // disableOverlayClose={false}
      showSkipButton
      //   debug
      styles={{
        spotlight: {
          border: "2px solid lightblue",
        },
        buttonClose: {
          marginTop: "5px",
          marginRight: "5px",
          width: "12px",
        },
        buttonNext: {
          outline: "2px solid transparent",
          outlineOffset: "2px",
          backgroundColor: "#FF6636",
          color: "#FFFFFF",
        },
        buttonSkip: {
          color: "A3A3A3",
        },
        tooltipFooter: {
          margin: "0px 16px 10px 10px",
        },
        buttonBack: {
          outline: "2px solid transparent",
          outlineOffset: "2px",
        },
        options: {
          zIndex: 100,
          arrowColor: "#1F1F1F",
          backgroundColor: "#fff",
          textColor: "#1D2026",
          overlayColor: "rgba(0, 0, 0, 0.9)",
          primaryColor: "#FF6636",
        },
      }}
      locale={{
        skip: "Bỏ qua",
        next: "bước",
        last: "cuối",
        back: (
          <p className="font-bold focus:ring-transparent focus-visible:outline-none">
            {`<-`}
          </p>
        ),
      }}
    />
  );
};

export default TourGuide;
