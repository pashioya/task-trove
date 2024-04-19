import jwt from "jsonwebtoken";
import { Response } from "express";
import { Storage } from "@mondaycom/apps-sdk";
import axios from "axios";
import { ResponseStatus } from "@/enums/api";
import { Request } from "express";
import { env } from "@/env";

const AuthTokenController = async (req: Request, res: Response) => {
  // TODO:Add more logging

  // Extract authorization token from request
  const authorizationToken = req.query.code;

  // Check if authorization token exists
  if (!authorizationToken) {
    return res.status(ResponseStatus.UNAUTHORIZED).json({
      message: "Missing authorization token",
    });
  }

  const clientId = env.MONDAY_CLIENT_ID;
  const clientSecret = env.MONDAY_CLIENT_SECRET;

  // get the main access token from env variables
  const accessToken = env.ACCESS_TOKEN;

  const storage = new Storage(accessToken);

  try {
    const response = await axios({
      method: "post",
      url: "https://auth.monday.com/oauth2/token",
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationToken,
        redirect_uri: "http://localhost:8080/auth-token",
      },
    });

    const retrievedAccessToken = response.data.access_token;

    const generated_token = jwt.sign({ retrievedAccessToken }, "secret", {
      expiresIn: "1h",
    });

    await storage.set(generated_token, retrievedAccessToken);

    if (!retrievedAccessToken) {
      return res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
        message: "Failed to obtain access token",
      });
    }

    return res.redirect("http://localhost:8081?token=" + generated_token);
  } catch (error) {
    console.error("Error exchanging authorization token:", error);
    res.redirect("http://localhost:8081?error=" + "InvalidAuthorizationToken");
  }
};

export default AuthTokenController;
