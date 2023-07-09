import BanguninLogo from "../assets/logo.png";
import Pattern from "../assets/pattern.jpg";

export default function Loading() {
  return (
    <div
      className="flex min-h-screen justify-center items-center"
      style={{ backgroundImage: `url(${Pattern})` }}
    >
      <img
        src={BanguninLogo}
        alt="bangunin logo"
        className="h-24 animate-bounce"
      />
    </div>
  );
}
