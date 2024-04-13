import React, { useState } from "react";
import { Select, Typography, Row, Col, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import bitcoin from "../images/Bitcoin.svg.jpg";
import Loader from "./Loader";

const lorem_text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde recusandae, laudantium culpa laborum, voluptatibus quibusdam odit nam pariatur, beatae soluta ab iste id explicabo consequatur earum. Amet provident dolores magnam.";
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("business");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 10,
  });

  if (isFetching) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => (
              <Option value={currency.name}>{currency.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.articles.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <div style={{ minHeight: "290px" }}>
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title flex" level={4}>
                    <p className="provider-name">{news.publisher.name}</p>
                    <img width={50} src={bitcoin} alt="img" />
                  </Title>
                </div>
                <p>
                  {news.title}
                  {lorem_text.length > 200
                    ? `${lorem_text.substring(0, 160)}...`
                    : lorem_text}
                </p>
                <div className="provider-container">
                  <Text>
                    {moment(news.published_date).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
