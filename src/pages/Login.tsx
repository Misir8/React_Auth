import React, {FC} from 'react';
import {connect} from "react-redux";
import {loginUser} from "../redux/auth/actions";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button} from "@material-ui/core";
import {LoginEntity} from '../models/login'
import {useForm} from "react-hook-form";

interface LoginProps {
    user: any;
    loginUser: (login: LoginEntity) => LoginEntity
}

const Login: FC<LoginProps> = ({user, loginUser}) => {

    const { register, handleSubmit, errors } = useForm<LoginEntity>();

    const classes = useStyles();

    const onSubmit = (data: LoginEntity) => {
        loginUser(data);
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    id="username"
                    ref={register({required: true})}/><br/>
                {errors.username && errors.username.type === "required" && (
                    <div className="error">Your must enter your name.</div>
                )}
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    id="password"
                    ref={register({required: true})}/>
                {errors.password && errors.password.type === "required" && (
                    <div className="error">Your must enter your name.</div>
                )}
                <div>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};


const mapToStateProps = (state: any) => {
    return {
        user: state.auth.user
    }
}
const mapToDispatchProps = (dispatch: any) => {
    return {
        loginUser: (login: LoginEntity) => dispatch(loginUser(login)),
    }
}

export default connect(mapToStateProps, mapToDispatchProps)(Login)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);
