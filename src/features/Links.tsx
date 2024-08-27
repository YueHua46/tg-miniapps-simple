import { Link } from "react-router-dom";

export default function Links() {
  const openOutsideWebview = () => {
    window.open("https://ierc20.com", "_blank");
  };

  return (
    <div className="flex flex-col mb-4">
      <h2>Links</h2>
      <div className="flex gap-4">
        {/* 打开外链 webview */}
        <a href="https://ierc20.com">open ierc20 webview</a>
        {/* 打开外链 webview */}
        <button onClick={openOutsideWebview}>open ierc20 webview</button>
        {/* 跳转到 demo 页 */}
        <Link to={"/demo"}>go to demo page</Link>
      </div>
    </div>
  );
}
