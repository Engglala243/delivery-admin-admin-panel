const getApiBaseUrl = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3030/api";
  return apiUrl.replace('/api', '');
};

const API_BASE_URL = getApiBaseUrl();

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  console.log("Original image path:", imagePath);

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // If it starts with /uploads, prepend the base URL
  if (imagePath.startsWith("/uploads")) {
    const fullUrl = `${API_BASE_URL}${imagePath}`;
    console.log("Generated URL:", fullUrl);
    return fullUrl;
  }

  // If it's just a filename, prepend the full uploads path
  const fullUrl = `${API_BASE_URL}/uploads/${imagePath}`;
  console.log("Generated URL:", fullUrl);
  return fullUrl;
};

export const handleImageError = (e) => {
  e.target.style.display = "none";
  const fallback = e.target.nextElementSibling;
  if (fallback) {
    fallback.style.display = "flex";
  }
};
