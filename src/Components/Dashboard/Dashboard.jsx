import { useEffect, useState } from "react";
import FinanceCard from "../Cards/FinanceCard";
import Header from "../Header/Header";
import AddExpense from "./../Modals/AddExpense";
import AddIncome from "./../Modals/AddIncome";
import { addDoc, collection , getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {   
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [transactions , setTransactions] = useState([]);
    const [isExpense , setIsexpense] = useState(false);
    const [isIncome , setIsincome] = useState(false);
    const [isloading , setIsloading] = useState(true);
    const [income , setIncome] = useState(0);
    const [expense , setExpense] = useState(0);
    const [totalbalance , setTotalbalance] = useState(0);

useEffect(() => {
    fetchTransactions();
    if (!user) {
        navigate('/');
    }
    else{
        setIsloading(false);
    }
}, [])

useEffect(()=>{
    calculateBalance();
},[transactions])

 function calculateBalance(){
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction)=>{
        if(transaction.category === 'income'){
            totalIncome += transaction.amount;
        }
        else{
            totalExpense += transaction.amount;
        }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
    setTotalbalance(totalIncome - totalExpense);

}

async function fetchTransactions(){
    console.log('fetching');
    setIsloading(true);
    console.log(user);
    if(user){
    const q = query(collection(db,`users/${user.uid}/transactions`));

    const querySnapshot = await getDocs(q);
    let transactionArr =[];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      transactionArr.push(doc.data());
    });
    setTransactions(transactionArr);
    setIsloading(false);
    toast.success('transaction fetched');
    }
}

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
    const onFinish = (values,category) => {
// console.log(type);
        const newTransaction = {
            date: moment(values.date).format('DD-MM-YYYY'),
            amount: parseFloat(values.amount),
            tag:values.tag,
            name:values.name,
            category : category
            // type: type,
        }
        // console.log(newTransaction);

        addTransaction(newTransaction);
    }
    async function addTransaction(transaction) {
        console.log(transaction);
    try {
        const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
        );
        console.log(docRef.id, "written in doc");
        toast.success("transaction added");
    } catch (e) {
        console.error(e);
        toast.error("couldn't add transaction");
    }  
    finally{
        // hideExpense();
       await fetchTransactions();
        calculateBalance();
    }  
    }
    function resetBalance(){
        setTotalbalance(0);
    }

return(
        <>
        <Header/>
        <FinanceCard
        income={income}
        expense={expense}
        totalbalance={totalbalance}
        showExpense={showExpense}
        showIncome={showIncome}
        resetBalance={resetBalance}
        // hideExpense={hideExpense}
        // hideIncome={hideIncome}
        />
        {/* <Modal
         visible={isExpense}
         onCancel={hideExpense}
         footer={null}
         >
            income
         </Modal> */}
         <AddExpense
            isExpense={isExpense}
            hideExpense={hideExpense}
            onFinish={onFinish}
            />
         <AddIncome
            isIncome={isIncome}
            hideIncome={hideIncome}
            onFinish={onFinish}
            />
        </>
    )
}
export default Dashboard;