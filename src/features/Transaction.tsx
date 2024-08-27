import Payment from "../components/Payment";
import JettonPayment from "../components/JettonPayment";

export default function Footer() {
  return (
    <div>
      <h2>Transaction</h2>
      <Payment />
      <JettonPayment />
    </div>
  );
}
