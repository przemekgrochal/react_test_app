import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { FetchData } from "../utilities/FetchData";
import "../style/UsersList.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

interface IUsers {
    ad: {
        company: string;
        text: string;
        url: string;
    };
    data: [
        {
            avatar: string;
            email: string;
            first_name: string;
            last_name: string;
            id: number;
        }
    ];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}

const UsersList = (props: any) => {
    const [data, setData] = useState<IUsers>();
    const [userID, setUserID] = useState<number>(0);
    const urlApi: string = "https://reqres.in/api/users?page=1";

    const handleClick = (itemID: number) => {
        props.history.push(`/user/${itemID}`);
    };

    const userURL = (currentID: number) => {
        if (currentID === 0) {
            return "/user";
        } else {
            return `/user/${currentID}`;
        }
    };

    useEffect(() => {
        new FetchData().fetch(urlApi, "GET", null).then((res) => {
            setData(res);
        });
    }, []);

    const createUserItem = () => {
        return data?.data.map((item: any, index: number) => {
            return (
                <div
                    key={index}
                    className={"card-list-item"}
                    onClick={() => handleClick(Number(item.id))}
                >
                    <div className={"card-list-item-info"}>
                        <div className={"card-list-item-id"}>ID: {item.id}</div>
                        <div className={"card-list-item-name"}>
                            {item.first_name} {item.last_name}
                        </div>
                        <div className={"card-list-item-email"}>
                            {item.email}
                        </div>
                    </div>
                    <div>
                        <img className={"card-avatar"} src={item.avatar} />
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            <section>
                <div className="container">
                    {data?.data ? (
                        <div className={"card"}>
                            <div className={"card-top"}>
                                <div className={"card-users-heading"}>
                                    Users
                                </div>
                                <Link
                                    to={userURL(userID)}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ background: "#607D8B" }}
                                    >
                                        + ADD USERS
                                    </Button>
                                </Link>
                            </div>
                            <div className="card-body">{createUserItem()}</div>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "40px",
                            }}
                        >
                            <Loader
                                type="Puff"
                                color="#00BFFF"
                                height={100}
                                width={100}
                            />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default UsersList;
