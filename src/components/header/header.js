import "./header.css";
import userImage from "./user-avatar.svg";
import DropDown from "../dropDown/dropDown";
import rectangle from "./rectangle.svg";
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
        <div className="user">
          <DropDown
            setBtn={(value) => console.log(value)}
            btnValue={(open) => {
              return (
                <>
                  <img className="header-img" src={userImage}></img>
                  {open ? (
                    <img className="header-rectangle" src={rectangle} />
                  ) : null}
                </>
              );
            }}
            data={data}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
