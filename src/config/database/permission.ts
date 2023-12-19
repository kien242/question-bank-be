// Chỉ dành cho câu hỏi, hoắc bài kiểm tra

const PERMISSIONS: Record<string, number> = {
  PUBLIC: 1111, // Bài kiểm tra, câu hỏi có thể truy cập bởi bất kỳ ai
  PROTECTED: 2222, // Bài kiểm tra, câu hỏi chỉ có thể truy cập bởi người dùng được lựa chọn
  VIA_LINK: 3333, // Bài kiểm tra, câu hỏi có thể truy cập thông qua baaft kỳ người nào có Link bài kiểm tra, câu hỏi đó
};

export { PERMISSIONS };
