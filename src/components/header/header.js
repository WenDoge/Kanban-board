import "./header.css";
import userImage from "./user-avatar.svg";
import DropDown from "../dropDown/dropDown";

const Header = () => {
  const data = [
    { id: "header0", name: "Profile" },
    { id: "header1", name: "Log Out" },
  ];
  return (
    <header className="header">
      <div className="header-container container">
        <div className="title">
          <h1>Awesome Kanban Board</h1>
        </div>
        <DropDown
          setBtn={(value) => console.log(value)}
          btnValue={() => {
            return (
              <img
                className="header-img"
                src={userImage}
                alt="header-img"
              ></img>
            );
          }}
          data={data}
        />
      </div>
    </header>
  );
};

export default Header;
