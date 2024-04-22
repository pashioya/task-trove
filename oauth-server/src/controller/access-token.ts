import {Request, Response} from "express";
import {ResponseStatus} from "@/enums/api";
import {env} from "@/env";
import {Storage} from "@mondaycom/apps-sdk";
import jwt from "jsonwebtoken";

const AccessTokenController = async (req: Request, res: Response) => {
    const temporaryCode = req.body;
    console.log("Temporary code:", temporaryCode);

    if (!temporaryCode) {
        return res.status(ResponseStatus.UNAUTHORIZED).json({
            message: "Missing temporary code",
        });
    }

    const jwtSecret = env.JWT_SECRET;

    try {
        jwt.verify(temporaryCode, jwtSecret);
    } catch (error) {
        console.error("Error verifying temporary code:", error);
        return res.status(ResponseStatus.UNAUTHORIZED).json({
            message: "Invalid temporary code",
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
        });

        await storage.delete(temporaryCode);
        return res
    } catch (error) {
        console.error("Error exchanging authorization token:", error);
        return res.status(ResponseStatus.UNAUTHORIZED).json({
            message: "Invalid temporary code",
        });
    }
}

export default AccessTokenController;
