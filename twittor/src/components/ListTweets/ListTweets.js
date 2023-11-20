import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import moment from "moment";
import { getUserApi } from "../../api/user";
import { API_HOST } from "../../utils/constant";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";

import "./ListTweets.scss";

export default function ListTweets(props) {
  const { tweets } = props;

  return (
    <div className="list-tweets">
      {map(tweets, (tweet, index) => {
        <Tweet key={index} tweet={tweet} />;
      })}
    </div>
  );
}

function Tweet(props) {
  const { tweet } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getUserApi(tweet.userId).then((response) => {
      setUserInfo(response);
      setAvatarUrl(
        response?.avatar
          ? `${API_HOST}/obtenerAvatar?id=${response.id}`
          : AvatarNoFound
      );
    });
  }, [tweet]);

  return (
    <div className="tweet">
      <Image className="avatar" src={avatarUrl} roundedCircle />
      <div className="name">
        {userInfo?.nombre} {userInfo?.apellidos}
        <span>{moment(tweet.fecha).calendar()}</span>
      </div>
      <div>{tweet.mensaje}</div>
    </div>
  );
}
