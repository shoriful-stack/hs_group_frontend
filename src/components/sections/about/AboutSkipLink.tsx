import Link from "next/link";
import { ABOUT_FOCUS_RING } from "./constants";

export default function AboutSkipLink() {
  return (
    <Link
      href="#main-content"
      className={`skip-link ${ABOUT_FOCUS_RING}`}
    >
      Skip to main content
    </Link>
  );
}
