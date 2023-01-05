import {Authenticator} from '@aws-amplify/ui-react';
import React from "react";
import {AuthContext} from "../../_DATA/context";
import {LogoLogin} from "../cmp/Logo";
import {Typography} from "@mui/material";
import '@aws-amplify/ui-react/styles.css';

const authComponents = {
  Header() {
    return (
      <div className="login-header">
        <LogoLogin className="logo" />
        <Typography variant="h4" sx={{ mb: 2 }}>
          Login to Rowi IoT Cloud
        </Typography>
      </div>
    );
  }
}

export const AuthHOC = ({children}) => {
  return (
    <Authenticator components={authComponents} className={"login-view"} hideSignUp={true}>
      {({ signOut, user }) => {
        return(
          <AuthContext.Provider value={{signOut, user}}>
            {children}
          </AuthContext.Provider>
        )
      }}
    </Authenticator>
  )
}
