import { Row  , Card } from 'antd';
import './styles.css';
import Button from '../Button/Button';

function FinanceCard({showIncome , showExpense}) {

    return(
        <div>
            <Row className='card-row'>
                <Card className='main-card' title='current balance'><p>₹0</p>
                <Button text='Reset Balance' className='card-btn' green={true}/>
                </Card>
                <Card className='main-card' title='Total Income'><p>₹0</p>
                <Button text='Add Income' className='card-btn' green={true} onClick={showIncome}/>
                </Card>
                <Card className='main-card' title='Total Expenses'><p>₹0</p>
                <Button text='Add Expense' className='card-btn' green={true} onClick={showExpense}/>
                </Card>
            
            </Row>
        </div>
    )
}
export default FinanceCard;