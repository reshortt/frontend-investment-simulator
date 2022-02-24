import { Button, Tabs } from "antd";
import "antd/dist/antd.css";
import { doLogout } from "../APIService";
import Analysis from "./Analysis";
import Overview from "./Overview";
import Positions from "./Positions";
import Trade from "./Trade";
import Transactions from "./Transactions";

const { TabPane } = Tabs;

const handleLogout = () => {
  const isOK: boolean = window.confirm("OK to Log Out?");
  if (!isOK) return;
  doLogout();
  window.location.assign("/login");
};
const logoutButton = (
  <Button type="primary" onClick={handleLogout}>
    Logout
  </Button>
);

const style = {
  
}

function NavPane() {
  return (
    <Tabs style={{
    paddingTop: '5px',
    paddingLeft: '10px',
    paddingRight: '5px',
    boxSizing: 'content-box',
  }} tabBarExtraContent={logoutButton}
  tabPosition='top'
  type='card'
  >
      <TabPane tab="Overview" key="1">
        <Overview />
      </TabPane>
      <TabPane tab="Positions" key="2">
        <Positions />
      </TabPane>
      <TabPane tab="Transactions" key="3">
        <Transactions />
      </TabPane>
      <TabPane tab="Analysis" key="4">
        <Analysis />
      </TabPane>
      <TabPane tab="Trade" key="5">
        <Trade />
      </TabPane>
    </Tabs>
  );
}

export default NavPane;
