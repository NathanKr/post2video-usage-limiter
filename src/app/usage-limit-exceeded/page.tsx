import UsageStatusPercentage from "@/components/usage-status-percentage"

export default function UsageLimitExceeded() {
  return (
    <>
      <h2 style={{color:'red'}}>Usage Limit Exceeded</h2>
      <UsageStatusPercentage />
      <p>Buy more credit to continue (TBD)</p>
    </>
  );
}
