import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function BackButton({ to = "/app" }) {
  const navigate = useNavigate();
  function onBack(e) {
    e.preventDefault();
    navigate(to);
  }

  return (
    <Button type={"back"} onClick={onBack}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
