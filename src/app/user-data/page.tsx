import UsageStatusPercentage from "@/components/usage-status-percentage";
import UserDataServerComponent from "@/components/user-data-server-component";

export default function UserData() {
  return (
    <div>
      <h2>UserData page</h2>
      <h3>server component</h3>
      <UserDataServerComponent />
      <UsageStatusPercentage/>
    </div>
  );
}
