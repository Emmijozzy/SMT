import Alert from "./Alert";
import { IAlert } from "./alertInterface";

type Props = {
  alerts: IAlert[];
};
function Alerts({ alerts }: Props) {
  return (
    alerts.length > 0 && (
      <ul className="absolute top-0 left-0 z-40 w-full transition duration-500 p ">
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
