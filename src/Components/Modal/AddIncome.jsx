import { Button, DatePicker, Form, Input, Modal } from "antd";

function AddIncome({ isIncome, hideIncome, onFinish }) {
  const [form] = Form.useForm();
  return (
    <>
      <Modal open={isIncome} onCancel={hideIncome} footer={null}>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "income");
            form.resetFields();
            hideIncome();
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
                message: "please input the income amount!",
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
                message: "please input the income Date!",
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
            <Button htmlType="submit" type="primary" className="btn btn-green">
              ADD INCOME
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddIncome;
