import jwt from "jsonwebtoken";
import { AppErrorCodes } from "@/lib/monday/enums";
import { Response } from "express";
import { Storage } from "@mondaycom/apps-sdk";
import axios from "axios";

const AuthTokenController = async (req: Request, res: Response) => {
    // TODO:Add more logging
    // req.logger.info("Auth token request received");

    // Extract authorization token from request
    const authorizationToken = req.url.split(" ")[1];

    // Check if authorization token exists
    if (!authorizationToken) {
        return res
            .status(AppErrorCodes.UNAUTHORIZED)
            .json({ message: "Missing authorization token" });
    }

    const clientId = "55b279c1eb45e23ce60d4cc032d63ab6";
    const clientSecret = "37a31f8e96a7129e9fb0ff22a2e8117a";

    // get the main access token from env variables
    const accessToken = process.env.ACCESS_TOKEN;

    if (!accessToken) {
        return res
            .status(AppErrorCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to obtain env access token" });
    }

    const storage = new Storage(accessToken);

    try {
        const response = await axios({
            method: "post",
            url: "https://auth.monday.com/oauth2/token",
            data: {
                client_id: clientId,
                client_secret: clientSecret,
                code: authorizationToken,
            },
        });

        const accessToken = response.data;

        const generated_token = jwt.sign({ accessToken }, "secret", {
            expiresIn: "1h",
        });

        storage.set(generated_token, accessToken);

        if (!accessToken) {
            return res
                .status(AppErrorCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to obtain access token" });
        }
        return res.status(200).redirect("http://localhost:3000");
    } catch (error) {
        console.error("Error exchanging authorization token:", error);
        return res
            .status(500)
            .json({ message: "Failed to obtain access token" });
    }
};

export default AuthTokenController;
