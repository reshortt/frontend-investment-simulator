import { Divider, Form, Select } from "antd";
import { useState } from "react";
import Buy from "../components/Buy";
import Sell from "../components/Sell";

enum TradeType {
  BUY = "BUY",
  SELL = "SELL",
}

function Trade() {
  const [tradeType, setTradeType] = useState(TradeType.BUY);

  const handleTradeType = (value: TradeType) => {
    setTradeType(value)
  };

  const formItemLayout = {
    labelCol: {
      span: 2,
      offset: 0
    },
    wrapperCol: {
      span: 2,
    },
  };

  return (
    <>
      <br />
      <Form name="trade" {...formItemLayout}>
        <Form.Item label="Trade Type" labelAlign="left">
          <Select onChange={handleTradeType} defaultValue={TradeType.BUY} >
            <Select.Option value={TradeType.BUY}>{TradeType.BUY}</Select.Option>
            <Select.Option value={TradeType.SELL}>{TradeType.SELL}</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Divider orientation="left" orientationMargin="0">
      {tradeType == TradeType.BUY? "Buy Stock" : "Sell Stock"}
    </Divider>
      {tradeType == TradeType.BUY ? <Buy /> : <Sell />}
    </>
  );
}

export default Trade;
