import NavBar from "@/app/ui-components/NavBar";
import TransactionDataTable from "@/app/components/TransactionDataTable";

export default function DashBoard() {
  return (
    <>
      <main className="p-3 m-3 mr-5">
        <NavBar title="here" />
        <TransactionDataTable></TransactionDataTable>
        {/* Get it from axio */}
      </main>
    </>
  );
}
