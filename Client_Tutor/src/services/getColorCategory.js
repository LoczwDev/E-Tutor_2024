const categoryColor = [
  {
    title: "Kinh doanh",
    color: "#E1F7E3",
  },
  {
    title: "CNTT & Phần mềm",
    color: "#FFF0F0",
  },
  {
    title: "Nhiếp ảnh & Video",
    color: "#F5F7FA",
  },
  {
    title: "Âm nhạc",
    color: "#FFF2E5",
  },
  {
    title: "Sức khỏe & Thể hình",
    color: "#E1F7E3",
  },
];

// Example of how to access the color for a specific category
export const getColorByTitle = (title) => {
  const category = categoryColor.find((item) => item.title === title);
  return category ? category.color : null;
};

// Usage
