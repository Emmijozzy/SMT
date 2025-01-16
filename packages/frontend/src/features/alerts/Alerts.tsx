import { useSelector } from "react-redux";
import Alert from "./Alert";
import { RootState } from "../../app/store";

function Alerts() {
  const alerts = useSelector((state: RootState) => state.alert.alerts);

  return (
    alerts.length > 0 && (
      <ul className="absolute top-0 left-0 first:w-full transition duration-500 z-[999999]  ">
        {alerts.map((alert) => (
          <li key={alert.id} className="w-full">
            <Alert message={alert.message} type={alert.type} display id={alert.id} />
          </li>
        ))}
      </ul>
    )
  );
}
export default Alerts;
