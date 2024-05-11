import { Alert as Alart } from "@mui/material";
import { IAlert } from "./alertInterface";
import useAlert from "./useAlert";

function Alert({ display, message, type }: IAlert) {
  const toDisplay = display as boolean;
  const { isDisPlay } = useAlert({ display: toDisplay, type });

  return (
    <div
      className={`flex flex-col w-full zdisplay: boolean | undefined, type: string, { display, type }: Propsined, type: string, { display, type }: Propsined, type: string, { display, type }: Propsined, type: string, { display, type }: Propsined, type: string, { display, type }: Props400 ease-soft-in-out ${isDisPlay ? "block" : "hidden"}`}
    >
      {typeof type == "string" && (
        <Alart severity={type} className="flex items-center px-4 text-lg bold bg-base-300 text-wrap">
          {message}
        </Alart>
      )}
    </div>
  );
}
export default Alert;
