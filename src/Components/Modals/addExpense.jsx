import { Button, DatePicker, Form, Input, Modal } from "antd";

function AddExpense({ isExpense, hideExpense, onFinish }) {
  const [form] = Form.useForm();
  return (
    <>
      <Modal open={isExpense} onCancel={hideExpense} footer={null}>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "expense");
            form.resetFields();
            hideExpense();
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "please input the name of the transaction",
              },
            ]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "please input the expense amount!",
              },
            ]}
          >
            <Input type="number" className="custom-input" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="Date"
            rules={[
              {
                required: true,
                message: "please input the expense Date!",
              },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" className="custom-input" />
          </Form.Item>
          <Form.Item
            label="Tag"
            name="tag"
            rules={[
              {
                required: true,
                message: "please give tags!",
              },
            ]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>
          <Form.Item>
            {/* <Button type='submit' htmlType='submit' green={true} text='ADD EXPENSE'/> */}
            <Button htmlType="submit" type="primary" className="btn btn-green">
              ADD EXPENSE
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddExpense;
