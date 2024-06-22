import { useState } from "react";
import FinanceCard from "../Cards/FinanceCard";
import Header from "../Header/Header";
import { Modal } from "antd";

const Dashboard = () => {
    const [isExpense , setIsexpense] = useState(false);
    const [isIncome , setIsincome] = useState(false);
const showExpense = () => {
    setIsexpense(true);
}
const showIncome = () => {
    setIsincome(true);
}
const hideExpense = () => {
    setIsexpense(false);

}
const hideIncome = () => {
    setIsincome(false);

}
    return(
        <>
        <Header/>
        <FinanceCard 
        showExpense={showExpense}
        showIncome={showIncome}
        // hideExpense={hideExpense}
        // hideIncome={hideIncome}
        />
        <Modal
         visible={isExpense}
         onCancel={hideExpense}
         footer={null}
         >
            income
         </Modal>
        <Modal
         visible={isIncome}
         onCancel={hideIncome}
         footer={null}
         >
            expense
            </Modal>
        </>
    )
}
export default Dashboard;