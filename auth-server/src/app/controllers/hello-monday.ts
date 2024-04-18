import {
  validateRequest,
  MondayApiError,
  StatusCodes,
  ErrorMessages,
  SeverityCodes,
  getErrorMessage,
} from "@tryve-apps/monday-server-sdk";
import { HelloMondayRequestPayloadSchema } from "@/app/schemas";
import { getColumnTextFromItem, updateTextColumnValue } from "@/app/services";

const helloMonday = validateRequest(
  HelloMondayRequestPayloadSchema,
  async (req, res) => {
    try {
      const {
        body: {
          payload: {
            inboundFieldValues: {
              boardId,
              itemId,
              titleColumnId,
              textColumnId,
            },
          },
        },
        session: { shortLivedToken: token },
      } = req;

      const titleColumnText = await getColumnTextFromItem({
        itemId,
        columnId: titleColumnId,
        token,
      });

      if (!titleColumnText) {
        req.logger.warn(`Failed to fetch title column text for item ${itemId}`);

        return res.status(StatusCodes.BAD_REQUEST).json({
          sevirityCode: SeverityCodes.MEDIUM,
          notificationErrorTitle: "Failed to fetch title column text",
          notificationErroDescription: "Title column text is empty",
          runtimeErrorDescription: "Title column text is empty",
        });
      }

      req.logger.info(
        `Successfully fetched title column text ${titleColumnText}`
      );

      updateTextColumnValue({
        itemId,
        boardId,
        columnId: textColumnId,
        value: titleColumnText,
        token,
      });

      req.logger.info(
        `Successfully copied title column text to text column ${textColumnId}`
      );

      res.send("OK");
    } catch (error) {
      if (error instanceof MondayApiError) {
        req.logger.error(error.message, { error });

        return res.status(StatusCodes.BAD_REQUEST).json({
          sevirityCode: SeverityCodes.MEDIUM,
          notificationErrorTitle: ErrorMessages.INVALID_REQUEST,
          notificationErroDescription: error.message,
          runtimeErrorDescription: error.message,
        });
      }

      const errorMessage = getErrorMessage(error);

      req.logger.error(errorMessage);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        sevirityCode: SeverityCodes.MEDIUM,
        notificationErrorTitle: ErrorMessages.INTERNAL_SERVER_ERROR,
        notificationErroDescription: errorMessage,
        runtimeErrorDescription: errorMessage,
      });
    }
  }
);

export default helloMonday;
