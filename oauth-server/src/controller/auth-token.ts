import jwt from "jsonwebtoken";
import { Response } from "express";
import { Storage } from "@mondaycom/apps-sdk";
import axios from "axios";
import { ResponseStatus } from "@/enums/api";
import { Request } from "express";
import { env } from "../env";

const AuthTokenController = (req: Request, res: Response) => {
  // TODO:Add more logging
  // req.logger.info("Auth token request received");

  // Extract authorization token from request
  const authorizationToken = req.url.split(" ")[1];

  // Check if authorization token exists
  if (!authorizationToken) {
    res.status(ResponseStatus.UNAUTHORIZED).json({
      message: "Missing authorization token",
    });
  }

  // FIXME: Turn these into env variables
  const clientId = env.MONDAY_CLIENT_ID;
  const clientSecret = env.MONDAY_CLIENT_SECRET;

  // get the main access token from env variables
  const accessToken = process.env.ACCESS_TOKEN;

  if (!accessToken) {
    res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to obtain env access token",
    });
    return;
  }

  const storage = new Storage(accessToken);

  // try {
  const response = axios({
    method: "post",
    url: "https://auth.monday.com/oauth2/token",
    data: {
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationToken,
    },
  });

  const retrievedAccessToken = response.then((res) => res.data.access_token);

  const generated_token = jwt.sign({ retrievedAccessToken }, "secret", {
    expiresIn: "1h",
  });

  storage.set(generated_token, retrievedAccessToken);

  if (!retrievedAccessToken) {
    res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to obtain access token",
    });
  }
  res.status(200).redirect("http://localhost:3000");
  // } catch (error) {
  //     console.error("Error exchanging authorization token:", error);
  //     res.status(AppErrorCodes.INTERNAL_SERVER_ERROR).json({
  //         message: "Failed to obtain access token",
  //     });
  // }
};

export default AuthTokenController;
