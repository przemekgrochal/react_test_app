import React, { useState, useEffect } from "react";
import { FetchData } from "../utilities/FetchData";
import "../style/UsersEdit.scss";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { TextField, Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

interface IUsersEdit {
    ad: {
        company: string;
        text: string;
        url: string;
    };
    data: {
        avatar: string;
        email: string;
        first_name: string;
        last_name: string;
        id: number;
    };
}

interface IUserEditData {
    email: string;
    first_name: string;
    last_name: string;
}

const UsersEdit = (props: any): JSX.Element => {
    const [id] = props.match.params.id ? props.match.params.id : "";
    const urlApi: string = `https://reqres.in/api/users${id ? "/" + id : ""}`;
    const [userData, setUserData] = useState<IUsersEdit>();
    const [userEditData, setUserEditData] = useState<IUserEditData>({
        email: "",
        first_name: "",
        last_name: "",
    });

    useEffect(() => {
        new FetchData().fetch(urlApi, "GET", null).then((res) => {
            setUserData(res);
        });
    }, []);

    const handleChangeInput = (e: any) => {
        setUserEditData({
            ...userEditData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        let userObject = {
            first_name: userEditData.first_name,
            last_name: userEditData.last_name,
        };

        const setMethods = (itemID: number) => {
            if (itemID) {
                return "PUT";
            } else {
                return "POST";
            }
        };

        new FetchData()
            .fetch(urlApi, setMethods(Number(id)), userObject)
            .then((res) => {
                setUserData(res);

                setUserEditData({
                    first_name: res.first_name,
                    last_name: res.last_name,
                    email: res.email,
                });

                props.history.push("/");
            });
    };

    return (
        <>
            <section>
                <div className="container">
                    {userData ? (
                        <form onSubmit={handleSubmit}>
                            <Link to={"/"} className={"form-user-arrow-back"}>
                                <ArrowBackIosIcon />
                            </Link>
                            <div className={"custom-textField"}>
                                <div className={"form-user-name"}>
                                    {userData.data?.first_name
                                        ? userData.data?.first_name
                                        : "New user details"}
                                    {userData.data?.last_name}
                                </div>
                                <div className={"form-user-id"}>
                                    {userData.data?.id
                                        ? "ID: " + userData.data?.id
                                        : ""}
                                </div>
                            </div>

                            <TextField
                                name={"first_name"}
                                label="Name"
                                variant="outlined"
                                className={"custom-textField"}
                                defaultValue={
                                    userData.data?.first_name
                                        ? userData.data?.first_name
                                        : userEditData.first_name
                                }
                                onChange={handleChangeInput}
                                autoComplete={"off"}
                            />
                            <TextField
                                name={"last_name"}
                                label="Surname"
                                variant="outlined"
                                className={"custom-textField"}
                                defaultValue={
                                    userData.data?.last_name
                                        ? userData.data?.last_name
                                        : userEditData.last_name
                                }
                                onChange={handleChangeInput}
                                autoComplete={"off"}
                            />
                            <TextField
                                name={"email"}
                                label="Email"
                                variant="outlined"
                                className={"custom-textField"}
                                defaultValue={
                                    userData.data?.email
                                        ? userData.data?.email
                                        : userEditData.email
                                }
                                onChange={handleChangeInput}
                                autoComplete={"off"}
                            />

                            <div
                                className={"custom-textField button-container"}
                            >
                                <Button
                                    color="primary"
                                    style={{ color: "#607D8B" }}
                                    className={"button-cancel"}
                                    onClick={() => props.history.push("/")}
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    color="primary"
                                    style={{ background: "#607D8B" }}
                                >
                                    SUBMIT TO REVIEW
                                </Button>
                            </div>
                        </form>
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

export default UsersEdit;
