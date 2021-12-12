import { IconContext } from "react-icons";

export default function ConfigIcon({ children }) {
  return (
    <>
      <IconContext.Provider value={{ color: "white", size: "2em" }}>
        {children}
      </IconContext.Provider>
    </>
  );
}