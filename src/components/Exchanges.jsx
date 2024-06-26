import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching, error } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {error && (
          <Title
            className="news-title"
            style={{
              marginTop: "40px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              color: "#f84b4b",
            }}
            level={4}
          >
            Information is not available at this moment, please contact to the
            owner of this website
          </Title>
        )}

        {exchangesList?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange?.id}
                showArrow={false}
                header={
                  <Row key={exchange?.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange?.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange?.iconUrl}
                      />
                      <Text>
                        <strong>{exchange?.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange?.volume)}</Col>
                    <Col span={6}>{millify(exchange?.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange?.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange?.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
