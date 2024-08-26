// import { useNavigate } from "react-router-dom";

export default function Links() {
  //   const navigate = useNavigate();

  const openOutsideWebview = () => {
    window.open("https://ierc20.com", "_blank");
  };
  return (
    <div className="flex flex-col mb-4">
      <h2 className="text-white">Links</h2>
      <div className="flex gap-4">
        {/* 打开外链 webview */}
        <a className="primary-button" href="https://ierc20.com">
          open ierc20 webview
        </a>
        {/* 打开外链 webview */}
        <button className="primary-button" onClick={openOutsideWebview}>
          open ierc20 webview
        </button>
      </div>
    </div>
  );
}
