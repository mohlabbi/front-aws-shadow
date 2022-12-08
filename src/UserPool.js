import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-west-1_zTcechnih",
    ClientId: "3vkrvoau281kbrqms5cp3770f8"
}

export default new CognitoUserPool(poolData);