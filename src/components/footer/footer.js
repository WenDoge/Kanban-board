import "./footer.css";
const Footer = (props) => {
  const { taskCount } = props;

  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-tasks">
          <span>Active tasks: {taskCount[0]}</span>
          <span>Completed tasks: {taskCount[1]}</span>
        </div>
        <div className="footer-info">Kanban Board by Dmitry Vasilyev, 2021</div>
      </div>
    </footer>
  );
};
export default Footer;
