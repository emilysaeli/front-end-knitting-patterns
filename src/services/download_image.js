import html2canvas from "html2canvas";

export const handleDownloadImage = async (printRef) => {
  // Reference: https://blog.logrocket.com/export-react-components-as-images-html2canvas/
  // This function exports React components as an image file
  const element = printRef.current;
  const canvas = await html2canvas(element);

  const data = canvas.toDataURL("image/jpg");
  const link = document.createElement("a");

  if (typeof link.download === "string") {
    link.href = data;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(data);
  }
};
