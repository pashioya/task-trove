import {Request, Response} from "express";
import {ResponseStatus} from "@/enums/api";
import {env} from "@/env";
import {Storage} from "@mondaycom/apps-sdk";

const AccessTokenController = (req: Request, res: Response) => {
    const temporaryCode = req.body;
    console.log("Temporary code:", temporaryCode);

    if (!temporaryCode) {
        res.status(ResponseStatus.UNAUTHORIZED).json({
            message: "Missing temporary code",
        });
    }

    // get the main access token from env variables
    const accessToken = env.ACCESS_TOKEN;

    const storage = new Storage(accessToken);

    try {
        // retrieve the access token from storage using the temporary code
        const retrievedAccessToken = storage.get(temporaryCode);
        res.status(ResponseStatus.OK).json({
            message: "Access token obtained successfully",
            accessToken: retrievedAccessToken,
        }).redirect("exp://192.168.0.17:8081");
    } catch (error) {
        console.error("Error exchanging authorization token:", error);
        res.status(ResponseStatus.UNAUTHORIZED).json({
            message: "Invalid temporary code",
        });
    }
}

export default AccessTokenController;
