import { Row, Card } from "antd";
import "./styles.css";
import Button from "../Button/Button";

function FinanceCard({
  income,
  expense,
  totalbalance,
  showIncome,
  showExpense,
  resetBalance,
}) {
  return (
    <div>
      <Row className="card-row">
        <Card className="main-card" title="current balance">
          <p>₹{totalbalance}</p>
          <Button text="Reset Balance" className="card-btn" green={true} onClick={resetBalance} />
        </Card>
        <Card className="main-card" title="Total Income">
          <p>₹{income}</p>
          <Button
            text="Add Income"
            className="card-btn"
            green={true}
            onClick={showIncome}
          />
        </Card>
        <Card className="main-card" title="Total Expenses">
          <p>₹{expense}</p>
          <Button
            text="Add Expense"
            className="card-btn"
            green={true}
            onClick={showExpense}
          />
        </Card>
      </Row>
    </div>
  );
}
export default FinanceCard;
