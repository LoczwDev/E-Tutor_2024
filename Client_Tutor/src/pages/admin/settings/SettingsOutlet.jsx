import HeaderAdmin from "../../../components/common/HeaderAdmin";
import ConnectedAccounts from "../../../containers/adminPage/settingsManager/ConnectedAccounts";
import DangerZone from "../../../containers/adminPage/settingsManager/DangerZone";
import Profile from "../../../containers/adminPage/settingsManager/Profile";
import Security from "../../../containers/adminPage/settingsManager/Security";

const SettingsOutlet = () => {
  return (
    <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
      <Profile />
      <Security />
      <ConnectedAccounts />
      <DangerZone />
    </main>
  );
};
export default SettingsOutlet;
